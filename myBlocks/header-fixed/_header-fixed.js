  // скроллы хеадера
  const header = qOne('.header');
  let scrollTop,
    top = 0;

  window.addEventListener('scroll', function () {
    scrollTop = window.scrollY;

    if (scrollTop > 100) {
      header.classList.add('header--scroll');
    } else {
      header.classList.remove('header--scroll');
    }

    if (top < scrollTop && top > 500) {
      header.classList.add('header--hide');
      top = scrollTop;
    } else {
      header.classList.remove('header--hide');
      top = scrollTop;
    }
  });