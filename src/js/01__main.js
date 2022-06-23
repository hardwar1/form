'use strict';

document.addEventListener('DOMContentLoaded', function () {
  function qOne(selector) {
    return document.querySelector(selector);
  }

  function qAll(selector) {
    return document.querySelectorAll(selector);
  }

  if (qAll('.form__fieldset')) {
    const
      formFieldset = qAll('.form__fieldset'),
      progressbarItem = qAll('.progressbar__item'),
      next = qAll('.next'),
      previous = qAll('.previous'),
      progressbar = qOne('.progressbar'),
      selectHeader = qAll('.select__header');

    //клик по кнопке вперед
    for (let i = 0; i < next.length; i++) {
      next[i].addEventListener('click', () => {
        formFieldset[i].classList.remove('form__fieldset--active');
        progressbar.style.setProperty('--progressbar-width', persent(i + 1, formFieldset));
        formFieldset[i + 1].classList.add('form__fieldset--active');
        progressbarItem[i + 1].classList.add('progressbar__item--active');

        progressbarItem[i + 1].classList.add('progressbar__item--text');
        progressbarItem[i].classList.remove('progressbar__item--text');
      });
    }

    //клик по кнопке назад
    for (let i = 0; i < previous.length; i++) {
      previous[i].addEventListener('click', () => {
        formFieldset[i].classList.add('form__fieldset--active');
        progressbar.style.setProperty('--progressbar-width', persent(i, formFieldset));
        formFieldset[i + 1].classList.remove('form__fieldset--active');
        progressbarItem[i + 1].classList.remove('progressbar__item--active');
        progressbarItem[i + 1].classList.remove('progressbar__item--text');
        progressbarItem[i].classList.add('progressbar__item--text');
      });
    }

    // линия прогресса и функция вычисления %
    const progress = () => {
      progressbar.style.setProperty('--progressbar-width', persent(i, formFieldset));
    }

    const persent = (item, arr) => {
      return `${(item / (arr.length - 1)) * 100}%`;
    }

    // расположение элементов в прогрессбаре
    for (let i = 0; i < progressbarItem.length; i++) {
      progressbarItem[i].style
        .setProperty('left', persent(i, progressbarItem));
    }


    // механика кастомного СЕЛЕКТА
    if (selectHeader) {
      for (let item of selectHeader) {
        let select = item.closest('.select');
        let options = select.querySelectorAll('option');

        select
          .querySelector('span')
          .innerText = options[0].innerText;

        for (let option of options) {
          option.closest('.select')
            .querySelector('ul').innerHTML
            += `<li class="select__item">${option.innerText}</li>`

          if (option.hasAttribute('selected')) {

            option.closest('.select')
              .querySelector('span')
              .innerText = option.innerText;
          }
        }

        let selectItem = select.querySelectorAll('li');
        for (let i = 0; i < selectItem.length; i++) {
          selectItem[i].addEventListener('click', () => {
            select.querySelector('select').value = selectItem[i].innerText;
            select.querySelector('span').innerText = selectItem[i].innerText;
            select.classList.remove('select--active');
          });
        }

        item.addEventListener('click', function () {
          this.closest('.select').classList.toggle('select--active');
        });
      }
    }

    // маска телефона по умолчанию +7
    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
      const elems = document.querySelectorAll(selector);

      function mask(event) {
        const keyCode = event.keyCode;
        const template = masked,
          def = template.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, "");
        let i = 0,
          newValue = template.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i !== -1) {
          newValue = newValue.slice(0, i);
        }
        let reg = template.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
          this.value = newValue;
        }
        if (event.type === "blur" && this.value.length < 5) {
          this.value = "";
        }

      }

      for (const elem of elems) {
        elem.addEventListener("input", mask);
        elem.addEventListener("focus", mask);
        elem.addEventListener("blur", mask);
      }

    }
    maskPhone('.tel1', '+_ (___) ___-__-__');

    //проверка пароля
    function CheckPassword(inputtxt) {
      var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (inputtxt.value.match(decimal)) {
        return true;
      }
      else {
        alert('Пароль должен содержать от 8 до 15 символов, которые содержат как минимум одну строчную букву, одну заглавную букву, одну цифровую цифру и один специальный символ');
        return false;
      }
    }

    function CheckPassword1(inputtxt) {
      var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (inputtxt.value.match(passw)) {
        return true;
      }
      else {
        alert('пароль должен быть от 6 до 20 символов, которые содержат как минимум одну цифровую цифру , одну заглавную и одну строчную букву');
        return false;
      }
    }
  }

  // добавление ошибки элементам формы
  function formAddError(input) {
    input.parentElement.classList.add('--error');
    input.classList.add('--error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('--error');
    input.classList.remove('--error');
  }


  //форма с помощью плагина файл в компонентс/дист/js

  if (qOne('.form')) {
    new window.JustValidate('.form', {
      rules: {
        tel: {
          required: true,
        }
      },
      messages: {
        name: {
          required: 'Введите имя',
          minLength: 'Минимуму 3 символа',
          maxLenght: 'Максимум 15 символов'
        },
        email: {
          required: 'Введите email',
          email: 'Введите корректный email'
        },
        tel: {
          required: 'Введите телефон',
        }
      },
      submitHandler: function (thisForm) {
        let formData = new FormData(thisForm);

        //отправка формы через xhr 
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            }
          }
        };

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);
    
        thisForm.reset();
      }

    });
  }


});