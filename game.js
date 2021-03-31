const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'What is the correct HTML tag for inserting a line break?',
        choice1: '<br>',
        choice2: '<break>',
        choice3: '<brk>',
        choice4: '<lb>',
        answer: 1,
    },
    {
        question: "Which of the below statements is equivalent to $add += $add?",
        choice1: "$add = $add + $add + 1",
        choice2: "$add = $add + 1",
        choice3: "$add = $add",
        choice4: "$add = $add +$add",
        answer: 4,
    },
    {
        question: "Which tag inserts a line horizontally on your web page?",
        choice1: "<tr>",
        choice2: "<hr>",
        choice3: "<line>",
        choice4: "<line direction= horizontal>",
        answer: 2,
    },
    {
        question: "Which tag allows you to add a row in a table?",
        choice1: "<tr> and </tr>",
        choice2: "<cr> and </cr>",
        choice3: "<th> and </th>",
        choice4: "<td> and </td>",
        answer: 1,
    },
    {
        question: "Choose the correct HTML tag to make a text italic?",
        choice1: "<li>",
        choice2: "<italic>",
        choice3: "<i>",
        choice4: "<italic>",
        answer: 3,
    },
    {
        question: "How can you make a numbered list?",
        choice1: "<li>",
        choice2: "<ol>",
        choice3: "<ul>",
        choice4: "<dl>",
        answer: 2,
    },
    {
        question: "Which one of the following statements is used to create a table?",
        choice1: "CREATE table_name (column_name column_type);",
        choice2: "CREATE TABLE table_name (column_type column_name);",
        choice3: "CREATE table_name (column_type column_name);",
        choice4: "CREATE TABLE table_name (column_name column_type);",
        answer: 4,
    },
    {
        question: "Tags and test that are not directly displayed on the page are written in _____ section.",
        choice1: "<body>",
        choice2: "<html>",
        choice3: "<head>",
        choice4: "<title>",
        answer: 3,
    },
    {
        question: "What should be the first tag in any HTML document?",
        choice1: "<body>",
        choice2: "<head>",
        choice3: "<title>",
        choice4: "<html>",
        answer: 4,
    },
    {
        question: "Tag <b> makes the enclosed text bold. What is other tag to make text bold?",
        choice1: "<strong>",
        choice2: "<dar>",
        choice3: "<black>",
        choice4: "<emp>",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()