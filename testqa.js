// Описание объекта вопроса с ответами
// Конструктор с инициализацией объекта
class Question {
    constructor(t, a, ca) {
        this.text = t;
        this.answers = a;
        this.correctAnswers = ca;
        return this;
    }
}

// База вопросов
let questionsArray = [
    {
        "text": "Что из перечисленного не является языком программирования?",
        "answers": [
            "HTML",
            "Java",
            "Pyton",
            "DevOps",
        ],
        "correctAnswers": [4]
    },
    {
        "text": "Какие из перечисленных видов тестирования могут быть автоматизированы?",
        "answers": [
            "UI тестирование",
            "Юзабилити тестирование",
            "Тестирование совместимости",
            "Unit тестирование",
        ],
        "correctAnswers": [2]
    },
    {
        "text": "Выберите вариант, который соответствует следующему предложению: 'Известно, что грымзик обязательно или полосат, или рогат, или то и другое вместе'",
        "answers": [
            "Грымзик не может быть безрогим",
            "Грымзик не может быть однотонным и безрогим одновременно",
            "Грымзик не может быть полосатым и безрогим одновременно",
            "Грымзик не может быть однотонным и рогатым одновременно",
        ],
        "correctAnswers": [3]
    },
    {
        "text": "Какая (какие) из следующих конструкций используется (используются) для ветвления?",
        "answers": [
            "switch case",
            "if else",
            "do while",
            "for",
        ],
        "correctAnswers": [2, 1]
    },
    {
        "text": "Какого (каких) метода (методов) тестирования не существует?",
        "answers": [
            "Метод белого ящика",
            "Метод 'игры в ящик'",
            "Метод 'кротовой норы'",
            "Метод серого ящика",
        ],
        "correctAnswers": [1, 3]
    }

];

let buttonSubmit = document.createElement('button');
buttonSubmit.textContent = 'Submit'
buttonSubmit.setAttribute("onclick", "checkAnswers()");

const CC1 = 'Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.';
const CC2 = 'Вы не ввели текст N* варианта ответа. Попробуйте добавить вопрос заново.\n *N — номер вопроса.'
const CC3 = 'Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.'
const CC4 = 'Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.';
// const CC5 = 'Количество верных ответов: ${validAnswersCount}  из  ${questionsCount}';
// const CC6 = 'Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.';

// Создаем вопрос с ответами для добавления в базк
function setQuestion() {
    // Получаем составные части вопроса
    // Текст вопроса
    let questionText = getQuestionText();
    if (questionText == undefined) return null;
    // Массив ответов
    let answersArr = getAnswers();
    for (let i = 0; i < answersArr.length; i++) {
        if (answersArr[i] === null) {
            alert('Введены некорретные ответы.');
            return null;
        }
    }
    // Массив номеров верных ответов
    let correctAnswersArr = getCorrectAnswers();
    // Создаем конструктором вопрос в переменной
    let q = new Question(questionText, answersArr, correctAnswersArr);
    // Добавляем созданный вопрос в базу (массив questions)
    questionsArray.push(q);
}

// Начинаем тест
function startTest() {
    let buttonStartTest = document.getElementById('startTest');
    buttonStartTest.setAttribute('disabled', "true");
    let buttonAddQuestion = document.getElementById("addQuestion");
    buttonAddQuestion.setAttribute('disabled', "true");
    console.log(questionsArray);
    getQuestions();
}

// Проверка всех ответов по кнопке buttonSubmit
function checkAnswers() {
    let formsArray = document.getElementsByTagName("form");
    let questionsCount = formsArray.length;
    let validAnswersCount = 0;
    for (let x = 0; x < formsArray.length; x++) {
        if (checkForm(formsArray[x]) == true) {
            validAnswersCount++;
        }
    }
    if (validateAllQuestionsWithAnswers(formsArray)) {
        if (validAnswersCount == questionsCount) {
            alert('Количество верных ответов: ' + validAnswersCount + ' из ' + questionsCount + '. Вы-молодец!');
        } else {
            alert('Количество верных ответов: ' + validAnswersCount + ' из ' + questionsCount + '. Есть еще куда расти!');
        }
    } else {
        alert('Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.');
    }
}

// Выбираем все вопросы из базы
function getQuestions() {
    const questionsDiv = document.createElement("div");
    questionsDiv.id = "questions";
    document.body.appendChild(questionsDiv);
    for (let index = 0; index < questionsArray.length; index++) {
        showQuestion(index, questionsDiv);
    }
    questionsDiv.appendChild(buttonSubmit)
}

