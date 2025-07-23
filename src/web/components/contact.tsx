import { SignInButton } from './register.js';

export function Contact() {
  return (
    <section className="mt-5 pt-5 wow fadeInDown" data-wow-delay=".1s">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-7">
            <div className="card contact-card">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="h3 mb-0 text-white text-center text-lg-start">
                  <b>Subscribe</b>
                  <br />
                  to our news
                </h4>
                <SignInButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
