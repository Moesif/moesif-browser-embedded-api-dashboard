import React, { useState } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import IFrameWrapper from "./EmbeddedDisplay";


function EmbeddedDash() {
  const [dashEmbedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [needDateRange, setNeedDateRange] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  function load() {
    if (!userId) {
      window.alert('user id is needed');
      return;
    }

    let url = `/embed-dash/${encodeURIComponent(userId)}`;

    if (needDateRange) {
      if (!from || !to) {
        window.alert('Date range is needed');
        return;
      }
      // note the from and to date range needs to be in ISO strings.
      url = url + `?from=${from.utc().toISOString()}&to=${to.utc().toISOString()}`
    }

    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          console.log(response.statusText);
          throw Error(response.statusText);
        }
      })
      .then((response) => response.json())
      .then((body) => {
        setEmbedInfo(body);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }

  return (
    <div>
      <button
        disabled={!userId || (needDateRange && (!from || !to))}
        onClick={load}
      >
        Load Embedded Dash
      </button>
      <div>
        Define Sandbox For User Id:
        <input
          value={userId}
          placeholder="enter an userId"
          onChange={(evt) => setUserId(evt.target.value)}
        />
      </div>
      <div>
        <p>
          If your embedded template have dynamic date range, please provide the
          date range here. (Note. below will be ignored if the template does not support dynamic date range).
        </p>
        <button
          onClick={() => {
            setNeedDateRange(!needDateRange);
          }}
        >
          {needDateRange ? "Remove Date Range" : "Add Date Range"}
        </button>
        {needDateRange && (
          <React.Fragment>
            from: <Datetime value={from} onChange={(val) => setFrom(val)} />
            to: <Datetime value={to} onChange={(val) => setTo(val)} />
          </React.Fragment>
        )}
      </div>
      {loading && <p>loading...</p>}
      {error && (
        <p>
          Could not load. Please check if you created .env with
          MOESIF_MANAGEMENT_TOKEN && MOESIF_TEMPLATE_WORKSPACE_ID and run `node
          server.js`.
        </p>
      )}
      {dashEmbedInfo && (
        <div>
          <p>embedInfo is here: </p>
          <pre>
            {dashEmbedInfo
              ? JSON.stringify(dashEmbedInfo, null, "  ")
              : "not found yet"}
          </pre>
          <IFrameWrapper
            dashEmbedInfo={dashEmbedInfo}
          />
        </div>
      )}
    </div>
  );
}

export default EmbeddedDash;
