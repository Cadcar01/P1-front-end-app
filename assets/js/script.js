baseTriviaURL = 'https://opentdb.com/api.php?amount=10'
console.log('hit')

function handleGetQuestions() {
  fetch (baseTriviaURL)
    .then(function(response) {
      return response.json()
    })

    .then (function(questions) {
      console.log(questions)
      const quizQuestions = []

      for (let i = 0; i < questions.results.length; i++) {
        const individualQuestion = 
          {type: questions.results[i].type,
            question: questions.results[i].question,
            correct_answer: questions.results[i].correct_answer,
            incorrect_answers: questions.results[i].incorrect_answers
          }
          quizQuestions.push(individualQuestion)

      }
      renderQuestions(quizQuestions)
        
    });
  
};
handleGetQuestions()
function renderQuestions(quizQuestions) {
  console.log(quizQuestions)
  for (let i = 0; i < quizQuestions.length; i++) {
  questionDiv = document.createElement('div');
  questionEl = document.createElement('p')
  questionEl.textContent = quizQuestions[i].question
  questionDiv.appendChild(questionEl)
  

  if (quizQuestions[i].type == 'boolean') {
    const answerDiv = document.createElement('div');
    const trueLabel = document.createElement('label')
    trueLabel.textContent = 'True'
    const trueEl = document.createElement('input');
    trueEl.setAttribute('type', 'checkbox');
    const falseLabel = document.createElement('label')
    falseLabel.textContent = 'False'
    const falseEl = document.createElement('input');
    trueEl.setAttribute('type', 'checkbox');
    answerDiv.appendChild(trueLabel, trueEl, falseLabel, falseEl)

  } else if (quizQuestions[i].type == 'multiple') {
    const answerDiv = document.createElement('div');
    const answerA = document.createElement('input');
    answerA.setAttribute('type', 'checkbox');
    const answerB = document.createElement('input');
    answerB.setAttribute('type', 'checkbox');
    const answerC = document.createElement('input');
    answerC.setAttribute('type', 'checkbox');
    const answerD = document.createElement('input');
    answerD.setAttribute('type', 'checkbox');
  }
  document.body.appendChild(questionDiv)
}

}