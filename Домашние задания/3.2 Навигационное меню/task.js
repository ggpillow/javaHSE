const menuLinks = document.querySelectorAll('.menu__link');

menuLinks.forEach((link) => {
  link.onclick = function () {
    const item = link.closest('.menu__item');
    if (!item) {
      return true;
    }

    const submenu = item.querySelector('.menu_sub');

    if (!submenu) {
      return true;
    }

    const mainMenu = item.closest('.menu_main');

    if (mainMenu) {
      const activeSubs = mainMenu.querySelectorAll('.menu_sub.menu_active');
      activeSubs.forEach((menu) => {
        if (menu !== submenu) {
          menu.classList.remove('menu_active');
        }
      });
    }

    submenu.classList.toggle('menu_active');
    return false;
  };
});
