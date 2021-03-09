import React, { useState } from "react";
import qs from "qs";

function IFrameWrapper({ embedUrl }) {
  return (
    <div className="iframeWrapper">
      <iframe
        title="Moesif embedded example react"
        src={embedUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
}

function convertToLocalHost(url) {
  // this helper function is for us to redirect to localhost:8080
  // and add various url parameters.
  if (url) {
    return url.replace("https://web-dev.moesif.com", "http://localhost:8080");
  }
  return url;
}

export default function EmbeddedDisplay(props) {
  const { dashEmbedInfo } = props;

  const [showEmbedOptions, setShowEmbedOptions] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(undefined);
  const [hideHeader, setHideHeader] = useState(false);
  const [lineValue, setLineValue] = useState(null);
  const [lineColor, setLineColor] = useState(null);

  const [finalUrl, setFinalUrl] = useState(convertToLocalHost(dashEmbedInfo.finalUrl));

  return (
    <div>
      <button onClick={() => setShowEmbedOptions(!showEmbedOptions)}>
        {showEmbedOptions
          ? "Hide Embed Display Options"
          : "show Embed Display Options"}
      </button>
      {showEmbedOptions && (
        // these code is just to config the embed query string params
        <React.Fragment>
          primary_color:{" "}
          <input
            type="text"
            value={primaryColor}
            onChange={(evt) => setPrimaryColor(evt.target.value)}
          />
          hide_header:{" "}
          <input
            type="checkbox"
            checked={hideHeader}
            onChange={(evt) => setHideHeader(!hideHeader)}
          />
          Add a line with value:{" "}
          <input
            type="number"
            value={lineValue}
            onChange={(evt) => setLineValue(evt.target.value)}
          />
          line color:{" "}
          <input
            type="text"
            value={lineColor}
            onChange={(evt) => setLineColor(evt.target.value)}
          />
          <button
            onClick={() => {
              const queryObject = {
                primary_color: primaryColor ? primaryColor : undefined,
                hide_header: hideHeader ? true : undefined,
                drawing: isNaN(lineValue)
                  ? undefined
                  : {
                      value: lineValue,
                      name: "test",
                      borderColor: lineColor || "rgba(255, 51, 181, 0.3)",
                      backgroundColor: lineColor || "rgba(255, 51, 181, 0.3)",
                    },
              };

              const finalUrl =
                convertToLocalHost(dashEmbedInfo.url) +
                qs.stringify(queryObject, { arrayFormat: "indices" });

              setFinalUrl(finalUrl);
            }}
          >
            Update Query Params and Reload
          </button>
        </React.Fragment>
      )}
      <hr />
      <IFrameWrapper key={finalUrl} embedUrl={finalUrl} />
    </div>
  );
}
