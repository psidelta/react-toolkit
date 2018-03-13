import React from 'react';
import { mount, shallow } from 'enzyme';

import CloseButton from '../CloseButton';
import Notification from '../Notification';

describe('Notification', () => {
  describe('autoHideDelay', () => {
    it('calls onHide after a delay', done => {
      const onHide = jest.fn();

      mount(<Notification autoHideDelay={300} onHide={onHide} id="test" />);

      expect(onHide).toHaveBeenCalledTimes(0);
      setTimeout(() => {
        expect(onHide).toHaveBeenCalledTimes(1);
        expect(onHide.mock.calls[0][0].id).toEqual('test');
        done();
      }, 300);
    });
  });

  describe('classname', () => {
    it('adds correct stacking className', () => {
      const wrapper = mount(<Notification stacking={['left', 'top']} />);

      expect(
        wrapper.find('.zippy-react-toolkit-notification--stacking-left-top')
      ).toHaveLength(1);
    });
    it('adds --move-transition clasname when true', () => {
      const wrapper = mount(<Notification moveTransition />);

      expect(
        wrapper.find('.zippy-react-toolkit-notification--move-transition')
      ).toHaveLength(1);
    });
    it('adds non-blocking clasname when true', () => {
      const wrapper = mount(<Notification nonBlocking />);

      expect(
        wrapper.find('.zippy-react-toolkit-notification--non-blocking')
      ).toHaveLength(1);
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
      ).toEqual('red');
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
      ).toEqual('1px solid red');
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
      ).toEqual('1px solid red');
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
      ).toEqual('blue');
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
      ).toEqual(20);
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
      ).toEqual(20);
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
      ).toEqual(20);
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
      ).toEqual(20);
    });
  });

  describe('height and width', () => {
    it('if both are set it should not call onSizeChange', () => {
      const onSizeChange = jest.fn();
      const wrapper = mount(
        <Notification onSizeChange={onSizeChange} width={20} height={20} />
      );

      expect(onSizeChange).toHaveBeenCalledTimes(0);
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
      expect({ minWidth, maxWidth, minHeight, maxHeight }).toEqual({
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
      ).toHaveLength(1);
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
      ).toEqual(3);

      wrapper
        .find('.zippy-react-toolkit-notification')
        .at(0)
        .simulate('mouseEnter');
      expect(
        wrapper
          .find('.zippy-react-toolkit-notification')
          .at(0)
          .props().style.opacity
      ).toEqual(1);
    });
  });

  describe('hideOnClick', () => {
    it('should trigger on click when Notification is clicked', () => {
      const onHide = jest.fn();
      const wrapper = shallow(<Notification hideOnClick onHide={onHide} />);
<<<<<<< HEAD:src/Notification/src/__jests__/Notification-test.js
      expect(onHide).toHaveBeenCalledTimes(0);
=======
      expect(onHide.called).to.be.false;
>>>>>>> dev:src/Notification/src/__tests__/Notification-test.js
      wrapper
        .find('.zippy-react-toolkit-notification')
        .at(0)
        .simulate('click');
<<<<<<< HEAD:src/Notification/src/__jests__/Notification-test.js
      expect(onHide).toHaveBeenCalledTimes(1);
=======
      expect(onHide.called).to.be.true;
>>>>>>> dev:src/Notification/src/__tests__/Notification-test.js
    });
  });

  describe('title', () => {
    describe('jsx', () => {
      it('renders jsx', () => {
        const wrapper = shallow(<Notification title={'hello world'} />);
        const title = wrapper.find('.zippy-react-toolkit-notification__title');

        expect(title).toHaveLength(1);
        expect(title.text()).toEqual('hello world');

        wrapper.setProps({ title: <div id="helloWorld" /> });
        expect(wrapper.find('#helloWorld')).toHaveLength(1);
      });
    });
    describe('function', () => {
      it('renders what it returns', () => {
        const title = <div id="childId">hello world</div>;

        const wrapper = mount(<Notification title={title} />);
        expect(wrapper.find('#childId')).toHaveLength(1);
      });
      it('can mutate props', () => {
        const title = domProps => {
          domProps.id = 'mutatedId';
        };
        const wrapper = shallow(<Notification title={title} />);
        expect(wrapper.find('#mutatedId')).toHaveLength(1);
      });
    });
  });

  describe('closeButton', () => {
    it('renders closeButton when true', () => {
      const wrapper = shallow(<Notification closeButton />);
      expect(
        wrapper.find('.zippy-react-toolkit-notification__close-button')
      ).toHaveLength(1);
      expect(wrapper.find(CloseButton)).toHaveLength(1);
    });
    it('renders custom jsx', () => {
      const wrapper = shallow(
        <Notification
          closeButton={<div id="customCloseButton">hello world</div>}
        />
      );
      expect(wrapper.find('#customCloseButton')).toHaveLength(1);
    });
    it('render when is a function', () => {
      const wrapper = shallow(
        <Notification
          closeButton={domProps => {
            domProps.id = 'customMutatedId';
          }}
        />
      );
      expect(wrapper.find('#customMutatedId')).toHaveLength(1);
    });
    it('renders when a function what it returns', () => {
      const wrapper = shallow(
        <Notification
          closeButton={domProps => {
            return <div id="closeButtonCustom">close Icon</div>;
          }}
        />
      );
      expect(wrapper.find('#closeButtonCustom')).toHaveLength(1);
    });
    it('calls onHide when clicked', () => {
      const onHide = jest.fn();
      const wrapper = shallow(<Notification closeButton onHide={onHide} />);
      wrapper
        .find(CloseButton)
        .at(0)
        .simulate('click');
<<<<<<< HEAD:src/Notification/src/__jests__/Notification-test.js
      expect(onHide).toHaveBeenCalledTimes(1);
=======
      expect(onHide.called).to.be.true;
>>>>>>> dev:src/Notification/src/__tests__/Notification-test.js
    });
  });

  describe('icon', () => {
    it('renders jsx', () => {
      const wrapper = shallow(<Notification icon={<div id="icon" />} />);
      expect(wrapper.find('#icon')).toHaveLength(1);
    });
  });

  describe('content', () => {
    it('renders jsx', () => {
      const wrapper = shallow(<Notification content={<div id="content" />} />);
      expect(wrapper.find('#content')).toHaveLength(1);
    });
  });
});
