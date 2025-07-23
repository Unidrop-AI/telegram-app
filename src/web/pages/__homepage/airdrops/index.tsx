import { ApiList } from '@roxavn/core/web';
import { formatNumber } from '@roxavn/core';
import { Link } from 'react-router';
import { feeAirdropApi, undAirdropApi } from '../../../../base/index.js';
import { UserBalance } from '../../../components/UserBalance.js';

export default function () {
  return (
    <section className="mt-3">
      <div className="container">
        <UserBalance></UserBalance>
        <div className="row mt-3">
          <div className="col-12">
            <ul
              className="nav nav-tabs nav-tabs-m nav-tabs-m2"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link rounded-start-pill rounded-end-0 active"
                  id="und-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#und-tab-pane"
                >
                  UND
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link rounded-end-pill rounded-start-0"
                  id="token-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#token-tab-pane"
                >
                  Token
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content mt-3" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="und-tab-pane"
            role="tabpanel"
          >
            <ApiList
              api={undAirdropApi.getMany}
              renderItem={(item) => (
                <div className="card p-2 mb-2">
                  <Link to={`/airdrops/und/${item.id}?name=${item.name}`}>
                    <div className="row text-white">
                      <div className="col-4">
                        <div className="card-img m-img">
                          <img
                            src={item.metadata?.image}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <b className="">{item.name}</b>
                        <span className="small d-block">
                          {item.metadata?.slot} slots
                        </span>
                        <span className="badge text-bg-primary me-1">
                          {formatNumber(item.metadata!.und)} UND
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            ></ApiList>
          </div>
          <div className="tab-pane fade" id="token-tab-pane" role="tabpanel">
            <ApiList
              api={feeAirdropApi.getMany}
              renderItem={(item) => (
                <div className="card p-2 mb-2">
                  <Link
                    to={`/airdrops/token/${item.id}?fee=${item.metadata?.fee}&name=${item.name}`}
                  >
                    <div className="row text-white">
                      <div className="col-4">
                        <div className="card-img m-img">
                          <img
                            src={item.metadata?.image}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <b className="">{item.name}</b>
                        <span className="small d-block">
                          {item.metadata?.slot} slots -{' '}
                          {item.metadata!.networkName}
                        </span>
                        <span className="badge text-bg-primary me-1">
                          {formatNumber(Number(item.metadata!.tokenAmount))}{' '}
                          {item.metadata!.tokenName}
                        </span>
                        <span className="badge text-bg-warning me-1">
                          {formatNumber(item.metadata!.fee)} UND
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            ></ApiList>
          </div>
        </div>
      </div>
    </section>
  );
}
