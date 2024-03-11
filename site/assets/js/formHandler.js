const form = document.querySelector('.popup__form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const comment = document.getElementById('user_comment');
    
    const fields = [name, surname, comment];
    let errorFlag = false;
    let errorInComment = false;

    fields.forEach(field => {
        if (field.value.trim() === '') {
            showErrorMessage(field);
            errorFlag = true;
            if (field === comment) {
                errorInComment = true;
            }
        } else {
            removeErrorMessage(field);
        }
    });

    if (errorInComment) {
        document.querySelector('.upload-file__wrapper').style.right = '40px';
    } else {
        document.querySelector('.upload-file__wrapper').style.right = '';
    }
        
    if(!errorFlag) {
        popupOpen(document.querySelector('.success'));
    }
});

function showErrorMessage(input) {
    const parentElement = input.parentNode;
    const siblingElement = input.nextElementSibling;
    siblingElement.style.color = '#FF004C';
    input.style.borderBlockColor = '#FF004C';

    const warningImg = document.createElement('img');
    warningImg.src = './assets/img/favicon/warning2.svg';
    warningImg.alt = 'warning_icon';
    warningImg.className = 'popup__warning_img';
    
    warningImg.addEventListener('mouseenter', () => {
        parentElement.classList.add('popup__warning_label')
    });

    warningImg.addEventListener('mouseleave', function() {
        parentElement.classList.remove('popup__warning_label')
    });

    warningImg.addEventListener('touchstart', function() {
        parentElement.classList.add('popup__warning_label');
        setTimeout(() => parentElement.classList.remove('popup__warning_label'), 1000)
    });
    
    parentElement.append(warningImg);
}

function removeErrorMessage(input) {
    const parentElement = input.parentNode;
    const siblingElement = input.nextElementSibling;
    siblingElement.style.color = '';
    input.style.borderBlockColor = '';

    const warningImg = parentElement.querySelector('.popup__warning_img');
    if (warningImg) {
        warningImg.remove();
    }

    parentElement.classList.remove('popup__warning_label');
}

const inputFile = document.querySelectorAll(".upload-file__input");
    inputFile.forEach(function(el) {
        let textSelector = document.querySelector(".upload-file__text");

        let fileList;

        el.addEventListener("change", function (e) {

            fileList = [];
            for (let i = 0; i < el.files.length; i++) {
                fileList.push(el.files[i]);
            }

            uploadFile(fileList);
        });

        const uploadFile = (file) => {

            for(let i = 0; i < file.length; i++) {
                if (file[i].size > 5 * 1024 * 1024) {
                    alert("Файл должен быть не более 5 МБ.");
                    return;
                }
            }
            
            if (file.length === 1) {
                const fileName = file[0].name;
                const maxLength = window.innerWidth < 726 ? 13 : 15;
                textSelector.textContent = truncateFileName(fileName, maxLength);
            } else {
                const filePlural = file.length < 4 ? ' файлa' : ' файлов';
                textSelector.textContent = `Выбрано ${file.length}${filePlural}`;
            }
            textSelector.style.display = 'block';
            textSelector.style.paddingLeft = '8px';
        }

});

function truncateFileName(fileName, maxLength) {
    return fileName.length > maxLength ? fileName.slice(0, maxLength - 3) + '...' : fileName;
}