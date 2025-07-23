import { useParams } from 'react-router';
import { abbreviateNumber, formatPercent } from '@roxavn/core';
import { useApiQuery } from '@roxavn/core/web';
import { useState } from 'react';
import { webModule } from '../../../module.js';
import { routeApi } from '../../../../base/index.js';

export default function () {
  const params = useParams();
  const { data } = useApiQuery(routeApi.message, { id: params.messageId! });
  const [select, setSelect] = useState(0);

  if (!data) {
    return <div></div>;
  }
  return (
    <div>
      <section className="position-relative">
        <div className="banner-overlay position-absolute w-100 h-100"></div>
        <div className="banner w-100">
          <img src={data.metadata?.banner.url} className="img-fluid" />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8">
              <h4 className="h3">
                <b className="text-white">{data.metadata?.title}</b>
              </h4>
            </div>
            <div className="col-lg-4 d-flex justify-content-center justify-content-lg-end">
              <a
                className="nav-link float-start"
                href={data.metadata?.telegramLink}
              >
                <img
                  src={webModule.resolveStaticPath('/images/tele-icon.svg')}
                  className="img-fluid"
                  alt=""
                />
              </a>
              <a
                className="nav-link float-start"
                href={data.metadata?.twitterLink}
              >
                <img
                  src={webModule.resolveStaticPath('/images/x-icon.svg')}
                  className="img-fluid"
                  alt=""
                />
              </a>
              <a
                className="nav-link float-start"
                href={data.metadata?.discordLink}
              >
                <img
                  src={webModule.resolveStaticPath('/images/discord-icon.svg')}
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 mb-5 mb-md-0">
              <div className="img-gallery w-100 mb-5">
                <div className="show-gallery w-100 mb-3">
                  <img
                    src={data.metadata?.files[select]?.url}
                    className="img-fluid"
                  />
                </div>
                <div className="row">
                  {data.metadata?.files.map((f: any, index: number) => (
                    <div className="col-3 mb-3" key={index}>
                      <div
                        className={
                          'show-gallery thumb-gallery w-100' +
                          (index === select ? ' active' : '')
                        }
                      >
                        <a onClick={() => setSelect(index)}>
                          <img src={f.url} className="img-fluid" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="row mt-3">
                  <div className="col-6">
                    <p className="text-white float-start ms-3">
                      Targeted raise
                    </p>
                  </div>
                  <div className="col-6">
                    <b className="text-white float-end me-3">
                      ${abbreviateNumber(data.metadata?.targetedRaise)}
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
                      ${abbreviateNumber(data.metadata?.contributionAmount)}
                    </b>
                  </div>
                </div>
                <hr className="ms-3 me-3" />
                <div className="row mb-3">
                  <div className="col-6">
                    <p className="text-white float-start ms-3">Participants</p>
                  </div>
                  <div className="col-6">
                    <b className="text-white float-end me-3">
                      {data.metadata?.participants}
                    </b>
                  </div>
                </div>
                <div className="progress rounded-pill ms-3 me-3 mb-3">
                  <div
                    className="progress-bar rounded-pill"
                    role="progressbar"
                    style={{
                      width: formatPercent(
                        data.metadata?.contributionAmount /
                          data.metadata?.targetedRaise || 0
                      ),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
