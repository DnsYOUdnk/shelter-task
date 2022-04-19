const hamburger = document.querySelector('.header__btn-burger');
const navMenu = document.querySelector('.header__nav__items');
const logo = document.querySelector('.header__logo');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('openMenu');
            logo.classList.toggle('openMenu');
        });

const navLinks = document.querySelectorAll('.header__nav__item .app__links');
        
        navLinks.forEach((navLink) => {
            navLink.addEventListener('click', () => {
                hamburger.classList.toggle('open');
                navMenu.classList.toggle('openMenu');
                logo.classList.toggle('openMenu');
            })
        })

alert('Всем привет, работа незавершена, пожалуйста если есть возможность проверьте ее завтра, очень сильно благодарен за понимание')