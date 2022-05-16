// $( document ).ready(function() {
  const toggleExpandEls = document.querySelectorAll('.js-toggle-expand');
  const mainMenuOpenClass = 'main-menu--open';
  const expandMenuOpenClass = 'expand-sub--open';
  const mainMenuSubOpenClass = 'main-menu--sub-open';
  const mainMenuItemClass = '.main-menu__item';
  const mainMenuItemEls = document.querySelectorAll(mainMenuItemClass);
  const items = document.querySelectorAll('.js-main-menu-item');
  const MOBILE_BREAKPOINT = 970;

  if (toggleExpandEls) {
    const expandMenu = document.querySelectorAll('.js-main-menu-expand');

    // mobile view
    toggleExpandEls.forEach((toggleExpandEl) => {
      toggleExpandEl.addEventListener('click', (e) => {
        const targetEl = toggleExpandEl.nextElementSibling;
        const elOpen = e.target.closest('.toggle-expand--open');

        // close siblings
        document.querySelectorAll('.toggle-expand--open').forEach((el) => {
          el.classList.remove('toggle-expand--open');
          el.nextElementSibling.classList.remove('is-open');
        });

        if (!elOpen) {
          toggleExpandEl.classList.add('toggle-expand--open');
          targetEl.classList.add('is-open');
        }

        e.preventDefault();
      });
    });

    // open the menu item "el" - add classes
    const open = (el) => {
      const $el = $(el);
      const subEl = $el.find('.main-menu--sub').first();
      const buttonEl = $(el).find('.js-main-menu-expand').first();

      $el.addClass(mainMenuOpenClass);
      $el.find('.js-main-menu-expand').first().addClass(expandMenuOpenClass);
      subEl.addClass(mainMenuSubOpenClass);

      // keyboard navigation
      buttonEl.get(0).focus();
    };

    // remove all open classes from open menu item "el"
    const close = (el) => {
      const $el = $(el);
      const buttonEl = $(el).find('.js-main-menu-expand').first();
      const subEl = $el.find('.main-menu--sub').first();

      buttonEl.removeClass(expandMenuOpenClass);
      $el.removeClass(mainMenuOpenClass);
      subEl.removeClass(mainMenuSubOpenClass);

      // keyboard navigation
      buttonEl.get(0).focus();
    };

    const toggleMenu = (e) => {
      const parentEl = e.target.closest('.js-main-menu-item');
      const openItem = document.querySelector('.main-menu--open');
      const childSub = $(e.target).parents('.main-menu--sub-open').length;

      // close open menu items unless the clicked item is a child menu
      if (openItem && openItem !== parentEl && !childSub) {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          // on mobile, close parent and its children
          parentEl.querySelectorAll('.main-menu--open').forEach((item) => {
            close(item);
          });
        } else {
          // on desktop, only close the parent
          close(openItem);
        }
      }

      // check to see if currenttarget is open
      if ($(parentEl).hasClass(mainMenuOpenClass)) {
        close(parentEl);
      } else {
        open(parentEl);
      }
    };

    // close any open menu items when clicking on document
    document.addEventListener('click', (e) => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        const openMenuItems = document.querySelectorAll(
          `.${mainMenuOpenClass}`,
        );
        const closeMenu =
          !e.target.closest('.js-main-menu-item') && openMenuItems.length;
        const dropdownEl = document.querySelector(
          `.header .js-expand.is-open`,
        );
        const closeDropdown = !e.target.closest('.js-expand') && dropdownEl;

        if (closeMenu) {
          openMenuItems.forEach((item) => {
            close(item);
          });
        } else if (closeDropdown) {
          // close expand-collapse
          const targetEl = dropdownEl.querySelector('.js-expand-target');
          const triggerlEl = dropdownEl.querySelector('.js-expand-trigger');
          targetEl.setAttribute('aria-hidden', 'true');
          triggerlEl.setAttribute('aria-expanded', 'false');

          // set the height for slide animation
          targetEl.style.height = '0px';

          dropdownEl.classList.remove('is-open');
        }
      }
    });

    mainMenuItemEls.forEach((el) => {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          close(el);
        }
      });
    });

    // Expose mobile sub menu on click.
    Array.from(expandMenu).forEach((item) => {
      item.addEventListener('click', toggleMenu);
    });

    // open on mobile on pageload
    items.forEach((item) => {
      if (item.classList.contains('workspace-menu__item--child-active')) {
        console.log('open', item);
        open(item);
      }
    });
  }
// });