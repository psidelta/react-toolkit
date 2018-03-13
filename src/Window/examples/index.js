import React from 'react';
import { render } from 'react-dom';
import Window from '../src';
import Icon from '../../common/Icon';
import Button from '../../Button';
import LoadMask from '../../LoadMask';
import '../../LoadMask/style/index.scss';
// import '../../../lib/Window/theme/green-500.css';

import style from '../style/index.scss';
import './index.scss';

class Cmp extends React.Component {
  componentWillUnmount() {}

  render() {
    return <div>content here</div>;
  }
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       visible: true,
//       size: 19
//     };
//   }
//   render() {
//     return (
//       <div>
//         <div style={{ marginBottom: 20 }}>
//           Size:{' '}
//           <input
//             style={{ width: 60 }}
//             type="number"
//             value={this.state.size}
//             onChange={ev => this.setState({ size: ev.target.value })}
//           />
//         </div>
//         <Window
//           title="hello world"
//           xborderRadius={'15px'}
//           xtitleBarPosition="left"
//           xtitleRotate={90}
//           modal
//           renderFooter={() => (
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'flex-end',
//                 padding: 10
//               }}
//             >
//               <Button>save</Button>
//             </div>
//           )}
//         >
//           <p>
//             <strong> false is keepPositionOnConstrain </strong>
//             Do you see any Teletubbies in here? Do you see a slender plastic tag
//             clipped to my shirt with my name printed on it? Do you see a little
//             Asian child with a blank expression on his face sitting outside on a
//             mechanical helicopter that shakes when you put quarters in it? No?
//             Well, that s what you see at a toy store. And you must think you re
//             in a toy store, because you re here shopping for an infant named
//             Jeb.
//           </p>
//         </Window>
//       </div>
//     );
//   }
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: true,
      relativeToViewport: false,
      centered: false,
      modal: false,
      position: { left: '10%', top: '20%' }
    };
  }
  render() {
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <div style={{ marginBottom: 20 }}>
          <button
            key="button_1"
            style={{ marginRight: 5 }}
            onClick={() => this.setState({ visible1: true })}
          >
            Window 1
          </button>
          <button
            key="button_2"
            style={{ marginRight: 5 }}
            onClick={() => this.setState({ visible2: true })}
          >
            Window 2
          </button>
          <button
            key="button_3"
            style={{ marginRight: 5 }}
            onClick={() => this.setState({ visible3: true })}
          >
            Window 3
          </button>
          <button
            key="button_4"
            style={{ marginRight: 5 }}
            onClick={() => this.setState({ visible4: true })}
          >
            Window 4
          </button>
        </div>
        <div style={{ marginBottom: 20 }} />

        <Window
          title="Zippy Toolkit 1"
          // modal={true}
          visible={this.state.visible1}
          onClose={() => this.setState({ visible1: false })}
          defaultPosition={{ left: '35%', top: '40%' }}
          // relativeToViewport
        >
          Zippy React Toolkit is designed to be a comprehensive set of rich UI
          components built with React and that can be easily integrated into
          existing or new applications. We've gone through a lot of iterations
          to make sure we provide a rich and flexible component set that is
          actually useful and help you speed-up app development. We focus on
          building components, so you can focus on what actually matters to you
          - building & shipping your app faster to the market.
        </Window>
        <Window
          title="Zippy Toolkit 2"
          modal={true}
          visible={this.state.visible2}
          onClose={() => this.setState({ visible2: false })}
          defaultPosition={{ left: '35%', top: '40%' }}
          relativeToViewport
        >
          Zippy React Toolkit is designed to be a comprehensive set of rich UI
          components built with React and that can be easily integrated into
          existing or new applications. We've gone through a lot of iterations
          to make sure we provide a rich and flexible component set that is
          actually useful and help you speed-up app development. We focus on
          building components, so you can focus on what actually matters to you
          - building & shipping your app faster to the market.
        </Window>
        <Window
          title="Zippy Toolkit 3"
          modal={true}
          visible={this.state.visible3}
          onClose={() => this.setState({ visible3: false })}
          defaultPosition={{ left: '35%', top: '40%' }}
          relativeToViewport
        >
          Zippy React Toolkit is designed to be a comprehensive set of rich UI
          components built with React and that can be easily integrated into
          existing or new applications. We've gone through a lot of iterations
          to make sure we provide a rich and flexible component set that is
          actually useful and help you speed-up app development. We focus on
          building components, so you can focus on what actually matters to you
          - building & shipping your app faster to the market.
        </Window>
        <div
          id="constrain-to"
          style={{
            position: 'relative',
            width: 600,
            height: 700,
            border: '1px dotted blue'
          }}
        >
          <Window
            title="Zippy Toolkit 4"
            constrainTo="#constrain-to"
            modal={this.state.modal}
            titleBarStyle={{ zIndex: 111 }}
            relativeToViewport={this.state.relativeToViewport}
            position={this.state.position}
            visible={this.state.visible4}
            onClose={() => this.setState({ visible4: false })}
            defaultCentered
            keepAspectRatio={true}
            keepChildrenOnMove={true}
            keepCenteredOnResize={false}
            onPositionChange={position => this.setState({ position })}
            renderFooter={() => {
              return <button>x</button>;
            }}
          >
            <LoadMask visible />
            Minim consectetur consectetur labore ut sit sunt adipisicing
            consectetur do pariatur enim dolor tempor eiusmod. Dolore sint
            laboris reprehenderit in excepteur deserunt ullamco aute et esse
            exercitation magna enim. Et reprehenderit consectetur quis excepteur
            ad et incididunt esse ut duis adipisicing proident. Enim ad aute id
            sint excepteur pariatur sunt tempor officia. Minim consectetur
            consectetur labore ut sit sunt adipisicing consectetur do pariatur
            enim dolor tempor eiusmod. Dolore sint laboris reprehenderit in
            excepteur deserunt ullamco aute et esse exercitation magna enim. Et
            reprehenderit consectetur quis excepteur ad et incididunt esse ut
            duis adipisicing proident. Enim ad aute id sint excepteur pariatur
            sunt tempor officia. Minim consectetur consectetur labore ut sit
            sunt adipisicing consectetur do pariatur enim dolor tempor eiusmod.
            Dolore sint laboris reprehenderit in excepteur deserunt ullamco aute
            et esse exercitation magna enim. Et reprehenderit consectetur quis
            excepteur ad et incididunt esse ut duis adipisicing proident. Enim
            ad aute id sint excepteur pariatur sunt tempor officia. Minim
            consectetur consectetur labore ut sit sunt adipisicing consectetur
            do pariatur enim dolor tempor eiusmod. Dolore sint laboris
            reprehenderit in excepteur deserunt ullamco aute et esse
            exercitation magna enim. Et reprehenderit consectetur quis excepteur
            ad et incididunt esse ut duis adipisicing proident. Enim ad aute id
            sint excepteur pariatur sunt tempor officia. Minim consectetur
            consectetur labore ut sit sunt adipisicing consectetur do pariatur
            enim dolor tempor eiusmod. Dolore sint laboris reprehenderit in
            excepteur deserunt ullamco aute et esse exercitation magna enim. Et
            reprehenderit consectetur quis excepteur ad et incididunt esse ut
            duis adipisicing proident. Enim ad aute id sint excepteur pariatur
            sunt tempor officia.
            <Cmp />
            <div>
              relativeToViewport:
              <input
                type="checkbox"
                checked={this.state.relativeToViewport}
                onChange={ev =>
                  this.setState({ relativeToViewport: ev.target.checked })
                }
              />
            </div>
            <div>
              centered:
              <input
                type="checkbox"
                checked={this.state.centered}
                onChange={ev => this.setState({ centered: ev.target.checked })}
              />
            </div>
            <div>
              modal:
              <input
                type="checkbox"
                checked={this.state.modal}
                onChange={ev => this.setState({ modal: ev.target.checked })}
              />
            </div>
          </Window>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
