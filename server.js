import dotenv from "dotenv";
import express from "express";
import path from "path";
import fetch from "node-fetch";
const app = express();

dotenv.config();

// https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
const __dirname = path.resolve();
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
        user_id: userId
        //  your template worksplace may have
        // other dynamic fields. All dynamic fields will be required to be flled here.
      }
    }
  };

  // below is required if the templated workspace has dynamic time range set to true.
  // and from and to is the dateRange of events allowed in the Sandbox
  const from = req.query.from;
  const to = req.query.to;
  // and from and to should be ISO timestamps if it is dynamic
  if (from && to) {
    templateData.template.from = from;
    templateData.template.to = to;
  }

  // Set your desired expiration for the generated workspace token.
  // Moesif's recommendation is to match or be larger than your user's session time while keeping time period less than 30 days.
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);
  const expiration = tomorrow.toISOString();

  console.log(
    `now requests access token for template workspace ${templateWorkspaceId}, setting the expiration to ${expiration}`
  );

  const finalApiEndPoint = moesifApiEndPoint.endsWith("/api")
    ? moesifApiEndPoint + "/portal/~/workspaces/"
    : moesifApiEndPoint + "/v1/portal/~/workspaces/";

  const finalUrl =
    finalApiEndPoint +
    templateWorkspaceId +
    "/access_token" +
    "?expiration=" +
    expiration;

  fetch(finalUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + moesifManagementToken
    },
    body: JSON.stringify(templateData)
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        console.log("Api call to moesif not successful. sever response is");
        console.error(response.statusText);
        console.log(response);
        throw Error(response.statusText);
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      console.log(`got token back sending back to frontend`);
      res.json(info);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: "something wrong"
      });
    });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3050);
