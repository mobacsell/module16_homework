'use strict';

const   inputText = document.querySelectorAll('.form__text'),
        btn = document.querySelector('.form__btn'),
        resultArea = document.querySelector('.result');

checkDataFromLS();

btn.addEventListener('click', (event) => {
//Обработчик события при клике на кнопку <Запрос>

    event.preventDefault();
    if (inputText[0].value === '' || inputText[1].value === '') {
        textResult('Заполните все поля!', '--error');
    } else if (!checkValue(inputText[0].value) && !checkValue(inputText[1].value)) {
        textResult('Номер страницы и лимит вне диапазона от 1 до 10.', '--error');
    } else if (!checkValue(inputText[0].value) && checkValue(inputText[1].value)) {
        textResult('Номер страницы вне диапазона от 1 до 10.', '--error');
    } else if (checkValue(inputText[0].value) && !checkValue(inputText[1].value)) {
        textResult('Лимит вне диапазона от 1 до 10.', '--error');
    } else {
        textResult('Идет получение данных. Подождите...');
        getResultRequest(inputText[0].value, inputText[1].value)
    }
});


async function getResultRequest(val1, val2) {
    //Async-функция - отправляет и обрабатывает AJAX-запрос
    
        try {
            const res = await fetch(`https://picsum.photos/v2/list?page=${val1}&limit=${val2}`);
    
            resultArea.innerHTML = '';
            res.text().then((result) => {
                localStorage.setItem('page', val1);
                localStorage.setItem('limit', val2);
                formatResultRequest(JSON.parse(result));
            });
        } catch(error) {
            textResult('Ошибка при выполнении запроса.', '--error');
        }
    }


function checkValue(val) {
//Функция проверяет введенные в поле данные - должны быть числом от 1 до 10

    if (isFinite(val) && Number(val) > 0 && Number(val) <= 10) {
        return true;
    } else {
        return false;
    }
}


function textResult(text, postfix) {
//Функция формирует текст результата

resultArea.innerHTML = `
            <p class="result__text${postfix}">${text}</p>
        `;
}


function formatResultRequest(response) {
//Функция преобразует полученные в результате запроса данные в необходимую форму
    
    response.forEach((value) => {
        const item = document.createElement('div');

        item.classList.add('result__item', 'card-item');
        item.innerHTML = `
            <img src="${value.download_url}" alt="image by ${value.author}" class="card-item__image">
            <p class="card-item__text">${value.author}</p>
        `;
        resultArea.insertAdjacentElement('beforeend', item)      
    });
    
}


function checkDataFromLS() {
//Функция проверяет, записаны ли данные в браузере с помощью localStorage полей последнего успешного запроса. 
//Если да, то функция автоматически формирует запрос с указанными данными.   

    if(localStorage.getItem('page')) {
        getResultRequest(localStorage.getItem('page'), localStorage.getItem('limit'))
    }
}

