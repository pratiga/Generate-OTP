/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import "../Styles/otp.css";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const otp = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [copyText, setCopyText] = useState("");
  const [ttls, setTtls] = useState([]);
  const [ttl, setTtl] = useState("");
  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = () => {
    copy(copyText);
    //  alert(`You have copied "${copyText}"`);
  };
  let content = null;
  let handleGenerate = (e) => {
    e.preventDefault();

    axios
      .post("https://otp-jwt-api.herokuapp.com/api/otp/create?ttl=", {
        ttl: ttl,
      })
      .then((res) => {
        console.log(res.data);
        setTtls((ttls) => [res.data, ...ttls]);
        setTtl("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
 
   useEffect(() => {
     axios
       .get("https://otp-jwt-api.herokuapp.com/api/otp/create?ttl=${ttl}")
       .then((res) => {
         console.log(res.data)
         setTtls(res.data);
       })
       .catch((err) => {
         console.log(err);
       })
   }, []);

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
                placeholder=""
                onChange={(e) => setTtl(e.target.value)}
                value={ttl}
              />
              <button className="btn from-left">Generate</button>
            </form>
          </div>
          {/* <div className="otp">
            <form className="form">
              <span>OTP</span>
              <input type="text" placeholder="iiii" value="otp" />
              <button className="btn from-left">Verify</button>
            </form>
          </div> */}
        </div>
       

        <div className="details">
          <form>
            <textarea
              name=""
              rows="5"
              cols="33"
              value={copyText}
              onChange={handleCopyText}
            // placeholder={ttls.data}
            >
              {ttls.data}
            </textarea>
            <span className="copy" onClick={copyToClipboard}>
              <ContentCopyIcon />
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default otp;
