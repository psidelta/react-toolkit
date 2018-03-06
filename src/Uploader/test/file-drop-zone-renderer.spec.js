import React from 'react';
import {shallow, mount} from 'enzyme';

import {FileDropZoneRenderer, CLASS_NAME} from '../src/FileDropZoneRenderer';

describe('FileDropZoneRenderer', () => {

  let component, instance;

  function assertClassNameContainsClasses(className, classArray, key='') {
    classArray.forEach((classTargetName)=>{
      expect(className, `${key} ${classTargetName} should be contained`).to.contain(classTargetName);
    });
  }

  describe('default behavior', () => {
    it('should render without any props', () => {
      component = shallow(<FileDropZoneRenderer/>);
      expect(component.instance()).to.be.instanceOf(FileDropZoneRenderer);
    });

    it('should have proper className', () => {
      component = shallow(<FileDropZoneRenderer forwardProp={{isEmpty:true}}/>);
      let classNames;
      classNames = component.prop('className');

      assertClassNameContainsClasses(classNames, [
        CLASS_NAME,
        `${CLASS_NAME}--empty`
      ], 'isEmpty:');

      component.setProps({
        forwardProp: {
          isOver: true,
          isEmpty: false
        }
      });

      classNames = component.prop('className');

      assertClassNameContainsClasses(classNames, [
        CLASS_NAME,
        `${CLASS_NAME}--over`
      ], 'isOver:');

      component.setProps({
        forwardProp: {
          isOver: false,
          isEmpty: false,
          isValid: true
        }
      });

      classNames = component.prop('className');

      assertClassNameContainsClasses(classNames, [
        CLASS_NAME,
        `${CLASS_NAME}--valid`,
        `${CLASS_NAME}--hasfiles`,
      ], 'isValid:');

      component.setProps({
        forwardProp: {
          isOver: false,
          isEmpty: false,
          isValid: false,
          acceptInvalid: true
        }
      });

      classNames = component.prop('className');

      assertClassNameContainsClasses(classNames, [
        CLASS_NAME,
        `${CLASS_NAME}--invalid`,
        `${CLASS_NAME}--hasfiles`,
      ], 'isInValid:');
    });

    // it('should be able to render default states based on set props');

    it('should swtich between empty, invalid, over or list subcomponents', () => {

      const EmptyText = <div id='empty'/>;
      const InvalidText = <div id='invalid'/>;
      const OverText = <div id='over'/>;

      const EmptyStyle = { color: 'red' };
      const InvalidStyle = { color: 'blue' };
      const OverStyle = { color: 'green' };

      const EmptyClass = 'red';
      const InvalidClass = 'blue';
      const OverClass = 'green';

      component = shallow(
        <FileDropZoneRenderer
          forwardProp={{isEmpty:true, acceptInvalid:true}}
          emptyText={EmptyText}
          emptyStyle={EmptyStyle}
          emptyClass={EmptyClass}
          invalidText={InvalidText}
          invalidStyle={InvalidStyle}
          invalidClass={InvalidClass}
          overText={OverText}
          overStyle={OverStyle}
          overClass={OverClass}
        />
      );


      let propsSetToChild;

      propsSetToChild = component.props();

      expect(component.find("[id='empty']"), 'EmptyText').to.have.length(1);

      expect(propsSetToChild).to.have.property('style');
      expect(propsSetToChild.style).toEqual(EmptyStyle);
      expect(propsSetToChild.className).to.contain(EmptyClass);

      component.setProps({
        forwardProp:{
          isOver: true
        }
      });

      propsSetToChild = component.props();

      expect(component.find("[id='over']"), 'OverText').to.have.length(1);
      expect(propsSetToChild).to.have.property('style');
      expect(propsSetToChild.style).toEqual(OverStyle);
      expect(propsSetToChild.className).to.contain(OverClass);

      component.setProps({
        forwardProp:{
          isOver: false,
          isValid: false
        }
      });

      propsSetToChild = component.props();

      expect(component.find("[id='invalid']"), 'InvalidText').to.have.length(1);
      expect(propsSetToChild.style).toEqual(InvalidStyle);
      expect(propsSetToChild.className).to.contain(InvalidClass);

      component.setProps({
        forwardProp:{
          isValid: true,
          acceptInvalid: false
        }
      });

      expect(component.find("[id='invalid']"), 'InvalidText').to.not.have.length(1);

    });

  });

  describe('setting props', () => {
    it('should set all event props on root node', () => {
      const spy = sinon.spy();
      const eventsProps = {
        onClick: spy,
        onDrop: spy,
        onMouseOver: spy
      };

      component = shallow(
        <FileDropZoneRenderer
          forwardProp={{events:eventsProps}}
        />
      );

      const propsSetToChild = component.props();

      Object.keys(eventsProps).forEach((key)=>{
        expect(propsSetToChild, `has prop ${key}`).to.have.property(key, eventsProps[key]);
      });
    });

    it('should set all props that do not show in proptypes to root node', () => {
      const validProps = {
        onClick: ()=>{},
        onMouseOver: ()=>{},
        tabIndex: 0
      };

      const style = { padding: 5 };
      const className = 'custom';

      component = shallow(
        <FileDropZoneRenderer
          {...validProps}
          className={className}
          style={style}
        />
      );

      const propsSetToChild = component.props();

      Object.keys(validProps).forEach((key)=>{
        expect(propsSetToChild, `has prop ${key}`).to.have.property(key, validProps[key]);
      });

      expect(propsSetToChild.className).to.contain(className);
      expect(propsSetToChild.style).toEqual(style);
    });
  });

  describe('setting function child', () => {
    it('should run set function child instead of default one', () => {
      const customRenderFunction = sinon.spy(()=>(<div/>));
      component = shallow(
        <FileDropZoneRenderer>
          {customRenderFunction}
        </FileDropZoneRenderer>
      );

      expect(customRenderFunction).to.have.been.calledOnce;
    });

    // unless we want to make additonal change to the props propagation,
    // this will fail. The empty/invalid/over props are not usefull here,
    // they could be removed but there would be a cost in calling another
    // props filter function.
    it.skip('should not pass down style/class/text props for empty, invalid or over', () => {
      const customRenderFunction = sinon.spy(()=>(<div/>));
      component = shallow(
        <FileDropZoneRenderer>
          {customRenderFunction}
        </FileDropZoneRenderer>
      );

      const firstCallProps = customRenderFunction.getCall(0).args[0];

      expect(firstCallProps).to.not.have.property('emptyText');
      expect(firstCallProps).to.not.have.property('emptyStyle');
      expect(firstCallProps).to.not.have.property('emptyClass');

      expect(firstCallProps).to.not.have.property('overText');
      expect(firstCallProps).to.not.have.property('overStyle');
      expect(firstCallProps).to.not.have.property('overClass');

      expect(firstCallProps).to.not.have.property('invalidText');
      expect(firstCallProps).to.not.have.property('invalidStyle');
      expect(firstCallProps).to.not.have.property('invalidClass');
    });

    it('should pass down and call function with all passed HOC props', () => {
      const customRenderFunction = sinon.spy(()=>(<div/>));
      const forwardProp = {
        files: [],
        isOver: true,
        isValid: true,
        isEmpty: false,
        events: {}
      }

      component = shallow(
        <FileDropZoneRenderer forwardProp={forwardProp}>
          {customRenderFunction}
        </FileDropZoneRenderer>
      );

      const firstCallProps = customRenderFunction.getCall(0).args[0];

      expect(firstCallProps).to.have.property('files');
      expect(firstCallProps).to.have.property('events');
      expect(firstCallProps).to.have.property('isOver');
      expect(firstCallProps).to.have.property('isValid');
      expect(firstCallProps).to.have.property('isEmpty');
    });
  });

});
