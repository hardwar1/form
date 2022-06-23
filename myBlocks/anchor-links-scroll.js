  // скроллы якорных ссылок
  const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 1000,
    framesCount = 200;

  anchors.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

      let scroller = setInterval(function () {
        // скорость прокрутки
        let scrollBy = 6;
        if (Math.abs(window.pageYOffset - coordY) < scrollBy) {
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        } else if (scrollBy < window.pageYOffset - coordY) {
          window.scrollBy(0, -scrollBy);
        } else if (scrollBy > window.pageYOffset - coordY) {
          window.scrollBy(0, scrollBy);
        }

      }, animationTime / framesCount);
    });
  });
