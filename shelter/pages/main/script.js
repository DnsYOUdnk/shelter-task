const hamburger = document.querySelector('.header__btn-burger');
const navMenu = document.querySelector('.header__nav__items');
const logo = document.querySelector('.header__logo');
const backgroundMenu = document.querySelector('.app__background__menu');
const navLinks = document.querySelectorAll('.header__nav__item .app__links');
const ourFriendsCardsList = document.querySelector('.our__friends__petscards__items');
const ourFriendsContentBtns = document.querySelectorAll('.our_friends__content__btn>button');

const changeClassElement = () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('openMenu');
    backgroundMenu.classList.toggle('active');

    if(navMenu.classList.contains('openMenu')) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = '';
    }
}

backgroundMenu.addEventListener('click', changeClassElement)
hamburger.addEventListener('click', changeClassElement);
navLinks.forEach((navLink) => {
    navLink.addEventListener('click', changeClassElement)
})

const getShelterData = async () => {
    const response = await fetch('./../../assets/json/shelterPetsData.json');
    const  data = await response.json();
    createPetsCards(data)
}

const createPetsCards = (data) => {
    let listPetsCards = '';
    data.forEach(({name, img, id}) => {
        listPetsCards += `
                            <li class="our__friends__petscards__item">
                                <div class="our__friends__petscards__item__image">
                                    <img src=${img} alt="cat ${name}">
                                </div>
                                <div class="our__friends__petscards__item__name">${name}</div>
                                <div class="our__friends__petscards__item__button">
                                    <a href="#" class="app__btns app__links" id=${id}>Learn more</a>
                                </div>
                            </li>
                        `
    })
    ourFriendsCardsList.innerHTML = listPetsCards;
}

let distance = 0;

const changeViewPetsCards = (sideMove) => {
    console.log(sideMove)
    distance += sideMove === 'left' ? 900 : -900;
    ourFriendsCardsList.style.left = distance + 'px';
}

ourFriendsContentBtns.forEach( buttonMove => {
    let sideMove = buttonMove.classList.contains('our_friends__content__btn-left') ? 'left' : 'right';
    buttonMove.addEventListener('click', () => {
        changeViewPetsCards(sideMove)
    })
})

window.addEventListener('load', () => {
    getShelterData()
})