(function(){
  var _options = {
    nextButton: '.promo-slider-next',
    prevButton: '.promo-slider-prev',
    paginationClickable: true,
    autoHeight: true,
    breakpoints: {
      768: {
        autoplay: false,
      }
    }
  };

  if ($('.promo-slider').find('.promo-slide').length > 1) {
    if (InsalesThemeSettings['promo_slider_auto']) {
      _options.autoplay = _.toInteger(InsalesThemeSettings['promo_slider_auto_time']) || 5000;
    }

    _.merge(_options, {
      pagination: '.promo-slider-pagination',
      loop: true
    })
  } else {
  }

  var promoSlider = new Swiper('.promo-slider', _options);
})();

/*
 * News feed
 * Инициализация слайдера новостей
 **/
(function(){
  var newsFeed = new Swiper('.news-feed', {
    pagination: '.news-slider-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    uniqueNavElements: true,
    slidesPerView: 4,
    simulateTouch: false,
    paginationClickable: true,
    spaceBetween: 20,
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
      }
    }
  });
})();
