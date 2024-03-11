// создаем обертку для элементов бургер меню
function wrapperBurgerMenu() {
    const headerMenu = document.querySelector('.header__menu');
    const headerContacts = document.querySelector('.header__contacts');

    if (window.innerWidth <= 1240) {
        if(!document.querySelector('.header__wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'header__wrapper';
            
            headerMenu.before(wrapper);
        
            wrapper.append(headerMenu);
            wrapper.append(headerContacts);
        }
    } else {
        const wrapper = document.querySelector('.header__wrapper');
        if (wrapper) {
            wrapper.before(headerMenu);
            wrapper.before(headerContacts);
            wrapper.remove();
        }
    }
}

wrapperBurgerMenu()
window.addEventListener('resize', wrapperBurgerMenu);

const burger = () => {
    if(document.querySelector('header').classList.contains('open')) {
        document.querySelector('header').classList.remove('open');
        if(!document.querySelector('.popup.open')) {
            unFixedWindow();
        }
    } else {
        document.querySelector('header').classList.add('open');
        fixedWindow();
    }
}

function closeHeader(e) {
    e.preventDefault();
    if (document.querySelector('header').classList.contains('open')) {
        document.querySelector('header').classList.remove('open');
    }

    if(!document.querySelector('.popup.open')) {
        unFixedWindow();
    } else if (document.querySelector('.popup.open') && !e.target.classList.contains('popup-link')) {
        document.querySelector('.popup.open').classList.remove('open');
        setTimeout(() => {
            unFixedWindow();
            const lockPadding = document.querySelectorAll('.lock-padding');
            lockPadding.forEach(el => el.style.width = '100%');
            document.querySelector('header').classList.remove('lock-padding');
        }, 800);
    }
}

document.querySelectorAll('.header a').forEach(link => {
    link.addEventListener('click', closeHeader); 
});


document.getElementById('burger').addEventListener('click', burger);