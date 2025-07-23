import { LaunchpadProject } from '../../../components/LaunchpadProject.js';

export default function () {
  return (
    <div className="card text-white p-3">
      <div className="row">
        <div className="col-lg-8">
          <b>IDO Calendar</b>
          <p className="mt-2 mb-2">Aug 12 - Aug 18, 2024</p>
          <div className="row">
            <div className="col-md-2 col-4 mb-2">
              <div className="btn w-100 card-dark card-date text-center text-white p-3">
                <b>19</b>
                <span className="opacity-75 d-block">Mon</span>
              </div>
            </div>
            <div className="col-md-2 col-4 mb-2">
              <div className="btn w-100 card-dark card-date text-center text-white p-3">
                <b>19</b>
                <span className="opacity-75 d-block">Mon</span>
              </div>
            </div>
            <div className="col-md-2 col-4 mb-2">
              <div className="btn w-100 card-dark card-date active text-center text-white p-3">
                <b>19</b>
                <span className="opacity-75 d-block">Mon</span>
              </div>
            </div>
            <div className="col-md-2 col-4 mb-2">
              <div className="btn w-100 card-dark card-date text-center text-white p-3">
                <b>19</b>
                <span className="opacity-75 d-block">Mon</span>
              </div>
            </div>
            <div className="col-md-2 col-4 mb-2">
              <div className="btn w-100 card-dark card-date text-center text-white p-3">
                <b>19</b>
                <span className="opacity-75 d-block">Mon</span>
              </div>
            </div>
            <div className="col-md-2 col-4 mb-2">
              <div className="btn w-100 card-dark card-date text-center text-white p-3">
                <b>19</b>
                <span className="opacity-75 d-block">Mon</span>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 mb-3">
              <b>Projects</b>
              <a href="#" className="text-gradient float-end">
                See all
              </a>
            </div>
            <div className="col-md-6 mb-3">
              <LaunchpadProject />
            </div>
            <div className="col-md-6 mb-3">
              <LaunchpadProject />
            </div>
            <div className="col-md-6 mb-3">
              <LaunchpadProject />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div
            className="card p-3 text-white"
            style={{ backgroundColor: '#020B28' }}
          >
            Total staked
            <h3 className="h4">
              <b>
                1.289 <span className="text-primary">UND</span>
              </b>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
