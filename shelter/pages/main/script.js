const headerWrapper = document.querySelector('.header__wrapper');
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
        navMenu.prepend(logo)
    } else {
        document.body.style.overflowY = '';
        headerWrapper.prepend(logo)
    }
}

const removeClassElement = () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('openMenu');
    backgroundMenu.classList.remove('active');
    document.body.style.overflowY = '';
    headerWrapper.prepend(logo);
}

backgroundMenu.addEventListener('click', removeClassElement)
hamburger.addEventListener('click', changeClassElement);
navLinks.forEach((navLink) => {
    navLink.addEventListener('click', removeClassElement)
})

const getShelterData = async () => {
    const response = await fetch('./../../assets/json/shelterPetsData.json');
    const  data = await response.json();
    createPetsCards([...data, data[0]])
}

let newData = [];
let ourFriendsCardAll = [];
const createPetsCards = (data) => {
    newData = data;

    let listPetsCards = '';
    newData.forEach(({name, img, id}) => {
        listPetsCards += `
                            <li class="our__friends__petscards__item" id=${id}>
                                <div class="our__friends__petscards__item__image">
                                    <img src=${img} alt="${name}">
                                </div>
                                <div class="our__friends__petscards__item__name">${name}</div>
                                <div class="our__friends__petscards__item__button">
                                    <button class="app__btns" >Learn more</button>
                                </div>
                            </li>
                        `
    })
    ourFriendsCardsList.innerHTML = listPetsCards;

    ourFriendsCardAll = document.querySelectorAll('.our__friends__petscards__item');
    ourFriendsCardAll.forEach(petCard => {
        petCard.addEventListener('click', () => {
            popUpPetCard(petCard.id)
        })
    })
}

const blockPopUpPetCard = document.querySelector('.our__friends__pop-up');
const popUpPetCard = (idPet) => {
    let petCardInfo = newData.filter(({id}) => id === idPet).map(({name, type, breed, description, age, inoculations, diseases, parasites, img}) => {
        return  `
                    <div class="our__friends__pop-up__wrapper">
                        <div class="our__friends__pop-up__btn-close"><img src="./../../assets/svg/icon__cross-exit.svg" alt="close"></div>
                        <div class="our__friends__pop-up__image">
                            <img src=${img} alt=${name}>
                        </div>
                        <div class="our__friends__pop-up__description">
                            <div class="our__friends__pop-up__name">${name}</div>
                            <div class="our__friends__pop-up__breed">${type + ' - ' + breed}</div>
                            <div class="our__friends__pop-up__about">${description}</div>
                            <ul class="our__friends__pop-up__characteristic">
                                <li class="our__friends__pop-up__characteristic__item"><b>Age:</b> ${age}</li>
                                <li class="our__friends__pop-up__characteristic__item"><b>Inoculations:</b> ${inoculations.join(', ')}</li>
                                <li class="our__friends__pop-up__characteristic__item"><b>Diseases:</b> ${diseases.join(', ')}</li>
                                <li class="our__friends__pop-up__characteristic__item"><b>Parasites:</b> ${parasites.join(', ')}</li>
                            </ul>
                        </div>
                    </div>
                `
    })
    
    blockPopUpPetCard.classList.add('active');
    document.body.style.overflowY = 'hidden';
    blockPopUpPetCard.innerHTML = `${petCardInfo[0]}`;

    const popUpCloseBtn = document.querySelector('.our__friends__pop-up__btn-close');
          popUpCloseBtn.addEventListener('click',() => {
            changeClassElementPopUp()
        })
        
    blockPopUpPetCard.addEventListener('click',(e) => {
        if(e.target.classList.contains('our__friends__pop-up')) {
            changeClassElementPopUp()
        }
    })

    blockPopUpPetCard.addEventListener('mouseover',(e) => {
        if(e.target.classList.contains('our__friends__pop-up')) {
            popUpCloseBtn.classList.add('active')
        } else if (!e.target.classList.contains('our__friends__pop-up')) {
            popUpCloseBtn.classList.remove('active')
        }
    })
}

const changeClassElementPopUp = () => {
    blockPopUpPetCard.classList.remove('active');
    document.body.style.overflowY = '';
    blockPopUpPetCard.innerHTML = '';
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