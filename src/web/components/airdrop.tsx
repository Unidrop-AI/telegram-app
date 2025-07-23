import { Link } from 'react-router';
import { formatDateTime, formatNumber } from '@roxavn/core';
import { CarouselSection } from './carousel.js';

export function AirdropItem({ data }: { data: any }) {
  return (
    <Link to={'/airdrops/' + data.id}>
      <div className="card pb-3">
        <div className="card-img">
          <img src={data.image} className="img-fluid" />
        </div>
        <b className="text-center text-white ps-3 pe-3 mt-3">{data.name}</b>
        <p className="small opacity-50 text-center text-white">
          {formatDateTime(data.startDate)}
        </p>
        <div className="row mt-4">
          <div className="col-6">
            <p className="text-white float-start ms-3">Token amount</p>
          </div>
          <div className="col-6">
            <b className="text-white float-end me-3">
              {formatNumber(
                (BigInt(data.tokenAmount) / BigInt(10 ** 18)).toString()
              )}
            </b>
          </div>
        </div>
        <hr className="ms-3 me-3"></hr>
        <div className="row">
          <div className="col-6">
            <p className="text-white float-start ms-3">Number of prizes</p>
          </div>
          <div className="col-6">
            <b className="text-white float-end me-3">
              {(
                BigInt(data.tokenAmount) / BigInt(data.tokenAmountPerAccount)
              ).toString()}
            </b>
          </div>
        </div>
        <hr className="ms-3 me-3"></hr>
        <div className="row">
          <div className="col-6">
            <p className="text-white float-start ms-3">Tickets</p>
          </div>
          <div className="col-6">
            <b className="text-white float-end me-3">{data.tickets}</b>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AirdropCarousel({
  title,
  items,
  refLink,
}: {
  title: string;
  refLink: string;
  items: any[];
}) {
  return (
    <CarouselSection
      title={title}
      refLink={refLink}
      items={items.map((item, index) => (
        <div
          className={`carousel-item ${index === 0 ? 'active' : ''}`}
          key={item.id}
        >
          <div className="col-12 col-md-3">
            <AirdropItem data={item} />
          </div>
        </div>
      ))}
    ></CarouselSection>
  );
}
