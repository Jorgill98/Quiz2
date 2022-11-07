const question = document.querySelector('#question')
const progressText = document.querySelector('progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')
const choices = Array.from(document.querySelectorAll('.choice-text'))


let currentQuestion = {}
let acceptinAnswers = true
let score = 0
let availableQuestions = []
let questionCounter = 0

let questions = [

 
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<script>',
        Choice2: '<js>',
        Choice3: '<scripting>',
        choice4: '<Javascript>',
        answer: 1,
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        choice1: 'Both the <head> dection and the <body> section are correct',
        Choice2: 'The <head> section',
        Choice3: 'The <body> section',
    
        answer: 1,
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        choice1: '<script name="xxx.js">',
        Choice2: '<script href="xxx.js"',
        Choice3: '<script src="xxx.js"',
        
        answer: 3
    },
    {
        question: 'The external JavaScript file must contain the <script> tag.',
        choice1: 'True',
        Choice2: 'False',
    
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.lenghth ===0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('/end.html')
    }
    
    
    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'

    const questionIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionIndex,1)

    acceptinAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptinAnswers) return

        acceptinAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
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
    score =+num
    scoreText.innerText = score
}

startGame()