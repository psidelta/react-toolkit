import { render, findDOMNode, unmountComponentAtNode } from 'react-dom';

const renderInDOM = (comp, domTarget = document.body) => {
  const target = document.createElement('div');
  domTarget.appendChild(target);

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
