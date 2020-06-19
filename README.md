## Moesif API Dashboard Embed Example

## Background

For customers of Moesif, we allow creation of templated workspaces that you can embed and share with your users.

An example use case this repo will focus on: suppose you are an API provider that uses Moesif dashboard to look at all API calls, but you'd like to to embed an portion of that data APIs call to the users of your APIs. So that a particular user can only look at APIs calls he/she made.

## Creation of a Dynamic Template

First, go to your Moesif Dashboard, and when you click Share, one of the options is to create a Dynamic Embedded Workspace. When that is created.
And you can configure a list of "parameter" that can be templated and limit the scope. For example: "user_id" in our example use case above.

You should obtain these two:

- Management Token.
- Template WorkspaceId (this the id for the Dynamic Workspace).

## Embed Instructions

To embed, basically there are 2 high level steps:

1. On your backend, implement an API to call Moesif to specify scope for the templated workspace, and generate a short lived token.
2. On your front end, call your backend API, then use the url returned for your iframe to be embedded.

### Key files in this example:

- `server.js` file is the server code example with an endpoint `/embed-dash(/:userId)` for you can specific parameters for an instance of the workspace, and a short lived token to provide to your user.
- `./src/EmbeddedDash.js` is an react example of front end code.
- `./public/non-react-example.html` is a non react example of the front end code.

## To run this example:

- `npm install` to install all dependencies.

- create a `.env` file with these this things:

```
MOESIF_MANAGEMENT_TOKEN=YOUR_MANAGEMENT_TOKEN
MOESIF_TEMPLATE_WORKSPACE_ID=YOUR_TEMPLATE_WORKSPACE_ID
```

_Your management token must be kept secure._

- `node server.js` to start the server.
- `npm start` to start the client.

To see the react version go to `http://localhost:3000`
To see the non react version go to `http://localhost:3000/non-react-example`;

## The Details for API call to generate the temporary token:

The API endpoint:

```
https://api.moesif.com/v1/portal/~/workspaces/{{templatedWorkspaceId}}/access_token?expiration=2020-10-05T15%3A48%3A00.000Z
```

You can set the expiration of the "short-lived" temporary token to a future time, ideally match your user authentication session time.

With these Headers:

- `Content-Type` to `application/json`
- `Authorization` to `Bearer YOUR_MANAGEMENT_TOKEN`

Request Body will contain data to fill out the template:

```
{
  template: {
    values: {
      user_id: AN_USER_ID,
    },
  }
}
```

Successful Response will be in this format:

```
{
  access_token: 'XXXXXXXX',
  url: 'https://wwww.moesif.com/public/XXXXXXXXX/ws/AAAAAAA?embed=true
}
```

The url already have access token in it, so you can just use the url directly inside an iframe to be embedded anywhere.

But if you want to add additional parameters, this is the structure of the embed url:

`https://www.moesif.com/public/{{access_token}}/ws/{{templateWorkspaceId}}?embed=true&show_user_filters=false`

List of supported URL parameters you can set are:

- embed: true or false. If false, it will have moesif headers and moesif footer.
- show_user_filters: true or false. If false, in the embedded workspace it will not have any ability to do filters based on user parameters.
- show_company_filters: true or false.
- primary_color: eg. #FFFFFF set an primary color.
- hide_header: true or false. Default false. If true, this heads the chart configuration headers and options.
