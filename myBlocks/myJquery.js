 
  function qOne(selector) {
    return document.querySelector(selector);
  }

  function qAll(selector) {
    return document.querySelectorAll(selector);
  }

  function clAdd(coll, nameClass) {
    for (let i = 0; i < coll.length; i++) {
      coll[i].classList.add(nameClass);
    }
  }

  function clRem(coll, nameClass) {
    for (let i = 0; i < coll.length; i++) {
      coll[i].classList.remove(nameClass);
    }
  }

  function clTog(coll, nameClass) {
    for (let i = 0; i < coll.length; i++) {
      coll[i].classList.toggle(nameClass);
    }
  }
