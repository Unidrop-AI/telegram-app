import { webModule } from '../module.js';

export function FAQ() {
  return (
    <section className="mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
            <h4 className="h3 mb-5 wow fadeInLeft" data-wow-delay=".1s">
              Frequently
              <br />
              Asked <b className="text-gradient ms-2">Questions</b>
            </h4>
            <p className="wow fadeInLeft" data-wow-delay=".3s">
              <b>Unidrop</b> Revolutionizing Gaming with Seamless Play to
              Airdrop Rewards, Multi-chain Integration, and a Unified Ecosystem!
            </p>
            <img
              src={webModule.resolveStaticPath('/images/decor-img.png')}
              className="img-fluid mt-5"
            />
          </div>
          <div className="col-lg-6">
            <div className="accordion" id="accordionExample">
              <div
                className="accordion-item wow fadeInRight"
                data-wow-delay=".5s"
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Unlock Rewards with Play to Airdrop
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        Play to Airdrop: Revolutionizing how gamers earn
                        rewards. Engage in your favorite games and unlock
                        valuable airdrops seamlessly integrated within the
                        Unidrop ecosystem.
                      </li>
                      <li>
                        Metaflap Transition: Experience the future of airdrops
                        with our move towards the TON Telegram airdrop system,
                        enhancing accessibility and user experience.
                      </li>
                      <li>
                        Seamless Integration: Our unified ecosystem ensures that
                        earning airdrops is a natural part of your gaming
                        journey, adding value and excitement to every session.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item wow fadeInRight"
                data-wow-delay=".7s"
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Seamless Multi-chain Integration for Gamers
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        Multi-chain Mastery: Effortlessly switch between
                        different blockchains with our robust multi-chain
                        support, making token conversions and transactions
                        smooth and efficient.
                      </li>
                      <li>
                        Blockchain Integration: Benefit from advanced swap and
                        stake features that enhance your gaming and investment
                        experience.
                      </li>
                      <li>
                        Unified Token System: Navigate through the Unidrop
                        ecosystem with ease, thanks to our comprehensive token
                        system that simplifies transitions and maximizes user
                        benefits.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="accordion-item wow fadeInRight"
                data-wow-delay=".9s"
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Engage, Earn, and Thrive with Unidrop's Community Features
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                        Comprehensive Community Features: Focused on user
                        engagement and revenue sharing, Unidrop ensures our
                        community not only thrives but also shares in the
                        platform's growth.
                      </li>
                      <li>
                        Active Community Engagement: Participate in a variety of
                        activities within the Unidrop ecosystem, earning tokens
                        and enhancing your gaming experience.
                      </li>
                      <li>
                        Diverse Entertainment Options: From simple minigames to
                        complex, engaging games, Unidrop offers a wide range of
                        entertainment to keep users invested and engaged.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
