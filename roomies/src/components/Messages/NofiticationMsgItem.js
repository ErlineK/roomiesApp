import React from "react";
import { FaCheck } from "react-icons/fa";
import { GoMegaphone } from "react-icons/go";
import { formatDate } from "../../utils/formatHelper";
import { getIcon } from "../../utils/iconManager";

/**
 * types of notifications:
 * general
 * bill paid
 */

function NofiticationMsgItem({ item }) {
  const messageTxt = item.ntf_bill
    ? `${item.ntf_bill.bill_type} bill has been paid`
    : "general message";

  return (
    <div className="listItemHolder">
      <div className="listFlexHolder">
        {getIcon("notificationMsg", "listIcon")}
        <div style={{ width: "100%" }}>
          <div className="msgRow">
            <p>{messageTxt}</p>
            <p className="description textLight">
              {formatDate(item.added_date)}
            </p>
          </div>
          {/* {item.ntfType === TRNSFR && (
            <div className="msgRow" style={{ marginBottom: "0.5rem" }}>
              <p className="description"></p>

              {/* <button className="btn msgSimpleBtn highlightGreen invitationBtnPosition">
                <FaCheck className="accent-icon" />
                Confirm
              </button> */}
          {/* <button className="btn btn-grad-green btnAction invitationBtnPosition">
                <FaCheck className="accent-icon" />
                Accept
              </button>
            </div>
          )} */}
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default NofiticationMsgItem;
