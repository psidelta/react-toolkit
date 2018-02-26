import isMobile from './isMobile';

export default (isMobile
  ? {
      onMouseDown: 'onTouchStart',
      onMouseUp: 'onTouchEnd',
      onMouseMove: 'onTouchMove'
    }
  : {
      onMouseDown: 'onMouseDown',
      onMouseUp: 'onMouseUp',
      onMouseMove: 'onMouseMove'
    });
