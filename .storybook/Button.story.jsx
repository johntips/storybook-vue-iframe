import React from "react";
import { storiesOf } from "@storybook/react";
import { IFrame } from "../src/index";

const style = {
  margin: 0,
  padding: "0.7rem 1.5rem",
  background: "#168eea",
  color: "white",
  border: 0,
  borderRadius: "2rem",
  cursor: "pointer"
};

storiesOf("Button")
  .add("With Iframe", () => (
    <IFrame url={"https://www.google.com"}>
      <button style={style}>Button Primary</button>
    </IFrame>
  ))
  .add("With Iframe No Fullscreen Option", () => (
    <IFrame url={"https://www.google.com"} allowFullScreen={false}>
      <button style={style}>Button Primary</button>
    </IFrame>
  ))
  .add("Without Iframe", () => <button style={style}>Button Primary</button>);
