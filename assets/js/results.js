const goBack = document.getElementById('backBtn')
const results = document.getElementById('winLose')

fetch('https://api.humorapi.com/jokes/random?excludes=nsfw,dark&api-key=35b00f4fc5b341b19c62369d73a8fee6')
    .then(function(response) {
        console.log(response)
        return response.json
    })
    .then(function(data) {
        console.log(data)
    })


//if (win) {results.textContent = 'Congratulations! You Win!'} else {results.textContent = 'Good Game! Brush up on your pop culture knowledge and try again.'}

goBack.addEventListener('click', function() {
    location.href= './index.html'
})