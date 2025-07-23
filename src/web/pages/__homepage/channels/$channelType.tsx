import { Link, useParams } from 'react-router';
import { useApiQuery } from '@roxavn/core/web';
import { abbreviateNumber, formatDate } from '@roxavn/core';

import { constants, routeApi } from '../../../../base/index.js';

function getData(channelType?: string) {
  let id = 'featuredAirdropsId';
  let title = 'Featured';
  let subTitle = 'Airdrops';
  let type: 'featuredAirdrops' | 'featuredProjects' | 'miniGames' =
    'featuredAirdrops';

  if (channelType === constants.ChannelTypes.FEATURED_PROJECTS) {
    id = 'featuredProjectsId';
    title = 'Featured';
    subTitle = 'Projects';
    type = 'featuredProjects';
  } else if (channelType === constants.ChannelTypes.MINI_GAMES) {
    id = 'miniGamesId';
    title = 'Mini';
    subTitle = 'Apps';
    type = 'miniGames';
  }
  return { id, title, subTitle, type };
}

export default function () {
  const params = useParams();
  const channelData = getData(params.channelType);
  const { data } = useApiQuery(routeApi.index);

  if (!data) {
    return <div></div>;
  }

  const items = data[channelData.type];
  return (
    <section className="mt-5">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <h4 className="h3 text-center mb-5">
              <b className="text-gradient me-2">{channelData.title}</b>
              {channelData.subTitle}
            </h4>
            {/* <div className="row">
              <div className="col-lg-9 col-12 mb-5">
                <ul
                  className="nav nav-tabs d-flex justify-content-center justify-content-lg-start"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active mb-2 mb-lg-0"
                      type="button"
                      role="tab"
                    >
                      All
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link mb-2 mb-lg-0"
                      type="button"
                      role="tab"
                    >
                      Upcoming
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link mb-2 mb-lg-0"
                      type="button"
                      role="tab"
                    >
                      Active
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link mb-2 mb-lg-0"
                      type="button"
                      role="tab"
                    >
                      Ended
                    </button>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-12 mb-5">
                <div className="input-group search-input">
                  <input
                    type="text"
                    className="form-control rounded-start-pill ps-4 pt-2 pb-2"
                    placeholder="Search..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <span
                    className="input-group-text rounded-end-pill pe-4"
                    id="basic-addon2"
                  >
                    <a href="#">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div> */}
            <div className="row">
              {items.map((item) => (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <Link to={'/items/' + item.id}>
                    <div className="card pb-3">
                      <div className="card-img">
                        <img
                          src={item.metadata?.files[0]?.url}
                          className="img-fluid"
                        />
                      </div>
                      <b className="text-white text-center ps-3 pe-3 mt-3">
                        {item.metadata?.title}
                      </b>
                      <p className="small opacity-50 text-center text-white">
                        {formatDate(item.createdDate)}
                      </p>
                      <div className="row mt-4">
                        <div className="col-6">
                          <p className="text-white float-start ms-3">
                            Targeted raise
                          </p>
                        </div>
                        <div className="col-6">
                          <b className="text-white float-end me-3">
                            ${abbreviateNumber(item.metadata?.targetedRaise)}
                          </b>
                        </div>
                      </div>
                      <hr className="ms-3 me-3" />
                      <div className="row">
                        <div className="col-6">
                          <p className="text-white float-start ms-3">
                            Contribution amount
                          </p>
                        </div>
                        <div className="col-6">
                          <b className="text-white float-end me-3">
                            $
                            {abbreviateNumber(
                              item.metadata?.contributionAmount
                            )}
                          </b>
                        </div>
                      </div>
                      <hr className="ms-3 me-3" />
                      <div className="row">
                        <div className="col-6">
                          <p className="text-white float-start ms-3">
                            Participants
                          </p>
                        </div>
                        <div className="col-6">
                          <b className="text-white float-end me-3">
                            {item.metadata?.participants}
                          </b>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
