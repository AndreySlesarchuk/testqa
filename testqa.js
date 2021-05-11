function startTest() {
    getQuestions();
}

// Массив (база) вопросов
let questions = [
    {
        "text": "Что из перечисленного не является языком программирования?",
        "answers": ["HTML",
            "Java",
            "Pyton",
            "DevOps"
        ],
        "correctAnswers": [0, 3]
    },
    {
        "text": "Выберите типы алгоритмов, которых не существует",
        "answers": ["Алгоритм с ветвлением",
            "Циклический безусловный",
            "Циклический с параметром",
            "Алгоритм с углублением"
        ],
        "correctAnswers": [3]
    },
    {
        "text": "Какая (какие) из следующих конструкций используется (используются) для ветвления?",
        "answers": ["switch case",
            "if else",
            "do while",
            "for"
        ],
        "correctAnswers": [0, 1]
    }
];

// Описание объекта вопроса с ответами
// let Question = {
//     text: String,
//     answers: [],
//     correctAnswers: []
// }
// Конструктор с инициализацией объекта
function Question() {
    this.text = "";
    this.answers = [];
    this.correctAnswers = [];
    return this;
}

// Выбираем все вопросы из базы
function getQuestions() {
    const questionsDiv = document.createElement("div");
    questionsDiv.id = "questions";
    document.body.appendChild(questionsDiv);
    for (let index = 0; index < questions.length; index++) {
        showQuestion(index, questionsDiv);
    }
}

// Отображаем вопрос с ответами на экране
// i - индекс вопроса в массиве
// questionsDiv - область вывода на экране
function showQuestion(i, questionsDiv) {
    // Достаем вопрос с ответами из массива
    let q = questions[i];
    // Вводим индекс вопроса = индекс в массиве + 1
    let index = i + 1;
    // Создаем элемент формы базовый в html документе
    const questionForm = document.createElement("form");
    // Задаем ей айдишку с номером
    questionForm.id = "qForm-" + index;
    // Задаем обработчик - позже напишем функцию
    questionForm.onsubmit = "";
    // Добавляем в форму текст вопроса
    let qText = "Вопрос № " + index + ": " + q.text;
    let node = document.createTextNode(qText);
    questionForm.appendChild(node);
    // Создаем чекбоксы ответов
    for (let i = 0; i < q.answers.length; i++) {
        // Перевод строки
        questionForm.appendChild(document.createElement("br"));
        // Создаем строку checkbox
        let checkBox = document.createElement("input");
        checkBox.type = "checkBox";
        checkBox.id = i;
        nodeA = document.createTextNode(q.answers[i]);
        questionForm.appendChild(checkBox);
        questionForm.appendChild(nodeA);
    }
    // Перевод строки
    questionForm.appendChild(document.createElement('br'));
    questionForm.appendChild(document.createTextNode('--------------------------------------------'));
    // Добавляем(отрисовываем) в большой div нашу форму вопроса
    questionsDiv.appendChild(questionForm);
};

// Создаем вопрос с ответами для добавления в базк
function setQuestion() {
    let q = new Question();
    addQuestion(q);
    addAnswers(q);
    addCorrectAnswers(q);
    questions.push(q);
    console.log(q);
}

// Создаем новый вопрос и добавляем его текст
function addQuestion(q) {
    let qText = prompt(' Введите текст вопроса:')
    if (qText === "" || qText == null) {
        alert('Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.')
    } else {
        const questionsDiv = document.createElement("div");
        questionsDiv.id = "questions";
        document.body.appendChild(questionsDiv);
        q.text = qText;
        document.getElementById("questions").innerHTML =
            "Вопрос: " + q.text;
        console.log(q)
    }
}

//  Добавляем варианты ответов
function addAnswers (q) {
    let answerNum = 0;
    while (answerNum < 4) {
        let answer = prompt('Введите вариант ответа ' + ++answerNum + ': ');
        if (answer !== "") {
            q.answers.push(answer);
        } else {
            answerNum--;
        }
    }
}

//  Добавляем номера(индексы в массиве) верных ответов
function addCorrectAnswers (q) {
    while (true) {
        let a = getPrompt('номер(а) верного(ых) ответов через запятую:');
        if (a !== "" || a === "q") {
            q.correctAnswers.push(a.split(','));
            break;
        } else {
            alert('Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.');
        }
    }
}

let getPrompt = (headerText) => {
    let startText = "Введите ";
    return prompt(startText + headerText);
}
