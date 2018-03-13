import internalGetSelectionStart from './get-selection-start';
import internalGetSelectionEnd from './get-selection-end';

// TODO can be utils function
export default function getSelectedRange(dom, api = {}) {
  const {
    getSelectionEnd = internalGetSelectionEnd,
    getSelectionStart = internalGetSelectionStart
  } = api;

  return {
    start: getSelectionStart(dom),
    end: getSelectionEnd(dom)
  };
}
