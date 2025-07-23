export default function () {
  return (
    <div className="card text-white p-3">
      <div className="row">
        <div className="col-lg-8">
          <b>Stake program list</b>
          <div className="table-responsive mt-4 mb-4">
            <table className="table table2 bg-transparent">
              <tbody>
                <tr className="opacity-50">
                  <td>Period</td>
                  <td>APY</td>
                  <td>TVL</td>
                  <td></td>
                </tr>
                <tr>
                  <td>14 days</td>
                  <td>1%</td>
                  <td>
                    <b>1.41m</b>
                  </td>
                  <td>
                    <div className="input-group search-input">
                      <input
                        type="text"
                        className="form-control rounded-start-pill ps-4 pt-2 pb-2 small"
                        placeholder="Stake amount..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <span
                        className="input-group-text rounded-end-pill pe-4"
                        id="basic-addon2"
                      >
                        <a
                          href="#"
                          className="text-primary small"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal3"
                        >
                          <b>STAKE</b>
                        </a>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>14 days</td>
                  <td>1%</td>
                  <td>
                    <b>1.41m</b>
                  </td>
                  <td>
                    <div className="input-group search-input">
                      <input
                        type="text"
                        className="form-control rounded-start-pill ps-4 pt-2 pb-2 small"
                        placeholder="Stake amount..."
                      />
                      <span
                        className="input-group-text rounded-end-pill pe-4"
                        id="basic-addon2"
                      >
                        <a
                          href="#"
                          className="text-primary small"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal3"
                        >
                          <b>STAKE</b>
                        </a>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>14 days</td>
                  <td>1%</td>
                  <td>
                    <b>1.41m</b>
                  </td>
                  <td>
                    <div className="input-group search-input">
                      <input
                        type="text"
                        className="form-control rounded-start-pill ps-4 pt-2 pb-2 small"
                        placeholder="Stake amount..."
                      />
                      <span
                        className="input-group-text rounded-end-pill pe-4"
                        id="basic-addon2"
                      >
                        <a
                          href="#"
                          className="text-primary small"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal3"
                        >
                          <b>STAKE</b>
                        </a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <b>Leader Board</b>
          <div className="table-responsive mt-4 mb-4">
            <table className="table table2 bg-transparent">
              <tbody>
                <tr className="opacity-50">
                  <td>No.</td>
                  <td>Wallet</td>
                  <td>UND</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <b>0x9d5…0c934</b>
                  </td>
                  <td>
                    <b className="text-success">250.0m</b>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <b>0x9d5…0c934</b>
                  </td>
                  <td>
                    <b className="text-success">250.0m</b>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <b>0x9d5…0c934</b>
                  </td>
                  <td>
                    <b className="text-success">250.0m</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-4">
          <div
            className="card p-3 text-white"
            style={{ backgroundColor: '#020B28' }}
          >
            Total staked
            <h3 className="h4">
              <b>
                1.289 <span className="text-primary">UND</span>
              </b>
            </h3>
            <hr />
            Participants
            <b>632</b>
          </div>
          <div
            className="card p-3 text-white mt-3"
            style={{ backgroundColor: '#020B28' }}
          >
            <span className="small opacity-75">
              Unidrop cung cấp 6 mức staking, từ 50,000 $UND đến 2,500,000 $UND,
              với trọng số pool tương ứng để xác định số lượng suất IDO mà bạn
              sẽ nhận được.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
