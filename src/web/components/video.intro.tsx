import { webModule } from '../module.js';

export function VideoIntro() {
  return (
    <section className="mt-5 pt-5">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-8 text-center">
            <h4 className="h3 mb-5 wow fadeInUp" data-wow-delay=".1s">
              <b className="text-gradient me-2">What</b>We Do
            </h4>
            <div
              className="video-container w-100 text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img
                  src={webModule.resolveStaticPath('/images/video-thumb.png')}
                  className="img-fluid"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="video-wrapper">
                <iframe
                  width=""
                  height=""
                  src="https://www.youtube.com/embed/qt1equGhkQE?si=RivT2x_s10T7q4lJ"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ border: 0 }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
