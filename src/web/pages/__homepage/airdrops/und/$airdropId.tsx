import { useParams } from 'react-router';
import {
  ActionButton,
  apiFetcher,
  openErrorModal,
  useApiMutation,
  useApiQuery,
} from '@roxavn/core/web';
import { Stack } from '@mantine/core';
import { sortBy } from 'es-toolkit';
import { useEffect, useState } from 'react';

import { UserBalance } from '../../../../components/UserBalance.js';
import { undAirdropApi } from '../../../../../base/index.js';

export default function () {
  const params = useParams();
  const { data, refetch } = useApiQuery(undAirdropApi.getUserTask, {
    id: params.airdropId!,
  });
  const { data: subtasksData, refetch: subtasksRefetch } = useApiQuery(
    undAirdropApi.getUserSubtasks,
    data && data.id ? { taskId: data.id } : undefined,
    { enabled: !!data?.id }
  );
  const inprogressApi = useApiMutation(undAirdropApi.inprogress, {
    onSuccess: () => subtasksRefetch(),
  });
  const claimApi = useApiMutation(undAirdropApi.claim, {
    onSuccess: () => {
      subtasksRefetch();
      refetch();
    },
    onError: (error) => openErrorModal({ error: error }),
  });
  const [refetchTs, setRefetchTs] = useState(0);

  useEffect(() => {
    if (data && !data.id) {
      apiFetcher
        .fetch(undAirdropApi.createUserTask, {
          id: params.airdropId!,
        })
        .then(() => refetch());
    }
  }, [data]);

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
            <p>You have successfully received the airdrop.</p>
          ) : (
            <div>
              <p>
                <small>You have completed the quests.</small>
              </p>
              <ActionButton
                onClick={() =>
                  apiFetcher
                    .fetch(undAirdropApi.finish, { taskId: data.id! })
                    .then(() => {
                      setRefetchTs(new Date().getTime());
                      refetch();
                    })
                }
                fullWidth
              >
                Claim to receive rewards
              </ActionButton>
            </div>
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
        {data.id && (
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
        )}
      </div>
    )
  );
}
