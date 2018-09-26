import React from "react";
import PropTypes from "prop-types";
import addons from "@storybook/addons";
import { ADDON_ID, PANEL_ID, EVENT_ID } from "./shared";

export class IframePanel extends React.Component {
  static initialState = {
    embedHost: "storybook",
    url: null,
    allowFullScreen: true
  };
  static propTypes = {
    channel: PropTypes.object,
    api: PropTypes.object
  };
  static defaultProps = {
    channel: {},
    api: {}
  };

  constructor(...args) {
    super(...args);
    this.state = {
      ...IframePanel.initialState
    };
    this.onAddIframe = this.onAddIframe.bind(this);
  }

  componentDidMount() {
    const { channel, api } = this.props;
    channel.on(EVENT_ID, this.onAddIframe);

    this.stopListeningOnStory = api.onStory(() => {
      this.onAddIframe({ ...IframePanel.initialState });
    });
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel } = this.props;
    channel.removeListener(EVENT_ID, this.onAddIframe);
  }

  onAddIframe({
    url,
    embedHost = IframePanel.initialState.embedHost,
    allowFullScreen = IframePanel.initialState.allowFullScreen
  }) {
    this.setState({
      url,
      embedHost,
      allowFullScreen
    });
  }

  render() {
    const { url, allowFullScreen, embedHost } = this.state;

    if (!url) {
      return (
        <div
          style={{
            margin: "1rem",
            fontFamily: "Arial",
            fontSize: "1rem",
            color: "#444",
            width: "100%",
            overflow: "auto"
          }}
        >
          <strong>Oh Hey! 👋 Add a Iframe design to your story:</strong>
          <pre>
            {`
          import React from 'react'
          import { storiesOf } from '@storybook/react'
          import { IFrame } from 'storybook-vue-iframe'

          storiesOf('Button', module)
            .add('default', () => (
              <IFrame
                url={'https://www.google.com'}
              >
                <button>Hello</button>
              </IFrame>
            ))`}
          </pre>
        </div>
      );
    }
    return (
      <iframe
        height="100%"
        width="100%"
        frameBorder="0"
        src={`${url}`}
        allowFullScreen={allowFullScreen}
      />
    );
  }
}

addons.register(ADDON_ID, api => {
  addons.addPanel(PANEL_ID, {
    title: "Iframe",
    render: () => <IframePanel channel={addons.getChannel()} api={api} />
  });
});
