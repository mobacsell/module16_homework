'use strict'

const   result = document.querySelector('.result'),
        select = document.querySelector('.form__select'),
        btn = document.querySelector('.form__btn');


btn.addEventListener('click', (event) => {
//Обработчик события - клик на кнопку
    event.preventDefault();
    if (select.value === 'selected') {
    //Не выбрана дата
        result.innerHTML = `
        <p class="result__text">Выберите, пожалуйста, год.</p>
    `;
    } else {
    //Дата выбрана - выполняется функция getResultRequest
        result.innerHTML = `
            <p class="result__text">Получение данных. Подождите...</p>
        `;
        getResultRequest('https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440', formatResult);
    }
});

function getResultRequest(url, result) {
//Функция - выполнение AJAX-запроса
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.addEventListener('error', () => {
        result.innerHTML = `
            <p class="result__text">Произошла ошибка. Попробуйте позже.</p>
        `;
    });
    xhr.addEventListener('load', () => {
        result(xhr);
    });
      xhr.send();
}


function formatResult(api) {
//Функция выбирает необходимые данные и форматирует их в нужный вид
    const parseResponse = JSON.parse(api.response);

        parseResponse.forEach((value) => {
            if (value.year === Number(select.value)) {
                result.innerHTML = `
                    <table class="table" cellspacing="0" border="1">
                        <tr>
                            <th class="table__head">1 кв.</th>
                            <th class="table__head">2 кв.</th>
                            <th class="table__head">3 кв.</th>
                            <th class="table__head">4 кв.</th>
                        </tr>
                        <tr>
                            <td class="table__cell">${value.sales.q1}</td>
                            <td class="table__cell">${value.sales.q2}</td>
                            <td class="table__cell">${value.sales.q3}</td>
                            <td class="table__cell">${value.sales.q4}</td>
                        </tr>
                    </table><br>
                    <p class="result__text result-text"><a href="https://quickchart.io/chart?c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'], datasets:[{label:'Выручка за ${value.year} год',data:[${value.sales.q1}, ${value.sales.q2}, ${value.sales.q3}, ${value.sales.q4}]}]}}" target="_blank" class="result-text__link">Перейти на график</a></p>

                `;
            } 
        });
}
