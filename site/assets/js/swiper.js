const swiper = new Swiper('.swiper', {
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: 'auto',
  grabCursor: true,
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// swiper 8 версии позваляет дублировать слайды в loop mode, вероятно 11й тоже можно корректно настроить
