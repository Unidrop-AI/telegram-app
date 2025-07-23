import { webModule } from '../module.js';

export function LaunchpadProject() {
  return (
    <a href="#">
      <div className="card card-dark pb-3">
        <div className="card-img">
          <img
            src={webModule.resolveStaticPath('/images/thumb-sample.png')}
            className="img-fluid"
          />
        </div>
        <b className="text-white text-center ps-3 pe-3 mt-3">SatoshiSync</b>
        <div className="row mt-2">
          <div className="col-5">
            <p className="text-white float-start ms-3">Total raise</p>
          </div>
          <div className="col-7">
            <b className="text-white float-end me-3">$50k UND</b>
          </div>
          <div className="col-12">
            <hr className="ms-3 me-3" />
          </div>
          <div className="col-5">
            <p className="text-white float-start ms-3">Price</p>
          </div>
          <div className="col-7">
            <b className="text-white float-end me-3">1 UND = 1.1 USDT</b>
          </div>
          <div className="col-12">
            <hr className="ms-3 me-3" />
          </div>
          <div className="col-5">
            <p className="text-white float-start ms-3">Start at</p>
          </div>
          <div className="col-7">
            <b className="text-white float-end me-3">Apr 21, 12:00 UTC</b>
          </div>
          <div className="col-12">
            <hr className="ms-3 me-3" />
          </div>
          <div className="col-5">
            <p className="text-white float-start ms-3">Progress</p>
          </div>
          <div className="col-7">
            <b className="text-white float-end me-3">86.92%</b>
          </div>
          <div className="col-12">
            <div className="progress progress2 progress3 rounded-pill m-3">
              <div
                className="progress-bar rounded-pill"
                role="progressbar"
                style={{ width: '25%' }}
              ></div>
            </div>
          </div>
          <div className="col-5">
            <p className="text-white float-start ms-3">IDO Ended in</p>
          </div>
          <div className="col-7">
            <b className="text-white float-end me-3">
              <span>00</span>:<span>00</span>:<span>00</span>
            </b>
          </div>
        </div>
      </div>
    </a>
  );
}
