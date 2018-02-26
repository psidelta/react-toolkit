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
import React from 'react';
import { mount, shallow } from 'enzyme';

import CloseButton from '../CloseButton';
import Notification from '../Notification';

describe('Notification', () => {
  describe('autoHideDelay', () => {
    it('calls onHide after a delay', () => {
      const clock = sinon.useFakeTimers();
      const onHide = sinon.spy();

      mount(<Notification autoHideDelay={300} onHide={onHide} id="test" />);

      expect(onHide.called).to.be.false;
      clock.tick(300);
      expect(onHide.called).to.be.true;
      expect(onHide.args[0][0].id).to.equal('test');

      clock.restore();
    });
  });

  describe('classname', () => {
    it('adds correct stacking className', () => {
      const wrapper = mount(<Notification stacking={['left', 'top']} />);

      expect(
        wrapper.find('.zippy-react-toolkit-notification--stacking-left-top')
      ).to.have.length(1);
    });
    it('adds --move-transition clasname when true', () => {
      const wrapper = mount(<Notification moveTransition />);

      expect(
        wrapper.find('.zippy-react-toolkit-notification--move-transition')
      ).to.have.length(1);
    });
    it('adds non-blocking clasname when true', () => {
      const wrapper = mount(<Notification nonBlocking />);

      expect(
        wrapper.find('.zippy-react-toolkit-notification--non-blocking')
      ).to.have.length(1);
    });
  });

  describe('style', () => {
    it('adds style prop', () => {
      const wrapper = mount(<Notification style={{ color: 'red' }} />);
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.color
      ).to.equal('red');
    });
  });

  describe('border', () => {
    it('adds border on notification', () => {
      const wrapper = mount(<Notification border="1px solid red" />);
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.border
      ).to.equal('1px solid red');
    });
  });

  describe('borderRadius', () => {
    it('adds borderRadius on notification', () => {
      const wrapper = mount(<Notification borderRadius="1px solid red" />);
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.borderRadius
      ).to.equal('1px solid red');
    });
  });

  describe('background', () => {
    it('adds background on notification', () => {
      const wrapper = mount(<Notification background="blue" />);
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.background
      ).to.equal('blue');
    });
  });

  describe('padding', () => {
    it('adds padding on notification', () => {
      const wrapper = mount(<Notification padding={20} />);
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.padding
      ).to.equal(20);
    });
  });

  describe('width', () => {
    it('adds width on notification', () => {
      const wrapper = mount(<Notification width={20} />);
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.width
      ).to.equal(20);
    });
  });

  describe('height', () => {
    it('adds height on notification', () => {
      const wrapper = mount(<Notification height={20} />);
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.height
      ).to.equal(20);
    });
  });

  describe('opacity', () => {
    it('adds opacity on notification', () => {
      const wrapper = mount(<Notification opacity={20} />);
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.opacity
      ).to.equal(20);
    });
  });

  xdescribe('height and width', () => {
    it('if both are set it should not call onSizeChange', () => {
      const onSizeChange = sinon.spy();
      const wrapper = mount(
        <Notification onSizeChange={onSizeChange} width={20} height={20} />
      );

      expect(onSizeChange.called).to.be.false;
    });
  });

  describe('minSize, maxSize', () => {
    it('adds correct minWidth, minHeight, maxWidth, maxHeight', () => {
      const wrapper = mount(
        <Notification
          minSize={{ width: 20, height: 30 }}
          maxSize={{ width: 20, height: 30 }}
        />
      );
      const style = wrapper
        .find('.zippy-react-toolkit-notification')
        .at(0)
        .props().style;

      const { minWidth, maxWidth, minHeight, maxHeight } = style;
      expect({ minWidth, maxWidth, minHeight, maxHeight }).to.deep.equal({
        minWidth: 20,
        maxWidth: 20,
        minHeight: 30,
        maxHeight: 30
      });
    });
  });

  describe('shadow', () => {
    it('adds correct minWidth, minHeight, maxWidth, maxHeight', () => {
      const wrapper = mount(<Notification shadow />);
      expect(
        wrapper.find('.zippy-react-toolkit-notification--shadow')
      ).to.have.length(1);
    });
  });

  describe('clearOpacityOnMouseEnter', () => {
    it('removes opacity when mouse enters notification', () => {
      const wrapper = mount(
        <Notification clearOpacityOnMouseEnter opacity={3} />
      );
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.opacity
      ).to.equal(3);

      wrapper
        .find('.zippy-react-toolkit-notification')
        .at(0)
        .simulate('mouseEnter');
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.opacity
      ).to.equal(1);
    });
  });

  describe('hideOnClick', () => {
    it('should trigger on click when Notification is clicked', () => {
      const onHide = sinon.spy();
      const wrapper = shallow(<Notification hideOnClick onHide={onHide} />);
      expect(onHide.called).to.be.false;
      wrapper.find('.zippy-react-toolkit-notification').at(0).simulate('click');
      expect(onHide.called).to.be.true;
    });
  });

  describe('title', () => {
    describe('jsx', () => {
      it('renders jsx', () => {
        const wrapper = shallow(<Notification title={'hello world'} />);
        const title = wrapper.find('.zippy-react-toolkit-notification__title');

        expect(title).to.have.length(1);
        expect(title.text()).to.equal('hello world');

        wrapper.setProps({ title: <div id="helloWorld" /> });
        expect(wrapper.find('#helloWorld')).to.have.length(1);
      });
    });
    describe('function', () => {
      it('renders what it returns', () => {
        const title = () => {
          return <div id="childId">hello world</div>;
        };
        const wrapper = shallow(<Notification title={title} />);
        expect(wrapper.find('#childId')).to.have.length(1);
      });
      it('can mutate props', () => {
        const title = domProps => {
          domProps.id = 'mutatedId';
        };
        const wrapper = shallow(<Notification title={title} />);
        expect(wrapper.find('#mutatedId')).to.have.length(1);
      });
    });
  });

  describe('closeButton', () => {
    it('renders closeButton when true', () => {
      const wrapper = shallow(<Notification closeButton />);
      expect(
        wrapper.find('.zippy-react-toolkit-notification__close-button')
      ).to.have.length(1);
      expect(wrapper.find(CloseButton)).to.have.length(1);
    });
    it('renders custom jsx', () => {
      const wrapper = shallow(
        <Notification
          closeButton={<div id="customCloseButton">hello world</div>}
        />
      );
      expect(wrapper.find('#customCloseButton')).to.have.length(1);
    });
    it('render when is a function', () => {
      const wrapper = shallow(
        <Notification
          closeButton={domProps => {
            domProps.id = 'customMutatedId';
          }}
        />
      );
      expect(wrapper.find('#customMutatedId')).to.have.length(1);
    });
    it('renders when a function what it returns', () => {
      const wrapper = shallow(
        <Notification
          closeButton={domProps => {
            return <div id="closeButtonCustom">close Icon</div>;
          }}
        />
      );
      expect(wrapper.find('#closeButtonCustom')).to.have.length(1);
    });
    it('calls onHide when clicked', () => {
      const onHide = sinon.spy();
      const wrapper = shallow(<Notification closeButton onHide={onHide} />);
      wrapper.find(CloseButton).at(0).simulate('click');
      expect(onHide.called).to.be.true;
    });
  });

  describe('icon', () => {
    it('renders jsx', () => {
      const wrapper = shallow(<Notification icon={<div id="icon" />} />);
      expect(wrapper.find('#icon')).to.have.length(1);
    });
  });

  describe('content', () => {
    it('renders jsx', () => {
      const wrapper = shallow(<Notification content={<div id="content" />} />);
      expect(wrapper.find('#content')).to.have.length(1);
    });
  });
});
