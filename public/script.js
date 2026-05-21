const slidesContainer = document.querySelector('.slides');

const slides = document.querySelectorAll('.slides img');

const prevBtn = document.querySelector('.prev');

const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showSlide(index){

    currentIndex = (index + slides.length) % slides.length;

    slidesContainer.style.transform =
    `translateX(-${currentIndex * 100}vw)`;

}

nextBtn.addEventListener('click', () => {

    showSlide(currentIndex + 1);

});

prevBtn.addEventListener('click', () => {

    showSlide(currentIndex - 1);

});

setInterval(() => {

    showSlide(currentIndex + 1);

}, 4000);