const responseData = {
    testData: [{
        id: 1,
        question: 'Какие виды тестов вам нравятся?',
        details: 'Многие из нас хоть раз попадались на эту удочку — хочешь пройти всего один тест из интернета, и вдруг понимаешь, что пролетело полдня.',
        answer: ['На темперамент', 'Кто я из вселенной Марвел', 'Увидел это', 'Мое тотемное животное', 'На IQ', 'На логическое мышление', 'На уровень интеллекта'],
        type: 'checkbox'
    }, 
    {
        id: 2,
        question: 'Вы любите проходить тесты?',
        details: 'Нам важно узнать насолько часто Вы проходите тесты.',
        answer: ['Вы любите проходить тесты?', 'Да, я прохожу все тесты', 'Заставляю себя проходить тесты', 'Не люблю проходить тесты, но иногда приходится'],
        type: 'radio'
    },
    {
        id: 3,
        question: 'Что то еще?',
        details: 'Нам важно узнать насолько часто Вы проходите тесты.',
        answer: ['Нет, я не никогда не прохожу тесты', 'Да, я прохожу все тесты', 'Заставляю себя проходить тесты', 'Не люблю проходить тесты, но иногда приходится'],
        type: 'radio'
    },
    {
        id: 4,
        question: 'Что то еще o_0?',
        details: 'Нам важно узнать насолько часто Вы проходите тесты.',
        answer: ['Нет, я не никогда не прохожу тесты', 'Да, я прохожу все тесты', 'Заставляю себя проходить тесты', 'Не люблю проходить тесты, но иногда приходится'],
        type: 'checkbox',
    }, 
    {
        id: 5,
        question: 'Спасибо за ответы! Заполните форму ниже',
        details: 'Ваше мнение важно для нас. Прикрепите фото с Вашей любимой картинкой и оставьте комментарий насколько понравился Вам тест.',
        answer: ['как то иначе обработать'],
        type: 'text',
    }],
};

let currentQuestion = 0;
const userAnswers = [];

function renderQuestion() {
    const questionData = responseData.testData[currentQuestion];
    const testContent = document.querySelector('.quiz__form');
    if(responseData.testData.length - 1 == currentQuestion) {
        const emojiWrapper = document.createElement('div');
        const emoji_1 = document.createElement('img');
        const emoji_2 = document.createElement('img');
        emojiWrapper.className = 'emoji-wrapper';
        emoji_1.className = 'emoji__img';
        emoji_2.className = 'emoji__img';
        
        emoji_2.alt = 'emoji';
        emoji_2.alt = 'emoji';
        
        emoji_1.src = './assets/img/emoji.png';
        emoji_2.src = './assets/img/emoji_like.png';
        emojiWrapper.style.display = 'flex';
        emojiWrapper.append(emoji_1);
        emojiWrapper.append(emoji_2);
        testContent.querySelector('.title').before(emojiWrapper);
    } else {
        testContent.querySelector('.emoji-wrapper')?.remove();
    }

    testContent.querySelector('.title').innerText = questionData.question;
    testContent.querySelector('.text').innerText = questionData.details;
    
    const answersContainer = testContent.querySelector('.quiz__answers');
    answersContainer.innerHTML = '';

    questionData.answer?.forEach(answer => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        input.setAttribute('data-histoty', currentQuestion);

        if(questionData.type === 'checkbox') {
            label.className = 'checkbox__btn';
    
            input.type = questionData.type;
            span.innerHTML = `
                <svg class="checkbox__img" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="22" height="22" rx="11" fill="white"/>
                    <path d="M6 16L16 6M16 16L6 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${answer}
            `;
        } else if (questionData.type === 'radio') {
            label.className = 'radio__btn';
    
            input.type = questionData.type;
            input.name = 'radio' + currentQuestion;

            span.innerHTML = answer;
        } else if (questionData.type === 'text') {
            const formGroup = document.createElement('div');
            formGroup.className = 'form__group';
            
            input.type = questionData.type;
            input.placeholder = '';
            input.id = 'opinion';
            input.className = 'form__input-text';
            
            label.htmlFor = 'opinion';
            label.className = 'form__label_text';
            label.textContent = 'Ваше мнение сюда';
            
            formGroup.append(input);
            formGroup.append(label);
            
            const lastPage = document.querySelector('.quiz__last-page');
            lastPage.style.display = 'flex';

            if(document.querySelector('.quiz__last-page .form__group')) {
                return;
            }
            
            const selectBox = lastPage.querySelector('.select-box');
            lastPage.insertBefore(formGroup, selectBox);
            
            return;
        }

        if(userAnswers[currentQuestion]?.includes(answer)) {
            input.checked = true;
        }

        document.querySelector('.quiz__last-page').style.display = 'none';

        label.append(input);
        label.append(span);
        answersContainer.append(label);
    });

    const btn = document.querySelector('.quiz__btn_prev');
    currentQuestion > 0 ? btn.style.display = 'block' :  btn.style.display = 'none';
}

