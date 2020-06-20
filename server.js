const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const app = express();
app.use(express.static(path.join(__dirname, "build")));

const moesifManagementToken = process.env.MOESIF_MANAGEMENT_TOKEN;
const templateWorkspaceId = process.env.MOESIF_TEMPLATE_WORKSPACE_ID;

const moesifApiEndPoint =
  process.env.MOESIF_API_ENDPOINT || "https://api.moesif.com";

if (!moesifManagementToken) {
  console.error(
    "No MOESIF_MANAGEMENT_TOKEN found. Please create an .env file with MOESIF_MANAGEMENT_TOKEN & MOESIF_TEMPLATE_WORKSPACE_ID."
  );
}

if (!templateWorkspaceId) {
  console.error(
    "No MOESIF_TEMPLATE_WORKSPACE_ID found. Please create an .env file with MOESIF_MANAGEMENT_TOKEN & MOESIF_TEMPLATE_WORKSPACE_ID."
  );
}

app.get("/embed-dash(/:userId)", function (req, res) {
  const userId = req.params.userId;
  // be sure to authenticate your user here.
  // for purpose of this example, do not do any user authentication.
  // Here you want
  // customize the template fields for each one of your users
  // for example, here we configured so that API events
  // that are filtered by the user_id field.
  const templateData = {
    template: {
      values: {
        user_id: userId,
      },
    },
  };

  // Set your desired expiration for the generated workspace token.
  // Moesif's recommendation is to match or be larger than your user's session time while keeping time period less than 30 days. 
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const expiration = tomorrow.toISOString();

  fetch(
    moesifApiEndPoint +
      "/v1/portal/~/workspaces/" +
      templateWorkspaceId +
      "/access_token" +
      "?expiration=" + expiration,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + moesifManagementToken,
      },
      body: JSON.stringify(templateData),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        console.log("Api call to moesif not successful. sever response is");
        console.error(response.statusText);
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      res.json(info);
    })
    .catch((err) => {
      res.status(500).send({
        error: "something wrong",
      });
    });
});


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3050);
