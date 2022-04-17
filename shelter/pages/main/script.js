const hamburger = document.querySelector('.header__btn-burger');
const navMenu = document.querySelector('.header__nav__items');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('openMenu');
        });

const navLinks = document.querySelectorAll('.header__nav__item .app__links');
        
        navLinks.forEach((navLink) => {
            navLink.addEventListener('click', () => {
                hamburger.classList.toggle('open');
                navMenu.classList.toggle('openMenu');
            })
        })