$('.js-filter-trigger').on('change', function (event) {
  $(this).parents('form:first')
    .submit();
});

if (window.location.hash == '#review_form') {
  setTimeout(function() {
    $('[href="#product-comment"]').trigger('click');
    $('.js-reviews-toggle').trigger('click');
    console.log('open');
  }, 0);
};

if (window.location.hash == '#comments-block') {
  setTimeout(function () {
    $('js-comments-toggle').trigger('click');
  }, 0);
};


$('.js-validate-form').on('click', function (event) {
  event.preventDefault();

  var $form = $(this).parents('form:first');

  var errors = validateForm($form);

  if (errors.length) {
    return false;
  }

  $form.submit();
})
