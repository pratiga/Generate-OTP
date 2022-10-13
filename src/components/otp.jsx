import React, { useState } from "react";
import copy from "copy-to-clipboard";
import "../Styles/otp.css";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const otp = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [copyText, setCopyText] = useState("");

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = () => {
    copy(copyText);
    //  alert(`You have copied "${copyText}"`);
  };
  return (
    <div className="otp-page">
      <div className="title">
        <h1>Generate OTP</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="ttl">
            <form className="form">
              <span>TTL</span>
              <input type="number" placeholder="30 sec" value="ttl" />
              <button className="btn from-left">Generate</button>
            </form>
          </div>
          <div className="otp">
            <form className="form">
              <span>OTP</span>
              <input type="text" placeholder="enter otp" value="otp" />
              <button className="btn from-left">Verify</button>
            </form>
          </div>
        </div>
        <div className="details">
          <form>
            <textarea
              name=""
              rows="5"
              cols="33"
              value={copyText}
              onChange={handleCopyText}
              placeholder=" place the details...."
            >
              place the details....
            </textarea>
            <span className="copy" onClick={copyToClipboard}><ContentCopyIcon/></span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default otp;
