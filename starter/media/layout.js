function initLeftMenu () {
  $('.left-menu-item').collapse({
    toggle: '.left-menu-marker',
    target: '.left-menu',
    startActive: 'is-current'
  });
  $('.left-main-menu-item').collapse({
    toggle: '.left-main-menu-marker',
    target: '.left-main-menu',
    startActive: 'is-current'
  });
};
