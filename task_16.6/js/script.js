'use strict';

//Реализация через Promise:

const promise = new Promise((resolve, reject) => {
    
    setTimeout(() => {
        const randNumber = Math.round(Math.random() * 99) + 1;

        if(randNumber % 2 === 0) {
            resolve(randNumber);
        } else {
            reject(randNumber);
        }
    }, 3000);
});

promise.then((result) => {
    console.log(`Завершено успешно. Сгенерированное число — ${result}`);
}).catch((result) => {
    console.log(`Завершено с ошибкой. Сгенерированное число — ${result}`);
});

//Реализация через Async/await:

// getResultNumber();

// async function getResultNumber() {
//     try {
//         const res = await new Promise((resolve, reject) => {

//             setTimeout(() => {
//                 const randNumber = Math.round(Math.random() * 99) + 1;
        
//                 if(randNumber % 2 === 0) {
//                     resolve(randNumber);
//                 } else {
//                     reject(randNumber);
//                 }
//             }, 3000);
//         });
//         console.log(`Завершено успешно. Сгенерированное число — ${res}`);
//     } catch(error) {
//         console.log(`Завершено с ошибкой. Сгенерированное число — ${error}`);
//     }
// }
