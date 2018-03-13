import Menu from '../Menu';

/**
 * Give an wrapper instance from enzyme.mount
 * it will return it's submenu
 */
function getSubMenu(wrapper) {
  const subMenu = wrapper.find(Menu).reduce((acc, menu) => {
    if (menu.props().subMenu) {
      acc = menu;
    }

    return acc;
  }, null);

  return subMenu;
}

export default getSubMenu;
