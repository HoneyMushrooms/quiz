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

document.getElementById("burger").addEventListener("click", function() {
    document.querySelector("header").classList.toggle("open");
    document.body.classList.toggle('lock');
})

  