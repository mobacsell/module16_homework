'use strict';

const   xmlString = `<list>
                        <student>
                            <name lang="en">
                                <first>Ivan</first>
                                <second>Ivanov</second>
                            </name>
                            <age>35</age>
                            <prof>teacher</prof>
                        </student>
                        <student>
                            <name lang="ru">
                                <first>Петр</first>
                                <second>Петров</second>
                            </name>
                            <age>58</age>
                            <prof>driver</prof>
                        </student>
                    </list>`;

const   parser = new DOMParser();

const   xmlDOM = parser.parseFromString(xmlString, 'text/xml');

const   nameNode = xmlDOM.querySelectorAll('name'),
        firstNameNode = xmlDOM.querySelectorAll('first'),
        secondNameNode = xmlDOM.querySelectorAll('second'),
        ageNode = xmlDOM.querySelectorAll('age'),
        profNode = xmlDOM.querySelectorAll('prof');

const xmlToJS = {
    list: [
            {
                name: `${firstNameNode[0].textContent} ${secondNameNode[0].textContent}`,
                age: ageNode[0].textContent,
                prof: profNode[0].textContent,
                lang: nameNode[0].getAttribute('lang')
            },
            {
                name: `${firstNameNode[1].textContent} ${secondNameNode[1].textContent}`,
                age: ageNode[1].textContent,
                prof: profNode[1].textContent,
                lang: nameNode[1].getAttribute('lang')
            }
    ]
};

console.log(xmlToJS);