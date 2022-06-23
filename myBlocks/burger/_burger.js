// мобильное меню и бургер
const
  burger = qOne('.burger'),
  menu = qOne('.menu');

burger.addEventListener('click', function () {
  this.classList.toggle('burger--close');
  menu.classList.toggle('header__menu--show');
});

menu.addEventListener('click', function () {
  this.classList.remove('header__menu--show');
});