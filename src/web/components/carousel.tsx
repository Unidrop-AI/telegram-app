import { Link } from 'react-router';
import { useEffect, useRef } from 'react';

export function CarouselSection({
  title,
  items,
  refLink,
}: {
  title: string;
  refLink: string;
  items: React.ReactNode[];
}) {
  const titleParts = title.split(' ');
  const id = titleParts.join('-');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const items = ref.current.querySelectorAll('.carousel2 .carousel-item');

      items.forEach((el) => {
        const minPerSlide = 4;
        let next = el.nextElementSibling;
        for (let i = 1; i < minPerSlide; i++) {
          if (!next) {
            // wrap carousel by using first child
            next = items[0];
          }
          const cloneChild = next.cloneNode(true);
          el.appendChild(cloneChild.childNodes[0]);
          next = next.nextElementSibling;
        }
      });
    }
  }, []);

  return (
    <section className="mt-5 mb-5 pt-4 pb-4" ref={ref}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h4
              className="h3 text-center text-lg-start wow fadeInLeft"
              data-wow-delay=".1s"
            >
              <b className="text-gradient me-2">{titleParts[0]}</b>
              {titleParts.slice(1).join(' ')}
            </h4>
          </div>
          <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <Link
              to={refLink}
              className="text-gradient wow fadeInRight"
              data-wow-delay=".3s"
            >
              See all
            </Link>
          </div>
        </div>
      </div>
      <div className="my-3 wow fadeInUp" data-wow-delay=".5s">
        <div className="mx-auto my-auto justify-content-center">
          <div
            id={id}
            className="carousel slide carousel2"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              {items}
            </div>
            <div className="carousel-control-container position-absolute top-100 start-50 translate-middle">
              <a
                className="carousel-control-prev bg-transparent w-aut"
                href={`#${id}`}
                role="button"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              </a>
              <a
                className="carousel-control-next bg-transparent w-aut"
                href={`#${id}`}
                role="button"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
