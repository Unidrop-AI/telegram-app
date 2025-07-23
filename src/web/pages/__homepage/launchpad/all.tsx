import { LaunchpadProject } from '../../../components/LaunchpadProject.js';

export default function () {
  return (
    <div className="card text-white p-3">
      <b>Launchpad</b>
      <span className="opacity-75 small">
        Browse public sales of promising projects
      </span>
      <div className="row mt-4">
        <div className="col-md-9">
          <ul
            className="nav nav-tabs d-flex justify-content-center justify-content-lg-start"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button className="nav-link active mb-2 mb-lg-0" id="home-tab">
                All
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link mb-2 mb-lg-0" id="profile-tab">
                Upcoming
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link mb-2 mb-lg-0" id="contact-tab">
                Active
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link mb-2 mb-lg-0" id="disabled-tab">
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
      </div>
      <div className="tab-content" id="myTabContent">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <LaunchpadProject />
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <LaunchpadProject />
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <LaunchpadProject />
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <LaunchpadProject />
          </div>
        </div>
      </div>
    </div>
  );
}
