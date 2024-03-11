const popusLinks = document.querySelectorAll('.popup-link');
const body = document.body;

let unlock = true;
let timeout = 800;

if(popusLinks.length) {
    popusLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            curentPopup = document.getElementById(link.getAttribute('href').replace('#', ''));
            document.querySelector('header').classList.remove('open');

            popupOpen(curentPopup);
        })
    })
}

const popupCLoseIcon = document.querySelectorAll('.popup__close');
if(popupCLoseIcon.length) {
    popupCLoseIcon.forEach(el => {
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        })
    })
}

function popupOpen(curentPopup) {
    if(curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if(popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        window.scroll(0, 0);
        curentPopup.addEventListener('click', function(e) {
            if(!e.target.closest('.popup-container')) {
                popupClose(e.target.closest('.popup'));
            }
        })
    }
}

function popupClose(popupActive, doUnlock = true) {
    if(unlock) {
        popupActive.classList.remove('open');
        if(doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('main').offsetWidth + 'px';
    
    document.querySelector('header').classList.add('lock-padding');
    const lockPadding = document.querySelectorAll('.lock-padding');

    lockPadding.forEach(el => el.style.width = `calc(100% - ${lockPaddingValue})`);
    
    fixedWindow();

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function() {

        unFixedWindow();
        const lockPadding = document.querySelectorAll('.lock-padding');
        lockPadding.forEach(el => el.style.width = '100%');
        document.querySelector('header').classList.remove('lock-padding');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function fixedWindow() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty('--scroll-position', `${scrollY}px`);
    const currentAnchor = document.querySelector('.current_anchor');
    const firstAnchor = document.querySelector('[data-goto=".quiz_description"]');
    document.body.classList.add('no-scroll');
    setTimeout(() => {
        currentAnchor.classList.add('current_anchor');
        firstAnchor.classList.remove('current_anchor');
    })
}

function unFixedWindow() {
    document.body.classList.remove('no-scroll')
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-position');
    if(scrollY) {
        document.documentElement.style.removeProperty('--scroll-position');
        window.scrollTo(0, parseInt(scrollY));
    } 
}