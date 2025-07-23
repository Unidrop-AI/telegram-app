import { webModule } from '../module.js';

export function Banner() {
  const images = [
    webModule.resolveStaticPath('/images/banner/1.jpg'),
    webModule.resolveStaticPath('/images/banner/2.jpg'),
    webModule.resolveStaticPath('/images/banner/3.jpg'),
    webModule.resolveStaticPath('/images/banner/4.jpg'),
    webModule.resolveStaticPath('/images/banner/5.jpg'),
    webModule.resolveStaticPath('/images/m1.png'),
    webModule.resolveStaticPath('/images/m2.png'),
  ];
  return (
    <section>
      <div style={{ height: 250 }}></div>
      <div className="fixed-top">
        <div
          id="carouselExampleIndicators"
          className="carousel carousel7 slide"
        >
          <div className="carousel-indicators">
            {images.map((item, index) => (
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : undefined}
                key={item}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {images.map((item, i) => (
              <div
                className={`carousel-item ${i === 0 ? 'active' : ''}`}
                key={item}
              >
                <img
                  src={item}
                  className="d-block object-fit-cover w-100"
                  height={250}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}
