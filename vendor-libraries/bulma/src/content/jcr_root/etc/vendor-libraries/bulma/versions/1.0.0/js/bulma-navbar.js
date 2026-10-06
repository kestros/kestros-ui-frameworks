// Bulma ships no JavaScript; this is the documented navbar-burger toggle
// (https://bulma.io/documentation/components/navbar/) so top navigation
// collapses/expands on touch viewports out of the box.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.navbar-burger').forEach(function (burger) {
      burger.addEventListener('click', function () {
        var target = document.getElementById(burger.dataset.target);
        burger.classList.toggle('is-active');
        if (target) {
          target.classList.toggle('is-active');
        }
        burger.setAttribute('aria-expanded', burger.classList.contains('is-active'));
      });
    });
  });
})();
