import React, { useState, useEffect } from "react";

function EmbeddedDash() {
  const [dashEmbedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
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
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div>
      {!dashEmbedInfo && !error && <p>loading...</p>}
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
