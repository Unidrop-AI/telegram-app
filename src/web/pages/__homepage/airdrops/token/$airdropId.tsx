import { useNavigate, useParams, useSearchParams } from 'react-router';
import {
  ActionButton,
  apiFetcher,
  ApiForm,
  openErrorModal,
  useApiMutation,
  useApiQuery,
} from '@roxavn/core/web';
import { Button, Stack, TextInput } from '@mantine/core';
import { sortBy } from 'es-toolkit';
import { useState } from 'react';

import { UserBalance } from '../../../../components/UserBalance.js';
import { feeAirdropApi } from '../../../../../base/index.js';

export default function () {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, refetch } = useApiQuery(feeAirdropApi.getUserTask, {
    id: params.airdropId!,
  });
  const { data: subtasksData, refetch: subtasksRefetch } = useApiQuery(
    feeAirdropApi.getUserSubtasks,
    data && data.id ? { taskId: data.id } : undefined,
    { enabled: !!data?.id }
  );
  const inprogressApi = useApiMutation(feeAirdropApi.inprogress, {
    onSuccess: () => subtasksRefetch(),
  });
  const claimApi = useApiMutation(feeAirdropApi.claim, {
    onSuccess: () => {
      subtasksRefetch();
      refetch();
    },
    onError: (error) => openErrorModal({ error: error }),
  });
  const [refetchTs, setRefetchTs] = useState(0);

  function renderForm() {
    if (
      data &&
      data.progress &&
      data.childrenWeight &&
      data.progress >= data.childrenWeight
    ) {
      return (
        <div>
          <h4>Congratulations</h4>
          {data.status === 'finished' ? (
            <p>
              We have sent the token to your wallet, whose transaction hash is{' '}
              <b style={{ wordBreak: 'break-word' }}>
                {data.metadata?.transactionHash}
              </b>
            </p>
          ) : (
            <ApiForm
              api={feeAirdropApi.finish}
              initialApiRequest={{ taskId: data.id }}
              onSuccess={() => refetch()}
              renderForm={({ field }) => [
                field(TextInput, {
                  name: 'address',
                  label: 'Your wallet address',
                  placeholder: '0x...',
                  description:
                    'Please enter your wallet address in the input box below, we will automatically send tokens to your wallet',
                }),
              ]}
            ></ApiForm>
          )}
        </div>
      );
    }
    return undefined;
  }

  return (
    data && (
      <div className="container">
        <div className="mb-4 mt-3">
          <UserBalance refetchTs={refetchTs}></UserBalance>
        </div>
        {data.id ? (
          <Stack>
            {renderForm()}
            {subtasksData &&
              sortBy(subtasksData.items, ['title']).map((subtask) => (
                <div className="col-md-4 mb-2" key={subtask.id}>
                  <div>
                    <div className="card p-3 border border-info-subtle text-white d-block">
                      <div className="row">
                        <div className="col-8">
                          <div>
                            <b className="d-block-inline">{subtask.title}</b>
                          </div>
                          <div>
                            {subtask.status === 'inprogress' ? (
                              <span
                                className="badge bg-primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() =>
                                  claimApi.mutate({ taskId: subtask.id })
                                }
                              >
                                Click to claim
                              </span>
                            ) : subtask.status === 'finished' ? (
                              <span className="badge bg-success">Success</span>
                            ) : (
                              <span></span>
                            )}
                          </div>
                        </div>
                        <div
                          className="col-4"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            let link;
                            switch (subtask.type) {
                              case 'linkDiscord':
                                link = subtask.metadata?.inviteDiscord;
                                break;
                              case 'linkTelegram':
                                link = subtask.metadata?.inviteTelegram;
                                break;
                              case 'linkX':
                                link = `https://x.com/${subtask.metadata?.id}`;
                                break;
                              default:
                                link = subtask.metadata?.link;
                            }
                            if (subtask.status === 'pending') {
                              inprogressApi.mutate({
                                taskId: subtask.id,
                              });
                            }
                            open(link, '_blank');
                          }}
                        >
                          <div className="bg-info w-100 rounded-2 text-center py-2 text-dark">
                            <b className="small" style={{ lineHeight: '15px' }}>
                              Open
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Stack>
        ) : (
          <div className="alert alert-warning">
            <h4 className="alert-heading">Confirm!</h4>
            <p>
              Do you want to pay <b>{searchParams.get('fee')}</b> UND to
              participate in the airdrop <b>{searchParams.get('name')}</b>?
            </p>
            <div className="mt-3">
              <Button me="md" onClick={() => navigate(-1)} variant="default">
                No
              </Button>
              <ActionButton
                onClick={async () => {
                  await apiFetcher.fetch(feeAirdropApi.createUserTask, {
                    id: params.airdropId!,
                  });
                  setRefetchTs(new Date().getTime());
                  refetch();
                }}
              >
                Yes, I do
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    )
  );
}
