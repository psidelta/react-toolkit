import Region from '@zippytech/region';

let CACHED;
let LISTENING_WINDOW_RESIZE;

const setupWindowResize = () => {
  LISTENING_WINDOW_RESIZE = true;
  global.addEventListener('resize', () => {
    CACHED = null;
  });
};

function getViewportRegion() {
  if (CACHED) {
    return CACHED;
  }

  if (!LISTENING_WINDOW_RESIZE) {
    setupWindowResize();
  }

  const viewportWidth = Math.max(
    global.document.documentElement.clientWidth,
    global.innerWidth || 0
  );
  const viewportHeight = Math.max(
    global.document.documentElement.clientHeight,
    global.innerHeight || 0
  );

  return (CACHED = Region.from({
    top: 0,
    left: 0,
    width: viewportWidth,
    height: viewportHeight
  }));
}

export default getViewportRegion;
