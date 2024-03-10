// создаем обертку для элементов бургер меню
function wrapElementsInDiv() {
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

wrapElementsInDiv()
window.addEventListener('resize', wrapElementsInDiv);

const burger = () => {
    if(document.querySelector('header').classList.contains('open')) {
        document.querySelector('header').classList.remove('open');
        
        document.body.classList.remove('no-scroll')
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-position');
        document.documentElement.style.removeProperty('--scroll-position');
        window.scrollTo(0, parseInt(scrollY) || '0');
    } else {
        document.querySelector('header').classList.add('open');
        
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        document.documentElement.style.setProperty('--scroll-position', `${scrollY}px`);
        document.body.classList.add('no-scroll')
    }
}

document.querySelectorAll('.header__list a').forEach(link => {
    link.addEventListener('click', () => {
        if(document.querySelector('header').classList.contains('open')) {
            document.querySelector('header').classList.remove('open');
            
            document.body.classList.remove('no-scroll')
            const scrollY = document.documentElement.style.getPropertyValue('--scroll-position');
            document.documentElement.style.removeProperty('--scroll-position');
            window.scrollTo(0, parseInt(scrollY) || '0');
        }
    });
});

document.getElementById('burger').addEventListener('click', burger);