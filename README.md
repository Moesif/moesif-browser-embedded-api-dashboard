## Moesif API Dashboard Embed Example

## Background

This example shows how to use Moesif and React to embed live API logs or charts in your customer-facing app.
If not familiar, review the [overview of Moesif embedded charts](https://www.moesif.com/features/embedded-api-logs)
and the [developer documentation](https://www.moesif.com/docs/api-dashboards/embed-templates/).

This example also assumes you already have a Moesif account and [integrated a Moesif SDK](https://www.moesif.com/implementation).

## Key files in this example:

- `server.js` contains an endpoint `/embed-dash(/:userId)` which takes in a user id and generates a short lived token to provide to your user front end. The uri and token is scoped to the user id.
- `./src/EmbeddedDash.js` contains a React app with a Moesif embedded chart.
- `./public/non-react-example.html` contains a non react example of the same front end code.

## How to run

This app contains both a React with various configuration options and non-React version.

### 1. Create an embed template

First, you need to create an embed template in Moesif. To do so, log into your Moesif account and then go to the chart that you would like.

Click the share button and select the _Embed Template_ tab. A dynamic template
is very similar to a static embed/public link, except the filter criteria can contain dynamic fields.
Similar to merge tags and handlebars, a dynamic field such as user id is set when the workspace token is generated.

Get the embed instructions which will display the workspace id and the instructions to generate workspace tokens.

### 2. Set up your environment

- Run `npm install` to install all dependencies.

- Create a `.env` file with your actual variables from step 1.

```
MOESIF_MANAGEMENT_TOKEN=YOUR_MANAGEMENT_TOKEN
MOESIF_TEMPLATE_WORKSPACE_ID=YOUR_TEMPLATE_WORKSPACE_ID
```

### 3. Run the app

- Run `node server.js` to start the server.
- Run `npm start` to start the client.

To see the react version go to `http://localhost:3000`
To see the non react version go to `http://localhost:3000/non-react-example`;

## Display Options

There are URL parameters you can add to the final iFrame page to customize the look.

### embed

Boolean. When set to true, enables _embed mode_ which hides navigation, user and company filters and adjusts chart layout to be embed friendly.
This should always be set to true when embedding a chart except for exceptional cases.

### hide_header

Setting this to true will hide all elements besides the chart itself or the event stream and pagination.
If you don't want to display any filters or other chart options to your users, set this to true.

### show_user_filters

Embed mode will hide user filters, but you can override this behavior to show user filters by setting this option to true.
Most Moesif customers don't want to show user or company filters as the embedded chart
is for a single customer. However, there are use cases where you do want to show these filters.

### show_company_filters

Embed mode will hide company filters, but you can override this behavior to show user filters by setting this option to true.
Most Moesif customers don't want to show user or company filters as the embedded chart
is for a single customer. However, there are use cases where you do want to show these filters.

### primary_color

You can set the primary*color to a \_URL encoded* hex value that matches your brand colors such as `?primary_color=%2332CD32`
This will change the filter button, the first chart color, among other elements. If your chart has multiple datasets,
the secondary elements cannot be changed at this time.

### drawing

If the embedded view is a TimeSeries Chart or Segmentation Chart, you can add an addition line
on top of the chart, by using encoding a drawing option into the query string.

See following example:

```
import qs from 'qs';

const queryParams = {
  drawing: {
    value: number, // required
    name: 'name off the label', // required.

    // below are optional:
    type: 'line',
    borderWidth: 5,
    borderColor: 'rgba(255, 51, 181, 0.3)',
    backgroundColor: 'rgba(255, 51, 181, 0.3)',
    pointRadius: 0,
  }
}

// format it into query string
qs.stringify(queryParams, { format: 'index' });

// and append to the embed url.
```
