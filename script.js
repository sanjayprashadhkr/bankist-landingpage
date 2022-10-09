'use strict';

///////////////////////////////////////
// Modal window

//DEFINE AN OBJECT LITERAL

// const imageclick = document.querySelector('.nav').querySelector('img');

// const obj1 = {
//   hello: 5,
//   printhis: function (value) {
//     console.log(value);
//   },
// };
// obj1.printhis(50);

// imageclick.addEventListener('click', obj1.printhis.bind(obj1));

// const addTaxRate = function (value, rate = 0.2) {
//   return value + rate * value;
// };
// console.log(addTaxRate(200));

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + rate * value;
//   };
// };
// const addVAT2 = addTaxRate(0.2);
// console.log(addVAT2(200));

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const btnNavLink = document.querySelectorAll('.nav__link');
const operationsTab = document.querySelector('.operations__tab-container');
const operationsBtnList = document.querySelectorAll('.operations__tab');
const operationsContentList = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

// window.addEventListener('scroll', function (e) {
//   console.log(
//     'Scroll: ' +
//       window.scrollY +
//       ' ' +
//       'Section 1: ' +
//       ' ' +
//       String(section1.getBoundingClientRect().top + window.pageYOffset)
//   );
//   if (
//     window.scrollY >
//     section1.getBoundingClientRect().top + window.pageYOffset
//   ) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.3,
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

//STICKY NAVIGATION

const navHeight = nav.getBoundingClientRect().height;
const obsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};

const headerObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const handover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const currentLink = e.target;
    const logo = currentLink.closest('.nav').querySelector('img');
    const siblings = currentLink.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(currentEl => {
      if (currentEl != currentLink) currentEl.style.opacity = this;
    });

    // let test = 1;
    // siblings.forEach(function (currentEl) {
    //   if (currentEl != currentLink) currentEl.style.opacity = this;
    //   console.log(this);
    //   logo.style.opacity = this;
    // });

    // for (const currentEl of siblings) {
    //   console.log(currentEl);
    //   if (currentEl != currentLink) {
    //     console.log(this);
    //     currentEl.style.opacity = this;
    //   }
    //   logo.style.opacity = this;
    // }
  }
};

nav.addEventListener('mouseover', handover.bind(0.5));
nav.addEventListener('mouseout', handover.bind(1));

///////////////////////////////////////
// Menu fade animation
// const handleHover = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(function (el) {
//       if (el !== link) el.style.opacity = this;
//     });

//     // siblings.forEach(el => {
//     //   if (el !== link) el.style.opacity = this;
//     // });

//     logo.style.opacity = this;
//   }
// };

// // Passing "argument" into handler
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////

operationsTab.addEventListener('click', function (e) {
  const selectedBtnEl = e.target.closest('.operations__tab');
  if (!selectedBtnEl) return; //Another Way
  operationsBtnList.forEach(function (btnEl) {
    const currentBtnNumber = selectedBtnEl.getAttribute('data-tab');
    const currentIndex = btnEl.getAttribute('data-tab') - 1;
    if (btnEl.getAttribute('data-tab') === currentBtnNumber) {
      btnEl.classList.add('operations__tab--active');
      operationsContentList[currentIndex].classList.add(
        'operations__content--active'
      );
    } else if (btnEl.classList.contains('operations__tab--active')) {
      btnEl.classList.remove('operations__tab--active');
      operationsContentList[currentIndex].classList.remove(
        'operations__content--active'
      );
    }
  });
});

// btnNavLink.forEach(function (btnEL) {
//   btnEL.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log(btnEL.getAttribute('href'));
//     const id = this.getAttribute('href');
//     if (id != '#') {
//       const dest = document.querySelector(id);
//       dest.scrollIntoView({ behavior: 'smooth' });
//     }
//   });
// });

const navLinks = document.querySelector('.nav__links');

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const btnEL = e.target;
  const id = btnEL.getAttribute('href');
  if (id != '#') {
    const dest = document.querySelector(id);
    if (dest) dest.scrollIntoView({ behavior: 'smooth' });
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const scoord = section1.getBoundingClientRect();

  console.log(window.pageXOffset, window.pageYOffset);

  console.log(scoord.top);

  section1.scrollIntoView({ behavior: 'smooth' });
});

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btnEl) {
  btnEl.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//FADE IN ANIMATION

const sectionObsCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionObsCallback, {
  root: null,
  threshold: 0.2,
});

const allSections = document.querySelectorAll('section');
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//LAZY LOADING

const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting === false) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //Specifying this to trigger the event in advance (Exactly 100px before the image)
});

const lazyImages = document.querySelectorAll('img[data-src]');
lazyImages.forEach(eachImg => imgObserver.observe(eachImg));

//SLIDER

const sliders = document.querySelectorAll('.slide');
let currentSlide = 0;
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

// //This can be commented
// slider.style.transform = 'scale(0.7) translateX(0px)';
// slider.style.overflow = 'visible';
//INITIAL POSITION
//0 100% 200%
//-100% 0 200%
//-200% -100% 0

const goToSlide = function () {
  sliders.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
  });
};
goToSlide();

const prevSlide = function () {
  if (currentSlide == sliders.length - 1) currentSlide = 0;
  else currentSlide++;
  activeDot(currentSlide);
  goToSlide();
};
const nextSlide = function () {
  if (currentSlide == 0) currentSlide = sliders.length - 1;
  else currentSlide--;
  activeDot(currentSlide);
  goToSlide();
};

btnRight.addEventListener('click', prevSlide);

btnLeft.addEventListener('click', nextSlide);

const dotContainer = document.querySelector('.dots');

const createDots = function () {
  sliders.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const allDots = document.querySelectorAll('.dots__dot');

const activeDot = function (currentDot) {
  allDots.forEach(function (eachdot) {
    eachdot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${currentDot}"]`)
    .classList.add('dots__dot--active');
  console.log('HELLO');
};

activeDot(0);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    currentSlide = e.target.dataset.slide;
    goToSlide();
    activeDot(currentSlide);
  }
});
