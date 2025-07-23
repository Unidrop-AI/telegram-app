import {
  openErrorModal,
  openSuccessModal,
  useApiMutation,
  useApiQuery,
  useAuthUser,
} from '@roxavn/core/web';
import { formatPercent } from '@roxavn/core';
import { taskApi as roxaTaskApi } from '@roxavn/module-project/base';
import {
  calculateLevelProgress,
  skillApi,
  userSkillApi,
} from '@roxavn/module-skill/base';
import { Box, Group, LoadingOverlay, Text } from '@mantine/core';
import { useState } from 'react';

import { botApi, constants, taskApi } from '../../../base/index.js';
import { UserBalance } from '../../components/UserBalance.js';
import { utils } from '../../utils.js';

export default function () {
  const user = useAuthUser();
  const [reset, setReset] = useState(0);
  const [earnType, setEarnType] = useState<'earn_120' | 'earn_1'>('earn_120');
  const { data, refetch } = useApiQuery(taskApi.getEarnTasks, {
    type: earnType,
  });
  const skillResult = useApiQuery(skillApi.getOne, {
    id: constants.Skills.EARN,
  });
  const userSkillResult = useApiQuery(userSkillApi.getOrCreateMany, {
    userId: user!.id,
    skillId_in: [constants.Skills.EARN],
  });
  const inprogressApi = useApiMutation(roxaTaskApi.inprogress, {
    onSuccess: () => refetch(),
  });
  const savePreparedInlineMessageApi = useApiMutation(
    botApi.savePreparedInlineMessage
  );
  const claimApi = useApiMutation(taskApi.claim, {
    onSuccess: (data) => {
      if (data.levelChange > 0) {
        setReset(new Date().getTime());
        openSuccessModal({
          title: 'Level up',
          message: `You have been awarded ${constants.EarnLevelUpReward.AMOUNT} UND`,
        });
      }
      refetch();
      userSkillResult.refetch();
    },
    onError: (error) => openErrorModal({ error: error }),
  });
  function renderSkillProgress() {
    if (userSkillResult.data && skillResult.data) {
      const userSkill = userSkillResult.data.items[0];
      const percent = calculateLevelProgress(
        userSkill,
        skillResult.data.levels
      );
      return (
        <Group>
          <div
            className="progress progress2 progress3 rounded-pill"
            style={{ flex: 1 }}
          >
            <div
              className="progress-bar rounded-pill"
              role="progressbar"
              style={{ width: formatPercent(percent) }}
            >
              <span className="small text-center text-white d-block">
                {formatPercent(percent)}
              </span>
            </div>
          </div>
          <span>{userSkill.level}</span>
        </Group>
      );
    }
    return <></>;
  }

  return (
    data && (
      <div>
        <section className="mt-3">
          <div className="container">
            <UserBalance refetchTs={reset} />
            <div className="col-12 mt-3">
              <ul className="nav nav-tabs nav-tabs-m" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link rounded-start-pill rounded-end-0 ${earnType === 'earn_120' ? 'active' : ''}`}
                    onClick={() => setEarnType('earn_120')}
                  >
                    Primary
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link rounded-end-pill rounded-start-0 ${earnType === 'earn_1' ? 'active' : ''}`}
                    onClick={() => setEarnType('earn_1')}
                  >
                    Daily
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className="clearfix"></div>
        <section className="">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tab-content mt-3" id="myTabContent">
                  <div className="tab-pane fade show active" tabIndex={0}>
                    {renderSkillProgress()}
                    <Text size="xs" mt="xs">
                      Get {constants.EarnLevelUpReward.AMOUNT} UND bonus when
                      leveling up
                    </Text>
                    <Box pos="relative">
                      <LoadingOverlay
                        visible={savePreparedInlineMessageApi.isPending}
                        zIndex={1000}
                      />
                      <div className="row mt-3">
                        {data.children.map((subtask) => (
                          <div className="col-md-4 mb-2" key={subtask.id}>
                            <div>
                              <div className="card p-3 border border-info-subtle text-white d-block">
                                <div className="row">
                                  <div className="col-8">
                                    <div>
                                      <b className="d-block-inline">
                                        {subtask.title}
                                      </b>
                                    </div>
                                    <div>
                                      {subtask.status === 'inprogress' ? (
                                        <span
                                          className="badge bg-primary"
                                          style={{ cursor: 'pointer' }}
                                          onClick={() =>
                                            claimApi.mutate({
                                              id: subtask.id,
                                            })
                                          }
                                        >
                                          Click to claim
                                        </span>
                                      ) : subtask.status === 'finished' ? (
                                        <span className="badge bg-success">
                                          Success
                                        </span>
                                      ) : (
                                        <span></span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="col-4"
                                    style={{ cursor: 'pointer' }}
                                    onClick={async () => {
                                      const WebApp = (window as any).Telegram
                                        .WebApp;
                                      if (subtask.type == 'share') {
                                        savePreparedInlineMessageApi.mutate(
                                          {
                                            telegramUserId:
                                              WebApp.initDataUnsafe.user.id,
                                          },
                                          {
                                            onSuccess: (data) => {
                                              WebApp.shareMessage(
                                                data.id,
                                                (result: any) => {
                                                  if (
                                                    result &&
                                                    subtask.status === 'pending'
                                                  ) {
                                                    inprogressApi.mutate({
                                                      id: subtask.id,
                                                    });
                                                  }
                                                }
                                              );
                                            },
                                          }
                                        );
                                      } else {
                                        utils.openPartnerLink(
                                          subtask.metadata?.link,
                                          true
                                        );
                                        if (subtask.status === 'pending') {
                                          inprogressApi.mutate({
                                            id: subtask.id,
                                          });
                                        }
                                      }
                                    }}
                                  >
                                    <div className="bg-info w-100 rounded-2 text-center pt-3 pb-2 text-dark">
                                      <b
                                        className="d-block"
                                        style={{ lineHeight: '15px' }}
                                      >
                                        +{subtask.weight}
                                      </b>
                                      <span
                                        className="small"
                                        style={{ lineHeight: '15px' }}
                                      >
                                        XP
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
}
