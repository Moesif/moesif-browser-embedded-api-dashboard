import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import EmbeddedDash from "./EmbeddedDash";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>Moesif Embedded Dashboard Implementation Example with React</h1>
      <div>
        <EmbeddedDash />
        {/* <h1>Responsive iframe</h1>

        <div className="iframeWrapper">
          <iframe
            title="blah"
            src="//localhost:8080/public/eyJhcHAiOiIxMzk6MTUiLCJzdWIiOiJwdWJsaWMiLCJhdWQiOiJxd016Y3N6aVc1YW1PRVFUTkZyM1ZNVk9tRGlKMzRNSCIsInZlciI6IjEiLCJvcmciOiI1NTc6MTEiLCJwZXJtaXNzaW9ucyI6eyI1NTc6MTEiOnsic2NwIjoicmVhZDpwdWJsaWNfd29ya3NwYWNlcyJ9fSwiaXNzIjoiaHR0cHM6Ly93ZWItZGV2Lm1vZXNpZi5jb20vd3JhcC9hcHAvNTU3OjExLTEzOToxNSIsIm9pZCI6IndvcmtzcGFjZXMvNWU5NjBmNjFkMmYyMDA1MjcyOTRiMDQzIiwiaWF0IjoxNTg2ODIyNDAwLCJqdGkiOiI5ZTQxYmNkOC1kMTNjLTRkZTMtODEzYi03ZTI5MzJmYjQ4ZjkifQ.lBx3VyWFDvsYRrZLpSW4yr50d6Mslrq67d8InGSp9Ho/ws/5e960f61d2f200527294b043/-4w?userIdFilter[0][key]=2&userIdFilter[0][flag]=or&verbFilter[0][key]=GET&verbFilter[0][flag]=or&embed=true"
            allowFullScreen
          ></iframe>
        </div>
        <p>Enjoy =)</p> */}
      </div>
    </div>
  );
}

export default App;
