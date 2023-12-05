'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener;

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header')

const allsections = document.querySelectorAll('.section');

const allButtons = document.getElementsByTagName('button')

const message = document.createElement('div')
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content')

message.classList.add('cookie-message')
// message.textContent = 'we use cookies to improve functionality and analytics'
message.innerHTML = 'we use cookies to improve functionality and analytics <button class= btn btn--close-cookie>Got it!<button>';
// header.prepend(message);
header.after(message);
document.querySelector('.cookie-message').addEventListener('click', () => message.remove())
message.style.backgroundColor = '#37383d';
message.style.width = '100%';
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered')

console.log(message)


// SMOOTH SCROLLING

btnScrollTo.addEventListener('click', function(e){
  // const s1cords = section1.getBoundingClientRect();
  // console.log(s1cords);
  // window.scrollTo(
  //   {left: s1cords.left + window.scrollX,
  //    top: s1cords.top + window.scrollY,
  //    behavior: 'smooth'
  section1.scrollIntoView({behavior:'smooth'})
})

const h1 = document.querySelector('h1');
const alertH1 = (e) => {
  alert("addEventListiner: Great! you are reading the heading");
  h1.removeEventListener('mouseenter', alertH1)
}
// // h1.addEventListener('mouseenter', alertH1 )
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// })
document.querySelectorAll('.nav__links').forEach(function(el){
  el.addEventListener('click', function(e){

  e.preventDefault();
  if (e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})
})

// const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInteger(0, 255)}, ${randomInteger(0, 255)}, ${randomInteger(0, 255)})`
// document.querySelector('.nav__link').addEventListener('click', function(e){
//   e.target.style.backgroundColor = randomColor();
// })
// document.querySelector('.nav__links').addEventListener('click', function(e){
//   e.target.style.backgroundColor = randomColor();
// })
// document.querySelector('.nav').addEventListener('click', function(e){
//   e.target.style.backgroundColor = randomColor();
// })



tabContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'))

  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sibling.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {root: null, threshold: 0, rootMargin:`-${navHeight}px` })
headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {root:null, threshold:0.15})
allsections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})


const imgTargets = document.querySelectorAll('img[data-src]');
const loadingImg = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadingImg, {root:null, threshold:0, rootMargin:'200px'});
imgTargets.forEach(img => imgObserver.observe(img));

//  SLIDER
const slider = function(){
const slides = document.querySelectorAll('.slide'); /*getting all the slides*/
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots')
let curSlide = 0;
const maxSlide = slides.length;

const createDots = function(){
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class = "dots__dot" data-slide ="${i}"></button>`)
  })
}

const activeDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach((dot => dot.classList.remove('dots__dot--active')))
  document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add('dots__dot--active')
}


const goToSlide = function(slide){
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)) 
}

const nextSlide = function(){
  if(curSlide === maxSlide - 1){
    curSlide = 0;
  }else{
    curSlide++;
  }
  goToSlide(curSlide)
  activeDots(curSlide)
}

const prevSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide - 1;
  }else{
    curSlide--;
  }
  goToSlide(curSlide);
  activeDots(curSlide)
}

const init = function(){
  goToSlide(0);
  createDots();
  activeDots(0);
}
init()
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft') prevSlide()
  e.key === 'ArrowRight' && nextSlide();
})

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activeDots(slide);
  }
})
}
slider()
