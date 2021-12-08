'use strict';

const jsObject = {
    name: "Anton",
    age: 36,
    skills: ['javascript', 'HTML', 'CSS'],
    salary: 80000
};

const jsonObject = JSON.stringify(jsObject);

console.log(jsonObject);

