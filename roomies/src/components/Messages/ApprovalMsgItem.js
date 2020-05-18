import React from "react";
import { formatDate, formatCurrency } from "../../utils/formatHelper";
import { getIcon } from "../../utils/iconManager";
import AcceptBtn from "../GenericComponents/Buttons/AcceptBtn";

function ApprovalMsgItem({ item, handleAcceptRtrns }) {
  const amountPaid =
    item.ntf_bill && item.ntf_bill.total_amount
      ? item.ntf_bill.total_amount
      : 0;

  let messageTxt = (
    <p className="msgTitle">
      <span className="txb">{item.from_user.name}</span> transfered you{" "}
      <span className="txb">{formatCurrency(amountPaid)}</span>
    </p>
  );

  if (item.ntf_type && item.ntf_type === "trnsAccepted") {
    messageTxt = (
      <p className="msgTitle">
        <span className="txb">{item.from_user.name}</span> accepted your{" "}
        <span className="txb">{formatCurrency(amountPaid)}</span> Roomie
        Transfer
      </p>
    );
  }

  const handleAcceptPayment = (e) => {
    e.preventDefault();

    handleAcceptRtrns(item._id, item.ntf_house);
  };

  return (
    <div className="listItemHolder">
      <div className="listFlexHolder">
        {getIcon("paiment", "listIcon")}
        <div style={{ width: "100%" }}>
          <div className="msgRow">
            {messageTxt}
            <p className="description textLight">
              {formatDate(item.added_date)}
            </p>
          </div>
          {item.type === "TRNS" && (
            <div className="msgRow">
              <p className="msgTitle description">
                {item.ntf_bill && item.ntf_bill.bill_comments
                  ? item.ntf_bill.bill_comments[0]
                  : !item.accepted &&
                    "Do not accept Roomie transfers before getting paid"}
              </p>
              {item.accepted ? (
                <p className="success">Accepted!</p>
              ) : (
                // <button
                //   className="btn btn-grad-green btnAction"
                //   onClick={(e) => handleAcceptPayment(e)}
                // >
                //   {getIcon("accept", "accent-icon")}
                //   Accept
                // </button>
                <AcceptBtn onClick={handleAcceptPayment} />
              )}
            </div>
          )}
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default ApprovalMsgItem;
