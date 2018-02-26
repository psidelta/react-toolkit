/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import Menu from '../src';
import NumericInput from '../../NumericInput';
import '../../NumericInput/style/index.scss';

// import '../../../lib/Menu/index.css';
import '../style/index.scss';
import Icon from './Icon';
import submenuExpandBugProps from './submenuExpandBugProps';
import 'typeface-roboto';

import checkIcon from './check-icon.png';

const radioItems = [
  { label: 'Apples' },
  { label: 'Strawberries' },
  '-',
  { label: 'Potatoes' },
  { label: 'Tomatoes' },
  { label: 'Onions' }
];
const items = [
  {
    icon: <img src={checkIcon} />,
    label: 'Back',
    secondaryLabel: 'Alt+Left Arrow',
    // icon: <Icon type="back" />,
    titleStyle: { color: 'blue' }
  },
  {
    label: 'Forward',
    disabled: true,
    secondaryLabel: 'Alt+Right Arrow'
    // icon: <Icon type="forward" />
  },
  {
    label: 'Reload',
    secondaryLabel: 'Ctrl + R'
    // icon: <Icon type="refresh" />
  },
  '-',
  {
    label: 'Back',
    secondaryLabel: 'Alt+Left Arrow',
    // icon: <Icon type="back" />,
    // isTitle: true,
    titleStyle: { color: 'blue' }
  },
  {
    label: 'Forward',
    disabled: true,
    secondaryLabel: 'Alt+Right Arrow'
    // icon: <Icon type="forward" />
  },
  {
    label: 'Reload',
    secondaryLabel: 'Ctrl + R'
    // icon: <Icon type="refresh" />
  },
  '-',
  {
    label: 'Back',
    secondaryLabel: 'Alt+Left Arrow',
    // icon: <Icon type="back" />,
    isTitle: true,
    titleStyle: { color: 'blue' }
  },
  {
    label: 'Forward',
    disabled: true,
    secondaryLabel: 'Alt+Right Arrow'
    // icon: <Icon type="forward" />
  },
  {
    label: 'Reload',
    secondaryLabel: 'Ctrl + R'
    // icon: <Icon type="refresh" />
  },
  '-',
  {
    label: 'Save as...',
    secondaryLabel: 'Ctrl + S'
    // icon: <Icon type="save" />
  },
  {
    label: (
      <NumericInput
        defaultValue={40}
        onChange={value => {
          console.log('change', value);
        }}
        style={{ marginLeft: 40, width: 130 }}
        minValue={28}
        maxValue={60}
      />
    )
  },
  { label: 'Print...', secondaryLabel: 'Ctrl + P' },
  { label: 'Cast...' },
  {
    label: 'Translate to',
    menuProps: {
      dismissOnClick: false
      // enableSelection: true
    },
    items: [
      {
        label: 'English',
        name: 'en',
        value: 'en'
      },
      {
        label: 'French',
        name: 'fr',
        value: 'fr'
      },
      {
        label: 'Baba yetu',
        name: 'en1',
        value: 'en1'
      },
      {
        label: 'Spanish',
        name: 'fr1',
        value: 'fr1'
      },
      {
        label: 'Romanian',
        name: 'en2',
        value: 'en2'
      },
      {
        label: 'Celtic',
        name: 'fr2',
        value: 'fr2'
      },
      {
        label: 'Norse',
        name: 'en3',
        value: 'en3'
      },
      {
        label: 'Yidish',
        name: 'fr3',
        value: 'fr3'
      },
      {
        label: 'German',
        name: 'de',
        value: 'de'
      }
    ]
  },
  {
    label: 'Translate to Disabled',
    // disabled: true,
    items: radioItems
  },
  '-',
  {
    label: 'View page source',
    secondaryLabel: 'Ctrl + U'
  },
  {
    label: 'Inspect',
    secondaryLabel: 'Ctrl + Shift + I'
    // icon: <Icon type="zoomBack" />
  }
].map(item => {
  if (typeof item == 'string') {
    return item;
  }
  return {
    onClick: () => console.warn('you clicked' + item.label),
    ...item
  };
});

