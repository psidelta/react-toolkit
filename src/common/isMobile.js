import hasTouch from '@zippytech/has-touch';

const mobileTest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

export default hasTouch && mobileTest;
