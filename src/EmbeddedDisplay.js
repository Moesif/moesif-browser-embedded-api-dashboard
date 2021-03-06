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
  const [timeZone, setTimeZone] = useState("");
  const [hideChartAxisLabel, setChartAxisLabel] = useState(false);
  const [hideChartLegend, setChartLegend] = useState(false);
  const [chartXAxisLabel, setChartXAxisLabel] = useState(undefined);
  const [chartYAxisLabel, setChartYAxisLabel] = useState(undefined);
  const [chartFontFamily, setChartFontFamily] = useState(undefined);
  const [chartAxisFontSize, setChartAxisFontSize] = useState(undefined);
  const [chartLabelFontSize, setChartLabelFontSize] = useState(undefined);
  const [chartFontColor, setChartFontColor] = useState(undefined);

  const [finalUrl, setFinalUrl] = useState(dashEmbedInfo.url);

  // const [finalUrl, setFinalUrl] = useState(
  //   convertToLocalHost(dashEmbedInfo.url)
  // );

  return (
    <div>
      <button onClick={() => setShowEmbedOptions(!showEmbedOptions)}>
        {showEmbedOptions
          ? "Hide Embed Display Options"
          : "show Embed Display Options"}
      </button>
      {showEmbedOptions && (
        <React.Fragment>
          <h3>
            Step 3 (optional): use query string to customize the embedded
            display options
          </h3>
          primary_color:{" "}
          <input
            type="text"
            value={primaryColor}
            onChange={(evt) => setPrimaryColor(evt.target.value)}
          />
          <br />
          hide_header:{" "}
          <input
            type="checkbox"
            checked={hideHeader}
            onChange={(evt) => setHideHeader(!hideHeader)}
          />
          <br />
          Add a line to time series chart with value:{" "}
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
          <br />
          time zone
          <select
            value={timeZone}
            onChange={(evt) => {
              const val = evt.target.value;
              setTimeZone(val);
            }}
          >
            <option value="">Browser Default</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Asia/Hong_Kong">Asia/Hong_Kong</option>
            <option value="Europe/London">Europe/London</option>
            <option value="UTC">UTC</option>
          </select>
          <br />
          (must be IANA timezone, most are supported, some rarely used ones may
          not be supported by browsers). By default, browser timezone is used,
          this allows you to override it.
          <br />
          <br />
          hide_chart_axis_label:{" "}
          <input
            type="checkbox"
            checked={hideChartAxisLabel}
            onChange={(evt) => setChartAxisLabel(!hideChartAxisLabel)}
          />
          <br />
          hide_chart_legend:{" "}
          <input
            type="checkbox"
            checked={hideChartLegend}
            onChange={(evt) => setChartLegend(!hideChartLegend)}
          />
          <br />
          chart_x_axis_label:{" "}
          <input
            type="text"
            value={chartXAxisLabel}
            onChange={(evt) => setChartXAxisLabel(evt.target.value)}
          />
          <br />
          chart_y_axis_label:{" "}
          <input
            type="text"
            value={chartYAxisLabel}
            onChange={(evt) => setChartYAxisLabel(evt.target.value)}
          />
          <br />
          FONTS
          <br />
          chart_font_family:{" "}
          <input
            type="text"
            value={chartFontFamily}
            onChange={(evt) => setChartFontFamily(evt.target.value)}
          />
          <br />
          chart_font_color:{" "}
          <input
            type="text"
            value={chartFontColor}
            onChange={(evt) => setChartFontColor(evt.target.value)}
          />
          <br />
          chart_axis_font_size:{" "}
          <input
            type="number"
            value={chartAxisFontSize}
            onChange={(evt) => setChartAxisFontSize(evt.target.value)}
          />
          <br />
          chart_label_font_size:
          <input
            type="number"
            value={chartLabelFontSize}
            onChange={(evt) => setChartLabelFontSize(evt.target.value)}
          />
          <br />
          <button
            onClick={() => {
              const queryObject = {
                primary_color: primaryColor ? primaryColor : undefined,
                hide_header: hideHeader ? true : undefined,
                hide_chart_axis_label: hideChartAxisLabel ? true : undefined,
                hide_chart_legend: hideChartLegend ? true : undefined,
                time_zone: timeZone ? timeZone : undefined,
                chart_x_axis_label: chartXAxisLabel,
                chart_y_axis_label: chartYAxisLabel,
                chart_font_family: chartFontFamily,
                chart_axis_font_size: chartAxisFontSize,
                chart_label_font_size: chartLabelFontSize,
                chart_font_color: chartFontColor,
                drawing:
                  isNaN(lineValue) && !lineValue
                    ? undefined
                    : {
                        value: lineValue,
                        name: "test",
                        borderColor: lineColor || "rgba(255, 51, 181, 0.3)",
                        backgroundColor: lineColor || "rgba(255, 51, 181, 0.3)",
                      },
              };

              const finalUrl =
                dashEmbedInfo.url +
                "&" +
                qs.stringify(queryObject, { arrayFormat: "indices" });


              // const finalUrl =
              //   convertToLocalHost(dashEmbedInfo.url) +
              //   "&" +
              //   qs.stringify(queryObject, { arrayFormat: "indices" });

              setFinalUrl(finalUrl);
            }}
          >
            Update Query Params and Reload
          </button>
          <p>above are subset of the examples, check docs for more options.</p>
        </React.Fragment>
      )}
      <hr />
      <IFrameWrapper key={finalUrl} embedUrl={finalUrl} />
    </div>
  );
}
