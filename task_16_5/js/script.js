'use strict';

checkDataFromLS();

function checkDataFromLS() {
//Функция проверяет, записаны ли данные в браузер по последнему заходу пользователя через localStorage.
//Если да, то функция подтягивает эти данные в alert и перезаписывает время последнего входа на страницу.

    if(localStorage.getItem('userName')) {
        alert(`Добрый день, ${localStorage.getItem('userName')}! Давно не виделись. В последний раз вы были у нас в ${localStorage.getItem('entranceDateTime')}`);
        setDataToLS();
    } else {
        setDataToLS('full');
    }
};


function setDataToLS(mode) {
//Функция записывает данные пользователя в браузер через localStorage.
    const   now = new Date();
            

    if(mode === 'full') {   
        let   name = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя:');

        if (name === '' || name === null) {
            name = 'Аноним';
        }        
        localStorage.setItem('userName', name);
    }
    localStorage.setItem('entranceDateTime', `${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())} ${addZero(now.getDate())}.${addZero(now.getMonth() + 1)}.${addZero(now.getFullYear())}`);SVGDefsElement
}


function addZero(value) {
//Функция добавляет перед размерностью даты/времени 0, если значение размерности имеет 1 символ. Например, 4 сек => 04 сек
    return value = (String(value).length >= 2) ? value : '0' + value; 
}