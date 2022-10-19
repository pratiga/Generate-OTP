/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import "../Styles/otp.css";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const otp = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ttl, setTtl] = useState("");
  const [otp, setOtp] = useState("");
  const [otp_set, setOtp_set] = useState("");
  const [otp_verify, setOtp_verify] = useState("");

  const handleCopyText = (e) => {
    setOtp(e.target.value);
  };

  const copyToClipboard = () => {
    copy(otp);
    alert(`You have copied "${otp}"`);
  };

  let handleGenerate = (e) => {
    e.preventDefault();

    axios
      .post("https://otp-jwt-api.herokuapp.com/api/otp/create?ttl=", {
        ttl: ttl,
      })
      .then((res) => {
        // console.log(res.data);
        // setTtl(res.data);
        setOtp(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  let handleOtp = (e) => {
    e.preventDefault();
    axios
      .get("https://otp-jwt-api.herokuapp.com/api/otp/verify/" + otp_set)
      .then((res) => {
        console.log(res.data);
        setOtp_verify(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="otp-page">
      <div className="title">
        <h1>Generate OTP</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="ttl">
            <form className="form" onSubmit={handleGenerate}>
              <span>TTL</span>
              <input
                type="number"
                onChange={(e) => setTtl(e.target.value)}
                value={ttl}
                placeholder={ttl}
              />
              <button className="btn from-left">Generate</button>
            </form>
          </div>
          <div className="otp">
            <form className="form" onSubmit={handleOtp}>
              <span>OTP</span>
              <input
                type="text"
                value={otp_set}
                onChange={(e) => setOtp_set(e.target.value)}
                placeholder={otp_set}
              />
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
              value={otp}
              onChange={handleCopyText}
            >
              {otp}
            </textarea>
            <span className="copy" onClick={copyToClipboard}>
              <ContentCopyIcon />
            </span>
          </form>
          <div className="box-verify">
            <p>{otp_verify}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default otp;
