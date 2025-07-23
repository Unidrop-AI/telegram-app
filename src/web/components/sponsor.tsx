import { webModule } from '../module.js';

export function BaseSponsor({
  title,
  images,
  height,
}: {
  title: string;
  images: string[];
  height?: number;
}) {
  return (
    <section className="mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h4 className="h3 mb-5 wow fadeInUp" data-wow-delay=".1s">
              <b className="text-gradient ms-2">{title}</b>
            </h4>
          </div>
          <div className="col-12 text-center wow fadeInUp" data-wow-delay=".3s">
            {images.map((image) => (
              <img
                key={image}
                src={image}
                className="img-fluid ms-2 me-2 mb-2 mb-lg-0"
                style={height ? { height } : {}}
              ></img>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Sponsor() {
  return (
    <>
      <BaseSponsor
        title="Press"
        height={90}
        images={[...Array(5).keys()].map((i) =>
          webModule.resolveStaticPath(`/images/press/press-${i + 1}.png` as any)
        )}
      />
      <BaseSponsor
        title="Developer"
        height={150}
        images={[webModule.resolveStaticPath('/images/img-dev.png')]}
      />
      <BaseSponsor
        title="Investors"
        images={[...Array(27).keys()].map((i) =>
          webModule.resolveStaticPath(
            `/images/investors/img-invest-${i + 1}.png` as any
          )
        )}
      />
      <BaseSponsor
        title="Partners"
        images={[...Array(40).keys()].map((i) =>
          webModule.resolveStaticPath(`/images/partners/img${i + 1}.png` as any)
        )}
      />
      <BaseSponsor
        title="Guilds"
        images={[...Array(9).keys()].map((i) =>
          webModule.resolveStaticPath(`/images/guilds/img${i + 1}.png` as any)
        )}
      />
    </>
  );
}
