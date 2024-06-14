const goBack = document.getElementById('backBtn')
const results = document.getElementById('winLose')
//const userAnswers = localStorage.getItem(JSON.parse('Answers'))
//const quizAnswers = localStorage.getItem(JSON.parse('questions'))
const jokeEl = document.getElementById('joke')
const displayAnswers = document.getElementById('answersEl')

function showResults() {
    let userScore = 0
    displayAnswers.textContent = quizAnswers
    for (let i=0; i < quizAnswers.length; i++) {
        if (userAnswers[i] === quizAnswers[i].correct_answers) {
            userScore++
        } else {
            userScore--
        }
    }
    if (userScore > 4) {
        results.textContent = 'Congratulations! You Win!'
    } else {
        results.textContent = 'Good Game! Brush up on your pop culture knowledge and try again.'
    }
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
