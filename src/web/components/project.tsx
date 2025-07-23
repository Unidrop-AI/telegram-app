import { Text } from '@mantine/core';
import { Link } from 'react-router';
import { Static } from '@roxavn/core';
import { openNoticeModal } from '@roxavn/core/web';
import { scopes } from '@roxavn/module-message/base';
import { webModule } from '../module.js';

export function ProjectItem({
  item,
}: {
  item: Static<typeof scopes.Message.schema>;
}) {
  const playLink = item.metadata?.playLink;
  function play() {
    if (playLink) {
      window.open(playLink)?.focus();
    } else {
      openNoticeModal({ message: 'Coming soon' });
    }
  }

  return (
    <div
      className={`card ${playLink ? 'vip' : 'text-white'} p-2 mb-2 position-relative`}
    >
      <div className="row">
        <div className="col-3">
          <div className="card-img m-img">
            <Link to={'/items/' + item.id}>
              <img
                src={
                  item.metadata?.files[0]?.url ||
                  webModule.resolveStaticPath('/images/thumb-sample.png')
                }
                className="img-fluid"
              />
            </Link>
          </div>
        </div>
        <div className="col-9">
          <Text component={Link} to={'/items/' + item.id} fw="bold">
            {item.metadata?.title || 'SatoshiSync'}
          </Text>
          <span className="small d-block">
            {item.metadata?.participants} users
          </span>
          <span className="badge text-bg-primary">Airdrop</span>
          <span className="badge text-bg-success">MTS</span>
          <span className="badge text-bg-warning">Earn</span>
        </div>
      </div>
      <div
        className="btn-float position-absolute top-50 end-0 translate-middle-y"
        onClick={play}
      >
        <img
          src={webModule.resolveStaticPath('/images/icon1.png')}
          className="img-fluid w-75 pt-1"
        />
      </div>
    </div>
  );
}

export function ProjectList({
  title,
  items,
  refLink,
}: {
  title: string;
  refLink: string;
  items: Static<typeof scopes.Message.schema>[];
}) {
  const titleParts = title.split(' ');

  return (
    <section className="mt-5 mb-5 pt-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-6">
            <h4 className="h3 text-center text-lg-start">
              <b className="text-gradient me-2">{titleParts[0]}</b>
              {titleParts[1]}
            </h4>
          </div>
          <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <Link to={refLink} className="text-gradient">
              See all
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {items
              // .filter((item) => item.metadata?.priority)
              .sort(
                (a, b) =>
                  (b.metadata?.priority || 0) - (a.metadata?.priority || 0)
              )
              .map((item) => (
                <ProjectItem key={item.id} item={item} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
