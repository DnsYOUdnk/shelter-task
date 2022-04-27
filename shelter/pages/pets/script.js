const header = document.querySelector('.header');
const hamburger = document.querySelector('.header__btn-burger');
const navMenu = document.querySelector('.header__nav__items');
const logo = document.querySelector('.header__logo');
const backgroundMenu = document.querySelector('.app__background__menu');
const navLinks = document.querySelectorAll('.header__nav__item .app__links');

const changeClassElement = () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('openMenu');
    backgroundMenu.classList.toggle('active');
    header.classList.toggle('active');

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

const ourFriendsCardsList = document.querySelector('.our__friends__petscards__items');

const getShelterData = async () => {
    const response = await fetch('./../../assets/json/shelterPetsData.json');
    const  data = await response.json();
    createPetsCards([...data])
    generateNewPets(data)
}

let newArrPets = [];
const generateNewPets = (data) => {
    for (let i = 48; i > newArrPets.length; ) {
        newArrPets.push(...data.sort((a,b) => Math.random() - Math.random()))
    }
    showNumberElements()
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
    document.querySelector('.our__friends__pagination__counter').innerText = `${page}`;

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

let page = 1;
const showNumberElements = () => {
    let arrNumberPets = [];
    
    if (1280 <= window.innerWidth) {
        arrNumberPets = getSliceArrPets(8)
    } else if (768 <= window.innerWidth && window.innerWidth < 1280) {
        arrNumberPets = getSliceArrPets(6)
    } else if (window.innerWidth < 768) {
        arrNumberPets = getSliceArrPets(3)
    }

    createPetsCards([...arrNumberPets])
}

const getSliceArrPets = (maxElem) => {
    return newArrPets.slice(maxElem*(page-1), maxElem*page)
}

const petsPaginationBtns = document.querySelectorAll('.app__pagination__btns');
      petsPaginationBtns.forEach((paginationBtn) => {
            paginationBtn.addEventListener('click', (e) => {
                changeContentPets(e.target)
                showNumberElements()
            })
      })

const changeContentPets = (element) => {
    let width = window.innerWidth,
        pageEnd = 1280 <= width ? newArrPets.length/8 : 768 <= width && width < 1280 ? page = newArrPets.length/6 : newArrPets.length/3;

    if (element.classList.contains('our__friends__pagination-prev')) {
        page--;
    } else if (element.classList.contains('our__friends__pagination-next')) {
        page++;
    } else if (element.classList.contains('our__friends__pagination-start')) {
        page = 1;
    } else if (element.classList.contains('our__friends__pagination-end')) {
        page = pageEnd;
    }

    checkActiveBtns(pageEnd)
}

const paginationBtnsLeft = document.querySelectorAll('.pagination-left');
const paginationBtnsRight = document.querySelectorAll('.pagination-right');

const checkActiveBtns = (pageCheck) => {
    if(page == pageCheck) {
        changeElementStyleOff(paginationBtnsRight)
        changeElementStyleOn(paginationBtnsLeft)
    } else if (page == 1) {
        changeElementStyleOn(paginationBtnsRight)
        changeElementStyleOff(paginationBtnsLeft)
    } else {
        changeElementStyleOn(petsPaginationBtns)
    }
}

const changeElementStyleOn = (arrElem) => {
    arrElem.forEach(element => {
        element.classList.add('active');
        element.removeAttribute('disabled'); 
    })
}

const changeElementStyleOff = (arrElem) => {
    arrElem.forEach(element => {
        element.classList.remove('active');
        element.setAttribute('disabled', '');
    })
}

window.addEventListener('resize', () => showNumberElements())
window.addEventListener('load', () => getShelterData())