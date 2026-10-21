/*
 *     Copyright (C) 2020  Kestros, Inc.
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */
(function () {
  // Fix brand link — navbar-brand renders with href="#" by default
  var brand = document.querySelector('.navbar-brand');
  if (brand && (!brand.href || brand.getAttribute('href') === '#')) {
    var path = window.location.pathname;
    var siteRoot = path.match(/^(\/content\/sites\/[^/]+)/);
    if (siteRoot) {
      brand.setAttribute('href', siteRoot[1] + '.html');
    }
  }

  // Scroll-shrink navbar
  var nav = document.querySelector('.navbar');
  if (nav) {
    var scrolled = false;
    window.addEventListener('scroll', function () {
      var y = window.scrollY || window.pageYOffset;
      if (y > 40 && !scrolled) {
        nav.classList.add('nav-scrolled');
        scrolled = true;
      } else if (y <= 40 && scrolled) {
        nav.classList.remove('nav-scrolled');
        scrolled = false;
      }
    }, { passive: true });
  }
})();
