const hamburger = document.querySelector('.header__btn-burger');
const navMenu = document.querySelector('.header__nav__items');
const logo = document.querySelector('.header__logo');
const backgroundMenu = document.querySelector('.app__background__menu');
const navLinks = document.querySelectorAll('.header__nav__item .app__links');
const ourFriendsCardsList = document.querySelector('.our__friends__petscards__items');
const ourFriendsContentBtnLeft = document.querySelector('.our_friends__content__btn-left');
const ourFriendsContentBtnRight = document.querySelector('.our_friends__content__btn-right');

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
    createPetsCards([...data, data[0]])
}

let newData = [];

const createPetsCards = (data) => {
    newData = data;

    let listPetsCards = '';
    newData.forEach(({name, img, id}) => {
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
const moveLeft = () => {
    ourFriendsCardsList.classList.add('left__move');
    ourFriendsContentBtnLeft.removeEventListener('click', moveLeft);
    ourFriendsContentBtnRight.removeEventListener('click', moveRight);
}

const moveRight = () => {
    ourFriendsCardsList.classList.add('right__move');
    ourFriendsContentBtnRight.removeEventListener('click', moveRight);
    ourFriendsContentBtnLeft.removeEventListener('click', moveLeft);
}

ourFriendsContentBtnRight.addEventListener('click', moveRight)
ourFriendsContentBtnLeft.addEventListener('click', moveLeft)

ourFriendsCardsList.addEventListener('animationend', (event) => {
    let arrMoveCards = [],
        arrCardsHidden = []; 

    if (event.animationName === 'leftMove') {
        ourFriendsCardsList.classList.remove('left__move')

        arrMoveCards = newData.slice(0,3);
        arrCardsHidden = newData.slice(3, newData.length-1).sort((a,b) => Math.random() - Math.random());
    } else {
        ourFriendsCardsList.classList.remove('right__move')

        arrMoveCards = newData.slice(-3);
        arrCardsHidden = newData.slice(1, -3).sort((a,b) => Math.random() - Math.random());
    }

    arrCardsHidden.push(arrCardsHidden[0])
    createPetsCards(arrCardsHidden.slice(0,3).concat(arrMoveCards.concat(arrCardsHidden.slice(3))))

    ourFriendsContentBtnRight.addEventListener('click', moveRight)
    ourFriendsContentBtnLeft.addEventListener('click', moveLeft)
})

window.addEventListener('load', () => {
    getShelterData()
})