function checkSelectedAnswers() {
    const selectedAnswers = Array.from(document.querySelectorAll('.quiz__answers input'))
        .filter(input => input.checked)
    
    return selectedAnswers;
}

function saveSelectedAnswers() {
    const selectedAnswers = Array.from(document.querySelectorAll('.quiz__answers input'))
        .filter(input => input.checked)
        .map(input => input.nextElementSibling.innerText);

    userAnswers[currentQuestion] = selectedAnswers;
}

const nextButton = document.querySelector('.quiz__btn_next');
const prevButton = document.querySelector('.quiz__btn_prev');

nextButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    const selectedAnswers = checkSelectedAnswers();
    if(selectedAnswers.length === 0) {
        return;
    }
    saveSelectedAnswers();
    currentQuestion++;
    
    if (responseData.testData[currentQuestion]) {
        renderQuestion();
        renderHistory();
    }
});

prevButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    const selectedAnswers = checkSelectedAnswers();
    if(selectedAnswers.length === 0 && document.querySelector(`.history__item_${+currentQuestion + 1}`)) {
        return;
    }
    saveSelectedAnswers();

    currentQuestion--;
    
    if (responseData.testData[currentQuestion]) {
        renderQuestion();
        renderHistory();
    }
});

function renderHistory() {
    const inputs = document.querySelectorAll('.quiz__form input');
    const historyColumn = document.querySelector('.history__column');
    const histotyAttribute = inputs[0]?.getAttribute('data-histoty');
    let historyItem = document.querySelector(`.history__item_${histotyAttribute}`);

    if(!historyItem) {
        historyItem = document.createElement('div');
        const historyTitle = document.createElement('h4');
        historyTitle.textContent = document.querySelector('.quiz__form .title').innerText;
        historyTitle.className = 'history__title';

        historyItem.append(historyTitle);

        historyItem.classList.add('history__item');
        historyItem.classList.add(`history__item_${histotyAttribute}`);
        historyColumn.append(historyItem);

        historyItem.addEventListener('click', function(e) {
            const lastHistoryItem = currentQuestion == document.querySelector('.history__column').lastChild.classList[1].split('_').at(-1);
            const selectedAnswers = checkSelectedAnswers();
    
            if(selectedAnswers.length == 0 && !lastHistoryItem) {
                return;
            }
            
            saveSelectedAnswers();
            currentQuestion = e.target.classList[1].split('_').at(-1);
            renderQuestion();
            renderHistory();
        })
    }

    // делаем плашку активной
    document.querySelectorAll(`.history__item`).forEach(item => {
        if(item.classList[1].split('_').at(-1) == currentQuestion) {
            item.classList.add('history__item_active');
        } else {
            item.classList.remove('history__item_active');
        } 
    })
    
    // добавление элементов в плашку
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            const text = this.nextElementSibling.innerText;
            let historySpans = historyItem.querySelectorAll('span');

            if(this.type === 'checkbox') {
                if (this.checked) {
                    const span = document.createElement('span');
                    span.textContent = `${text}`;
                    historyItem.append(span);
                } else {
                    historySpans.forEach(span => {
                        if (span.textContent === `${text}` || span.textContent === `${text},\u00A0`) {
                            span.remove();
                        }
                    });
                } 
            } else if (this.type === 'radio') {
                if (this.checked && this.name != 'select') {
                    historyItem.querySelectorAll('span').forEach(span => {
                        span.remove();
                    });
                    
                    let span = document.createElement('span');
                    span.textContent = text;
                    historyItem.append(span);
                }
            }
            historyItem.querySelectorAll('span').forEach((span, index, arr) => {
                if(!arr[index + 1]) {

                } else {
                    if(!span.textContent.includes(',\u00A0')) {
                        span.textContent += ',\u00A0' 
                    }
                }
            })
        });
    });
}

renderQuestion();
renderHistory()
