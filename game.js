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

let questions = [
    {
        question: 'You live on the 13th floor of a building and you are outside on the balcony. As you look down, you witness a murder. The killer then looks up and stares at you for a while. What is the killer doing?',
        choice1: '🔪 Listening',
        choice2: '🔪 Bragging',
        choice3: '🔪 Counting',
        answer: 3,
    },
    {
        question:"",
        choice1: "☠ Answer: Counting",
        choice2: "The killer is counting which floor you are living on and which room you are in. This is to kill you in the future.",
        choice3: "➤ Continue",
        answer: 0,
    },
    {
        question: "A girl at her mother's funeral sees a handsome man and falls in love. The man suddenly leaves and the girl asks everybody for the man's name. Nobody helps her. A few days later, the girl secretly kills her sister. Why did she kill her sister?",
        choice1: "🔪 To get his attention",
        choice2: "🔪 Her sister was lying",
        choice3: "🔪 To show her anger",
        answer: 1,
    },
    {
        question: "",
        choice1: "☠ Answer: To get his attention",
        choice2: "If the death of a close relative brought them together, there is a high probability he will appear after another family death.",
        choice3: "➤ Continue",
        answer: 0,
    },
    {
        question: "A couple are crying while watching fireworks with their new born baby. Why are they crying?",
        choice1: "🔪 The baby is scared",
        choice2: "🔪 The baby is dead",
        choice3: "🔪 The baby is sleeping",
        answer: 3,
    },
    {
        question: "",
        choice1: "☠ Answer: The baby is sleeping",
        choice2: "A loud noise would most certainly wake up the baby. This was the moment the couple realized that their baby was deaf. ",
        choice3: "➤ Continue",
        answer: 1,
    },
    {
        question: "Santa Claus comes down the chimney and magically gives a young boy a bicycle. However, the young boy is very sad. Why is he sad?",
        choice1: "🔪 He does not want it",
        choice2: "🔪 Santa is not real",
        choice3: "🔪 He cannot ride it",
        answer: 3,
    },
    {
        question: "",
        choice1: "☠ Answer: He cannot ride it",
        choice2: "The child has no legs and therefore cannot ride the bicycle. ",
        choice3: "➤ Finish",
        answer: 1,
    }
]


const SCORE_POINTS = 25 

const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    //progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(null)
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
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

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
    score +=num
    scoreText.innerText = (score + "%")
}

startGame()