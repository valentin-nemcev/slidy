import jQuery from "jquery";

const slideSelector = '.slide';
const presentationSelector = '.presentation';

function presentSlide(slideToPresent) {
  const $slideToPresent = $(slideToPresent);
  const $allSlides = $slideToPresent
    .parent(presentationSelector)
    .find(slideSelector);

  $allSlides.removeClass('presented');
  $slideToPresent.addClass('presented');
};

function presentNextSlide(currentSlide) {
  const $currentSlide = $(currentSlide);
  const $nextSlide = $currentSlide.nextAll(slideSelector).first();
  presentSlide($nextSlide);
}

function stopPresenting(currentSlide) {
  const $allSlides = $(currentSlide)
    .parent(presentationSelector)
    .find(slideSelector);

  $allSlides.removeClass('presented');
}

jQuery(document).ready(
  ($) => {
    $(document).on(
      'slidy:presentSlide click',
      slideSelector,
      function () { presentSlide(this); }
    )

    $(document).on(
      'slidy:presentNextSlide click',
      slideSelector + '.presented',
      function () { presentNextSlide(this); }
    )

    $(document).on(
      'slidy:stopPresenting dblclick',
      slideSelector + '.presented',
      function () { stopPresenting(this); }
    )
  }
)
