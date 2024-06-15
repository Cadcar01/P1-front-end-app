const goBack = document.getElementById('backBtn')
const results = document.getElementById('winLose')
const userAnswers = JSON.parse(localStorage.getItem('answers'))
const quizAnswers = JSON.parse(localStorage.getItem('questions'))
const jokeEl = document.getElementById('joke')
const displayAnswers = document.getElementById('answersEl')

function showResults() {
    let userScore = 0
    for (let i= 0; i < quizAnswers.length; i++) {
        showAnswers(quizAnswers[i])
        const userAnswer = document.createElement('p')
        userAnswer.textContent = `your answer: ${decodeHtml(userAnswers[i])}`
        userAnswer.classList.add('is-size-5')
        displayAnswers.appendChild(userAnswer)


        if (userAnswers[i] === quizAnswers[i].correct_answer) {
            userAnswer.classList.add('has-text-success')
            userScore++
        } else {
            userAnswer.classList.add('has-text-danger')
        }
        if (userScore > 4) {
        results.textContent = 'Congratulations! You Win!'
        } else {
        results.textContent = 'Good Game! Brush up on your pop culture knowledge and try again.'
        }
    }
    getApi()
}

function showAnswers(array) {
    const questionDiv = document.createElement('div')
    questionDiv.classList.add('has-background-white-ter')

    const question = document.createElement('p')
    question.textContent = decodeHtml(array.question)
    question.classList.add('is-size-5', 'has-text-weight-bold')
    
    const correctAnswer = document.createElement('p')
    correctAnswer.textContent = `correct answer: ${array.correct_answer}`
    correctAnswer.classList.add('is-size-5')

    questionDiv.appendChild(question)
    questionDiv.appendChild(correctAnswer)
    displayAnswers.appendChild(questionDiv)
}

function getApi() {
fetch('https://api.humorapi.com/jokes/random?api-key=35b00f4fc5b341b19c62369d73a8fee6&excludes=nsfw,dark,sexual,racist,sexist,insults')
.then(function(response) {console.log(response); return response.json()})
.then(function(data) {
    console.log(data)
    jokeEl.textContent = data.joke
})
}

goBack.addEventListener('click', function() {
    location.href= './index.html'
})

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

showResults()