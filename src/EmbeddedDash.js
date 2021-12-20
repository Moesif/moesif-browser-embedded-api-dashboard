import React, { useState } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import EmbeddedDisplay from "./EmbeddedDisplay";

function testLocalIfNeeded(url) {
  // this helper function is for us to redirect to localhost:8080
  // and add various url parameters.
  if (url) {
    return url
      .replace("https://web-dev.moesif.com", "http://localhost:8080")
      .replace("https://www.moesif.com", 'http://localhost:8080')
      // .replace("embed=true", "embed=true&show_user_filters=false&primary_color=" + encodeURIComponent('#FFFFFF'));
  }
  return url;
}

function EmbeddedDash() {
  const [dashEmbedInfo, setEmbedInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [needDateRange, setNeedDateRange] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  // invokes the backend API end point to
  // fill out the variables in the templates.
  function load() {
    if (!userId) {
      window.alert("user id is needed");
      return;
    }

    let url = `/embed-dash/${encodeURIComponent(userId)}`;

    if (needDateRange) {
      if (!from || !to) {
        window.alert("Date range is needed");
        return;
      }
      // note the from and to date range needs to be in ISO strings.
      url =
        url + `?from=${from.utc().toISOString()}&to=${to.utc().toISOString()}`;
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
      <h3>
        Step 1: Fill out variables required the template workspace and obtain an
        URI with token for the sandboxed workspace{" "}
      </h3>
      <div>
        Fill in the User Id (dynamic value for the template workspace):
        <input
          value={userId}
          placeholder="enter an userId"
          onChange={(evt) => setUserId(evt.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            setNeedDateRange(!needDateRange);
          }}
        >
          {needDateRange ? "Remove Date Range" : "Add Date Range"}
        </button>
        If your embedded template have variable date range configured, then
        date range (UTC time) must be provided. (Note. below will be ignored if the template does not
        have dynamic date configured).
        {needDateRange && (
          <div>
            from: <Datetime value={from} utc onChange={(val) => setFrom(val)} />
            to: <Datetime value={to} utc onChange={(val) => setTo(val)} />
          </div>
        )}
      </div>
      <br />
      <button
        disabled={!userId || (needDateRange && (!from || !to))}
        onClick={load}
      >
        Load Embedded Dash
      </button>
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
          <h3>
            Step 2: Use the returned URI (with token) to load the sandboxed dash
          </h3>
          <pre className='embed-info'>{JSON.stringify(dashEmbedInfo, null, "  ")}</pre>
          <EmbeddedDisplay dashEmbedInfo={dashEmbedInfo} />
        </div>
      )}
    </div>
  );
}

export default EmbeddedDash;
