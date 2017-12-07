/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions, global-require */

import { AppRegistry, View } from "react-native";
import React, { Component } from "react";
import { getStorybookUI, configure } from "@storybook/react-native";
import "loki/configure-react-native";
import ViewShot from "react-native-view-shot";
import { captureScreen } from "react-native-view-shot";

// import stories
configure(() => {
  require("./stories");
}, module);
const StorybookUI = getStorybookUI({ port: 7007, host: "localhost" });

class MyWrapper extends Component {
  componentDidMount() {
    global.saveScreen = cb => {
      cb();
      captureScreen({
        format: "png",
        result: "base64",
      }).then(
        uri => {
          console.log("Image saved to");
          cb();
        },
        error => console.error("Oops, snapshot failed", error)
      );
    };
  }

  render() {
    return (
      <View ref={() => this.ref} style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    );
  }
}

AppRegistry.registerComponent("Loki", () => MyWrapper);
export default StorybookUI;
