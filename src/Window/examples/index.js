import React from 'react';
import { render, createPortal } from 'react-dom';
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

const portal = node => createPortal(node, document.getElementById('portal'));

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
      maximized: false,
      relativeToViewport: false,
      position: { left: '10%', top: '20%' }
    };
  }
  render() {
    global.show1 = () => {
      this.setState({
        visible1: true
      });
    };

    const onRestore = () => this.setState({ maximized: false });
    const onMaximize = () => this.setState({ maximized: true });

    return (
      <div style={{ height: '100%' }}>
        <button
          onClick={() => {
            this.setState({
              relativeToViewport: !this.state.relativeToViewport
            });
          }}
        >
          relative to viewport toggle - now{' '}
          {`${!!this.state.relativeToViewport}`}
        </button>
        <Window
          title="xxx"
          defaultSize={{ width: 200, height: 200 }}
          defaultPosition={{ top: 500, left: 400 }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
