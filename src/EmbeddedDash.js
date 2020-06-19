import React, { useState } from "react";

function EmbeddedDash() {
  const [dashEmbedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  function load() {
    setLoading(true);
    setError(null);
    fetch("/embed-dash/" + encodeURIComponent(userId))
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
      <button disabled={!userId} onClick={load}>
        Load Embedded Dash
      </button>
      For User Id:
      <input
        value={userId}
        placeholder="enter an userId"
        onChange={(evt) => setUserId(evt.target.value)}
      />
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
          <p>
            embedInfo is here:{" "}
          </p>
          <pre>
            {dashEmbedInfo ? JSON.stringify(dashEmbedInfo, null, '  ') : "not found yet"}
          </pre>

          <div className="iframeWrapper">
            <iframe
              title="Moesif embedded example react"
              src={dashEmbedInfo.url}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmbeddedDash;
