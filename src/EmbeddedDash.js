import React, { useState } from "react";

function EmbeddedDash() {
  const [dashEmbedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function load() {
    setLoading(true);
    setError(null);
    fetch("/embed-dash/user123456")
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
      <button onClick={load}>Load Embedded Dash</button>
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
            {dashEmbedInfo ? JSON.stringify(dashEmbedInfo) : "not found yet"}
          </p>

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
