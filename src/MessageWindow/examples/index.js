import React from 'react';
import { render } from 'react-dom';
// import MessageWindow, {
//   InfoWindow,
//   WarningWindow,
//   QuestionWindow,
//   ErrorWindow,
//   YesNoCancelWindow
// } from '../src';

// import style from '../style/index.scss';

import Button from '../../Button';
import '../../Button/style/index.scss';

import Window from '../../Window';
import '../../Window/style/index.scss';

import MessageWindow, {
  InfoWindow,
  WarningWindow,
  QuestionWindow,
  ErrorWindow,
  YesNoCancelWindow
} from '../src/index';

import '../style/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yesNoCancelvisible: false,
      messageVisible: false,
      infoVisible: false,
      warningVisible: false,
      questionVisible: false,
      errorVisible: false,

      default: false,
      yesNoCancel: false,
      info: false,
      warning: false,
      question: false,
      error: false
    };
  }
  render() {
    return (
      <div
        style={{
          display: 'flex'
        }}
      >
        <div style={{ border: '1px solid gray', width: 250, height: '100%' }}>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ yesNoCancelvisible: true })}
            >
              Show the YesNoCancelWindow
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ messageVisible: true })}
            >
              Show the MessageWindow
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ infoVisible: true })}
            >
              Show the InfoWindow
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ warningVisible: true })}
            >
              Show the WarningWindow
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ questionVisible: true })}
            >
              Show the QuestionWindow
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ errorVisible: true })}
            >
              Show the ErrorWindow
            </button>
          </div>

          <hr />

          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ default: true })}
            >
              Show the default window
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ yesNoCancel: true })}
            >
              Show the YesNoCancelWindow
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ info: true })}
            >
              Show the InfoWindow
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ warning: true })}
            >
              Show the WarningWindow
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ question: true })}
            >
              Show the QuestionWindow
            </button>
          </div>
          <div style={{ margin: 20 }}>
            <button
              style={{ padding: 5 }}
              onClick={() => this.setState({ error: true })}
            >
              Show the ErrorWindow
            </button>
          </div>
        </div>
        <div
          style={{
            margin: '0 auto',
            width: 600,
            height: 700,
            position: 'relative',
            border: '1px dotted red'
          }}
        >
          <InfoWindow
            title="InfoWindow MessageWindow"
            visible={this.state.infoVisible}
            onOkButtonClick={() => this.setState({ infoVisible: false })}
            style={{
              width: 500,
              height: 200
            }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </InfoWindow>
          <WarningWindow
            title="WarningWindow MessageWindow"
            visible={this.state.warningVisible}
            onOkButtonClick={() => this.setState({ warningVisible: false })}
            style={{
              width: 500,
              height: 200
            }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </WarningWindow>
          <QuestionWindow
            title="Info MessageWindow"
            visible={this.state.questionVisible}
            onYesButtonClick={() => this.setState({ questionVisible: false })}
            onNoButtonClick={() => this.setState({ questionVisible: false })}
            style={{
              width: 500,
              height: 200
            }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </QuestionWindow>
          <ErrorWindow
            title="Error MessageWindow"
            visible={this.state.errorVisible}
            onOkButtonClick={() => this.setState({ errorVisible: false })}
            style={{
              width: 500,
              height: 200
            }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </ErrorWindow>

          <YesNoCancelWindow
            title="Yes/No/Cancel MessageWindow"
            visible={this.state.yesNoCancelvisible}
            modal
            relativeToViewport
            style={
              {
                // height: 200
              }
            }
            onYesButtonClick={() =>
              this.setState({ yesNoCancelvisible: false })
            }
            onNoButtonClick={() => this.setState({ yesNoCancelvisible: false })}
            onCancelButtonClick={() =>
              this.setState({ yesNoCancelvisible: false })
            }
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </YesNoCancelWindow>
          <MessageWindow
            title="Server error"
            type="error"
            onOkButtonClick={() => this.setState({ messageVisible: false })}
            visible={this.state.messageVisible}
            style={{ maxHeight: 400 }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </MessageWindow>

          <MessageWindow
            title="Default"
            onOkButtonClick={() => this.setState({ default: false })}
            visible={this.state.default}
            style={{ maxHeight: 400 }}
          >
            Do you see any Teletubbies in here?
          </MessageWindow>
          <MessageWindow
            title="yesNoCancel"
            type="yesNoCancel"
            onYesButtonClick={() => this.setState({ yesNoCancel: false })}
            onNoButtonClick={() => this.setState({ yesNoCancel: false })}
            onCancelButtonClick={() => this.setState({ yesNoCancel: false })}
            visible={this.state.yesNoCancel}
            style={{ maxHeight: 400 }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </MessageWindow>
          <MessageWindow
            title="Info"
            type="info"
            onOkButtonClick={() => this.setState({ info: false })}
            visible={this.state.info}
            style={{ maxHeight: 400 }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </MessageWindow>
          <MessageWindow
            title="Warning"
            type="warning"
            onOkButtonClick={() => this.setState({ warning: false })}
            visible={this.state.warning}
            style={{ maxHeight: 400 }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </MessageWindow>
          <MessageWindow
            title="Question"
            type="question"
            onYesButtonClick={() => this.setState({ question: false })}
            onNoButtonClick={() => this.setState({ question: false })}
            visible={this.state.question}
            style={{ maxHeight: 400 }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </MessageWindow>
          <MessageWindow
            title="Error"
            type="error"
            onOkButtonClick={() => this.setState({ error: false })}
            visible={this.state.error}
            style={{ maxHeight: 400 }}
          >
            Do you see any Teletubbies in here? Do you see a slender plastic tag
            clipped to my shirt with my name printed on it? Do you see a little
            Asian child with a blank expression on his face sitting outside on a
            mechanical helicopter that shakes when you put quarters in it? No?
            Well, that's what you see at a toy store. And you must think you're
            in a toy store, because you're here shopping for an infant named
            Jeb.
          </MessageWindow>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