const itemsSingleSelect = [
  {
    label: 'Back',
    name: 'back',
    secondaryLabel: 'Alt+Left Arrow',
    icon: <Icon type="back" />
  },
  {
    label: 'Forward',
    name: 'forward',
    secondaryLabel: 'Alt+Right Arrow',
    icon: <Icon type="forward" />
  },
  {
    label: 'Reload',
    secondaryLabel: 'Ctrl + R',
    icon: <Icon type="refresh" />
  },
  '-',
  {
    label: 'Save as...',
    secondaryLabel: 'Ctrl + S',
    icon: <Icon type="save" />
  },
  { label: 'Print...', secondaryLabel: 'Ctrl + P' },
  { label: 'Cast...' },
  {
    label: 'Translate to',
    items: [
      {
        label: 'English',
        value: 'en',
        name: 'language'
      },
      {
        label: 'French',
        value: 'fr',
        name: 'language'
      },
      {
        label: 'German',
        value: 'de',
        name: 'language'
      }
    ]
  },
  '-',
  {
    label: 'View page source',
    secondaryLabel: 'Ctrl + U'
  },
  {
    label: 'Inspect',
    secondaryLabel: 'Ctrl + Shift + I',
    icon: <Icon type="zoomBack" />
  }
];

const itemsNoDescription = [
  {
    label: 'Back',
    icon: <Icon type="back" />
  },
  {
    label: 'Forward',
    disabled: true,
    icon: <Icon type="forward" />
  },
  {
    label: 'Reload',
    icon: <Icon type="refresh" />
  },
  '-',
  {
    label: 'Save as...',
    icon: <Icon type="save" />
  },
  { label: 'Print...' },
  { label: 'Cast...' },
  {
    label: 'Translate to',
    items: [
      {
        label: 'English',
        name: 'en'
      },
      {
        label: 'French',
        name: 'fr'
      },
      {
        label: 'German',
        name: 'de'
      }
    ]
  },
  '-',
  {
    label: 'View page source'
  },
  {
    label: 'Inspect',
    icon: <Icon type="zoomBack" />
  }
];

const itemsNoIconAndDescription = [
  {
    label: 'Back'
  },
  {
    label: 'Forward',
    disabled: true
  },
  {
    label: 'Reload'
  },
  '-',
  {
    label: 'Save as...'
  },
  { label: 'Print...' },
  { label: 'Cast...' },
  {
    label: 'Translate to',
    items: [
      {
        label: 'English',
        name: 'en'
      },
      {
        label: 'French',
        name: 'fr'
      },
      {
        label: 'German',
        name: 'de'
      }
    ]
  },
  '-',
  {
    label: 'View page source'
  },
  {
    label: 'Inspect'
  }
];

// class ContextMenuDemo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     const style = {
//       border: '1px dashed blue',
//       width: 500,
//       height: 500,
//       position: 'relative'
//     };
//     return (
//       <div
//         className="menu-constrain-region"
//         style={style}
//         onContextMenu={this.onContextMenu.bind(this)}
//       >
//         <span style={{ color: 'gray', fontStyle: 'italic' }}>
//           Right-click in this area to display context-menu.
//         </span>
//         {this.renderMenu()}
//       </div>
//     );
//   }
//   renderMenu() {
//     if (!this.state.menuPosition) {
//       return null;
//     }

//     return (
//       <Menu
//         constrainTo=".menu-constrain-region"
//         alignTo={this.state.menuPosition}
//         items={[{ label: 'Save' }, { label: 'Open' }, { label: 'Export' }]}
//         style={{ position: 'absolute', fontSize: 14, fontFamily: 'Roboto' }}
//       />
//     );
//   }
//   dismiss() {
//     this.setState({ menuPosition: null });
//   }
//   onContextMenu(event) {
//     event.preventDefault();

//     this.setState({
//       menuPosition: { left: event.clientX, top: event.clientY }
//     });
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showScrollArrows: false
    };
  }

  render() {
    return (
      <div style={{ border: '1px solid red', padding: 20 }} id="xxx">
        <Menu
          autoFocus
          constrainTo="#xxx"
          nameProperty="name"
          valueProperty="value"
          onDismiss={() => {
            console.log('hide!!!');
          }}
          onChildClick={(event, { item }) => {
            // called when clicking on any menu/submenu item
            console.log('You clicked ' + item.label);
          }}
          allowUnselect={false}
          items={items}
          enableSelection
          // style={{ height: 200 }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
