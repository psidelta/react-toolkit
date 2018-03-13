import { render, findDOMNode, unmountComponentAtNode } from 'react-dom';

const renderInDOM = comp => {
  const target = document.createElement('div');
  document.body.appendChild(target);

  const wrapper = render(comp, target);

  return {
    wrapper,
    wrapperNode: findDOMNode(wrapper),
    target,
    unmount: () => {
      unmountComponentAtNode(target);
      document.body.removeChild(target);
    }
  };
};

export default renderInDOM;
