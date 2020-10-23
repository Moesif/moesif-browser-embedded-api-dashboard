import React, { useState } from "react";

function testLocalIfNeeded(url) {
  // this helper function is for us to redirect to localhost:8080
  // and add various url parameters.
  if (url) {
    return url
      .replace("https://web-dev.moesif.com", "http://localhost:8080")
      .replace("embed=true", "embed=true&show_user_filters=false&primary_color=" + encodeURIComponent('#FFFFFF'));
  }
  return url;
}

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
              src={testLocalIfNeeded(dashEmbedInfo.url+'&primary_color=%2332CD32&hide_header=true')}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmbeddedDash;
