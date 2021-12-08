'use strict';

const   textInput = document.querySelector('.form__text'),
        btn = document.querySelector('.form__btn'),
        resultArea = document.querySelector('.result-area');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    if(textInput.value) {
        getRequestResult();
    } else {
        resultArea.innerHTML = `
            <p class="result-area__text--error">ID пользователя не введен.</p>
        `;
    }
});

async function getRequestResult() {
//Async-функция, отправляющая запрос и обрабатывающая результат запроса

    try {
        resultArea.innerHTML = `
            <p class="result-area__text--waiting">Получение данных. Подождите...</p>
        `;

        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${textInput.value}/todos`);

        res.text().then((result) => {
            if (result !== '[]') {
                formatRequestData(JSON.parse(result));
            } else {
                errorRequest(true);
            }
        });
    } catch(error) {
        errorRequest(false);
    }
    
}

function errorRequest(requestDone) {
//Функция обрабатывающая ошибки в получении данных - запрос не отправлен либо данные по указанному ID не найдены
    
    if (requestDone) {
        resultArea.innerHTML = `
            <p class="result-area__text--error">Данные по указанному ID не найдены.</p>
        `;
    } else {
        resultArea.innerHTML = `
            <p class="result-area__text--error">Возникла ошибка. Попробуйте позже.</p>
        `;
    }
}

function formatRequestData(requestData) {
//Функция преобразует полученные данные в необходимый вид.    
    resultArea.innerHTML = `
        <p class="result-area__text">Список задач по выбранному пользователю:</p>
        <ul class="result-area__list result-list"></ul>`;

    requestData.forEach((value) => {
        if(value.completed) {
            resultArea.lastElementChild.insertAdjacentHTML('beforeend', `<li class="result-list__item--done">${value.title}</li>`);
        } else  {
            resultArea.lastElementChild.insertAdjacentHTML('beforeend', `<li class="result-list__item">${value.title}</li>`);
        }
    });    
}