function validateAllQuestionsWithAnswers(formsArray) {
    let validCheckedCount = 0;
    for (let x = 0; x < formsArray.length; x++) {
        let arrCheckBoxes = formsArray[x].getElementsByTagName("input");
        for (let i = 0; i < arrCheckBoxes.length; i++) {
            if (arrCheckBoxes[i].checked == true) {
                validCheckedCount++;
                break;
            }
        }
    }
    if (validCheckedCount < formsArray.length) {
        return false;
    }
    return true;
}

function checkForm(form) {
    console.log("Объект из переменной form = " + form.toString());
    let arrCheckBoxes = form.getElementsByTagName("input");
    console.log("Inputs из переменной form = " + arrCheckBoxes);
    let questionNumber = +form.id.toString().substr(6, 2);
    let indexQuestionNumber = questionNumber - 1;
    let question = questionsArray[indexQuestionNumber];
    let correctNumbersArray = question.correctAnswers;
    let correctCountBase = correctNumbersArray.length;
    let correctCountUser = 0;
    for (let i = 0; i < arrCheckBoxes.length; i++) {
        if (arrCheckBoxes[i].checked === true) {
            if (correctNumbersArray.indexOf(i + 1) !== -1) {
                correctCountUser++;
            } else {
                correctCountUser = 0;
                break;
            }
        }
    }
    if (correctCountUser === correctCountBase) {
        return true;
    } else {
        let totalScore = document.getElementById('questions');
        totalScore.appendChild(document.createElement("br"));
        let error = "Вопрос № " + questionNumber;
        let node = document.createTextNode(error);
        totalScore.appendChild(node);
        return false;
    }
}

// Отображаем вопрос с ответами на экране
// i - индекс вопроса в массиве
// questionsDiv - область вывода на экране
function showQuestion(i, questionsDiv) {
    // Достаем вопрос с ответами из массива
    let q = questionsArray[i];
    // Вводим  вопроса = индекс в массиве + 1
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
        let checkBox = createCheckbox();
        checkBox.id = i.toString();

        let nodeA = document.createTextNode(q.answers[i]);
        questionForm.appendChild(checkBox);
        questionForm.appendChild(nodeA);
    }
    // Перевод строки
    questionForm.appendChild(document.createElement('br'));
    questionForm.appendChild(document.createTextNode('--------------------------------------------'));
    // Добавляем(отрисовываем) в большой div нашу форму вопроса
    questionsDiv.appendChild(questionForm);
}

function createCheckbox() {
    let checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    return checkBox;
}

// Создаем новый вопрос и добавляем его текст
function getQuestionText() {
    let qText = prompt(' Введите текст вопроса:')
    if (qText === "" || qText == null) {
        alert('Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.')
    } else {
        return qText;
    }
}

//  Добавляем варианты ответов
function getAnswers() {
    let answerNum = 0;
    let answersArray = [];
    while (answerNum < 4) {
        let answer = prompt('Введите вариант ответа ' + ++answerNum + ': ');
        if (answer !== "") {
            answersArray.push(answer);
        } else {
            answerNum--;
        }
    }
    return answersArray;
}

//  Добавляем номера(индексы в массиве) верных ответов
function getCorrectAnswers() {
    while (true) {
        let a = prompt('Введите номер(а) верного(ых) ответов через запятую:');
        let correctAnswerArray = a.split(",").map(Number);
        console.log("arr = " + correctAnswerArray);
        if (validateCorrectAnswers(correctAnswerArray) == true) {
            return correctAnswerArray;
        } else {
            alert('Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.');
            //break;
        }
    }
}

// Проверка строки ответов
function validateCorrectAnswers(arr) {
    let validArray = [1, 2, 3, 4];
    console.log("arr = " + arr);
    for (let i = 0; i < arr.length; i++) {
        if (validArray.indexOf(arr[i]) == -1) {
            console.log("Нет такого элемента: " + arr[i]);
            return false;
        }
    }
    if (validateRepeat(arr)) {
        alert("Номера ответов повторяются");
        return false;
    }
    return true;
}

// Проверка повторяющихся значений
function validateRepeat(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                return true; // если есть совпадение - true
            } // тут все понятно?
        }
    }
    return false;
}


