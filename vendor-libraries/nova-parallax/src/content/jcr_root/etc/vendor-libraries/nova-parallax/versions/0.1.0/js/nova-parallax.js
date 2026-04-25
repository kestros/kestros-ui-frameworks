/* nova-lifestyle 1.2.0 — true JS-driven parallax.
 *
 * Replaces the CSS-only `background-attachment: fixed` fallback from
 * 1.1.0 with a proper requestAnimationFrame loop that translates each
 * `.nl-parallax-bg` layer based on how far its section has scrolled
 * through the viewport. Uses IntersectionObserver to only animate
 * visible sections. Respects prefers-reduced-motion.
 *
 * No dependencies. ~1.5KB minified. Runs on DOMContentLoaded.
 */
(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  var reducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  // Disable on touch-primary devices — scroll-driven parallax is janky
  // on mobile Safari anyway because of scroll bounce.
  var isTouch =
    'ontouchstart' in window ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  var isNarrow = window.innerWidth < 769;
  if (isTouch && isNarrow) return;

  function init() {
    var sections = document.querySelectorAll('section[data-parallax="true"]');
    if (!sections.length) return;

    var items = [];
    sections.forEach(function (section) {
      var bg = section.querySelector('.nl-parallax-bg');
      if (!bg) return;
      var speed = parseFloat(section.getAttribute('data-parallax-speed')) || 0.5;
      // Clamp speed so overshooting content doesn't go crazy
      if (speed < 0.1) speed = 0.1;
      if (speed > 0.9) speed = 0.9;
      items.push({ section: section, bg: bg, speed: speed, visible: false });
    });
    if (!items.length) return;

    // Track which sections are on-screen to skip off-screen work
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var match = items.find(function (it) {
              return it.section === entry.target;
            });
            if (match) match.visible = entry.isIntersecting;
          });
        },
        { rootMargin: '25% 0px 25% 0px' },
      );
      items.forEach(function (it) { observer.observe(it.section); });
    } else {
      // No IO support → just animate all sections
      items.forEach(function (it) { it.visible = true; });
    }

    var pending = false;
    function update() {
      pending = false;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      items.forEach(function (it) {
        if (!it.visible) return;
        var rect = it.section.getBoundingClientRect();
        // Distance from viewport center — 0 when section center is at
        // viewport center, positive when below, negative when above.
        var center = rect.top + rect.height / 2;
        var offsetFromCenter = center - vh / 2;
        // Translate bg by speed * offset. Because the bg layer is
        // taller than the section (via CSS top: -25%; bottom: -25%),
        // moving it up/down reveals different parts without gaps.
        var translate = -offsetFromCenter * it.speed;
        it.bg.style.transform =
          'translate3d(0, ' + translate.toFixed(1) + 'px, 0)';
      });
    }

    function onScroll() {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Initial paint
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
