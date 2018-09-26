# storybook-vue-iframe

![Storybook Vue Addon For Iframe](https://raw.githubusercontent.com/hharnisc/storybook-vue-iframe/master/storybook-vue-iframe.gif)

Forked by

https://github.com/bmartel/storybook-vue-iframe
https://github.com/hharnisc/storybook-vue-iframe

## Quickstart

Install the addon

```sh
npm i --save-dev storybook-vue-iframe
```

Register the plugin

```jsx
// in .storybook/addons.js
import "@storybook/addon-actions/register";
// register the Iframe addon
import "storybook-vue-iframe/register";
```

Link a Iframe design to your story

## With React

```jsx
import React from "react";
import { storiesOf } from "@storybook/react";
import { IFrame } from "storybook-vue-iframe";

storiesOf("Button").add("With Iframe", () => (
  <IFrame url={"https://www.google.com"}>
    <button>My Button</button>
  </IFrame>
));
```

## With Vue

```jsx
import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { IFrame } from "storybook-vue-iframe/vue";

storiesOf("Button").add("With Iframe", () => ({
  components: { IFrame },
  template: `
      <iframe url="https://www.google.com">
        <button>My Button</button>
      </iframe>
    `
}));
```

## Embed a different design on each story

```jsx
import React from "react";
import { storiesOf } from "@storybook/react";
import { IFrame } from "storybook-vue-iframe";

storiesOf("Button")
  .add("primary", () => (
    <IFrame url={"https://www.google.com"}>
      <button>My Button</button>
    </IFrame>
  ))
  .add("secondary", () => (
    <IFrame url={"https://www.google.com"}>
      <button>My Secondary Button</button>
    </IFrame>
  ));
```

## Or use the decorator to put the same design on each story

```jsx
import React from "react";
import { storiesOf } from "@storybook/react";
import IframeDecorator from "storybook-vue-iframe";
import App from "./components/App";

storiesOf("App")
  .addDecorator(
    IframeDecorator({
      url: "https://www.google.com"
    })
  )
  .add("My App", () => <App />);
```

## Show Iframe design in right panel

If you find that the Iframe panel at the bottom is not big enough to fit your designs, it is possible to move the panel to the right of the window instead, where it is possible to give it more space. This requires the [@storybook/addons-options](https://github.com/storybooks/storybook/tree/master/addons/options) addon. Note however that it is only possible to do this for **all** stories at once, and will move all addon panels to the right. A simple setup is shown here.

Install the addon

```sh
npm install --save-dev @storybook/addon-options
```

Register the options addon in your `addons.js`

```jsx
// in .storybook/addons.js
import "@storybook/addon-actions/register";
import "storybook-vue-iframe/register";
// register the options addon
import "@storybook/addon-options/register";
```

Import and use the `setOptions` function in your `config.js` file

```jsx
// in .storybook/config.js
import * as storybook from "@storybook/react";
// import the options function
import { setOptions } from "@storybook/addon-options";

// set option to show panel in right side
setOptions({
  downPanelInRight: true
});

storybook.configure(() => require("./stories"), module);
```
