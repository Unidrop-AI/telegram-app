import { Group, Modal } from '@mantine/core';
import { referralApi } from '@roxavn/module-referral/base';
import { getReferralCode } from '@roxavn/module-referral/web';
import {
  IconBrandTelegram,
  // IconBrandFacebookFilled,
  // IconBrandWhatsapp,
  // IconBrandX,
  // IconLink,
  // IconMail,
} from '@tabler/icons-react';
import {
  ApiFetcher,
  CopyButton,
  ReferenceUser,
  useAuthUser,
} from '@roxavn/core/web';
import { useState } from 'react';

import { webModule } from '../../module.js';
import { constants } from '../../../base/index.js';

function getRef(userId: string) {
  return `https://t.me/UnidropBot/app?startapp=${btoa('ref:' + getReferralCode(userId))}`;
}

function InviteButton({ userId }: { userId: string }) {
  const [ref, setRef] = useState('');
  const [text, setText] = useState(
    'Sign up for a Unidrop account and claim exclusive rewards from the Unidrop referral program!'
  );

  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary rounded-pill ps-4 pe-4 me-2 w-100"
        onClick={() => setRef(getRef(userId))}
      >
        Invite
      </button>
      <Modal
        opened={!!ref}
        onClose={() => setRef('')}
        title="Invite Friends"
        size="lg"
      >
        Referral Code
        <div className="input-group search-input mt-2 mb-3">
          <input
            className="form-control rounded-start-pill ps-4 pt-2 pb-2"
            defaultValue={ref}
            readOnly
          />
          <span className="input-group-text rounded-end-pill pe-4">
            <CopyButton value={ref} size={20}></CopyButton>
          </span>
        </div>
        Customize your text
        <div className="form-floating search-input mt-2 mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ height: 100 }}
          ></textarea>
        </div>
        <Group justify="center">
          {/* <button
            className="btn p-2 rounded-circle btn-secondary"
            style={{ width: 42, height: 42 }}
            onClick={() => navigator.clipboard.writeText(ref)}
          >
            <IconLink />
          </button>
          <a
            className="btn p-2 rounded-circle btn-secondary"
            style={{ width: 42, height: 42 }}
            href={`mailto:?subject=Join with us&amp;body=${text + ' ' + ref}`}
            target="__blank"
          >
            <IconMail />
          </a> */}
          <a
            className="btn p-2 btn-info"
            href={`https://telegram.me/share/url?url=${ref}&text=${text}`}
            target="__blank"
          >
            <IconBrandTelegram /> Send message
          </a>
          {/* <a
            className="btn p-2 rounded-circle btn-info"
            style={{ width: 42, height: 42 }}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ref)}`}
            target="__blank"
          >
            <IconBrandFacebookFilled />
          </a>
          <a
            className="btn p-2 rounded-circle btn-dark"
            style={{ width: 42, height: 42 }}
            href={`http://twitter.com/share?url=${ref}&text=${text}`}
            target="__blank"
          >
            <IconBrandX />
          </a>
          <a
            className="btn p-2 rounded-circle btn-success"
            style={{ width: 42, height: 42 }}
            href={`https://api.whatsapp.com/send?text=${text + ' ' + ref}`}
            target="__blank"
          >
            <IconBrandWhatsapp />
          </a> */}
        </Group>
      </Modal>
    </div>
  );
}

export default function () {
  const user = useAuthUser();

  return (
    user && (
      <div>
        <section className="" style={{ paddingBottom: 240 }}>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <img
                  src={webModule.resolveStaticPath('/images/ref-img.png')}
                  className="img-fluid"
                />
                <h3>Invite to Earn</h3>
                <b className="float-start mt-4">Rules</b>
                <div className="clearfix"></div>
                <div className="card p-3 mt-2 float-none text-start text-white">
                  Invite a friend, you will get{' '}
                  {constants.ReferralReward.AMOUNT} UND
                </div>
                <b className="float-start mt-4">Rewards</b>
                <div className="clearfix"></div>
                <ApiFetcher
                  api={referralApi.getMany}
                  initialApiRequest={{ invitor: user.id }}
                  renderData={({ data }) =>
                    data?.items.map((item) => (
                      <div
                        key={item.id}
                        className="card d-flex flex-row p-3 mt-2 float-none text-start text-white"
                      >
                        <ReferenceUser id={item.id} />
                        <b className="ms-auto text-primary">
                          +{constants.ReferralReward.AMOUNT}
                        </b>
                      </div>
                    ))
                  }
                ></ApiFetcher>
              </div>
            </div>
          </div>
        </section>
        <section
          id="bottom-sticky"
          className="fixed-bottom"
          style={{ bottom: 90 }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <InviteButton userId={user.id} />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
}
