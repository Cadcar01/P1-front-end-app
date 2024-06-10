baseTriviaURL = 'https://opentdb.com/api.php?amount=10'
console.log('hit')

function handleGetQuestions() {
  fetch (baseTriviaURL)
    .then(function(response) {
      return response.json()
    })

    .then (function(questions) {
      console.log(questions) // DELETE when done
      const quizQuestions = []

      const allPossibleAnswers = []

      for (let i = 0; i < questions.results.length; i++) {
        let wrongAnswers = questions.results[i].incorrect_answers;
        let randomNum = Math.floor(Math.random()*3);
        wrongAnswers.splice(randomNum, 0, questions.results[i].correct_answer);
        allPossibleAnswers.push(wrongAnswers);
      };
      console.log(allPossibleAnswers); //DELETE when done

      for (let i = 0; i < questions.results.length; i++) {
        const individualQuestion = {
          type: questions.results[i].type,
          question: questions.results[i].question,
          correct_answer: questions.results[i].correct_answer,
          all_answers: allPossibleAnswers[i]
        };
          quizQuestions.push(individualQuestion)

      }
      renderQuestions(quizQuestions)
        
    });
  
};

handleGetQuestions()

function renderQuestions(quizQuestions) {
  console.log(quizQuestions)

  const questionForm = document.createElement('form')
  //htmlElement.appendChild(questionForm)

  for (let i = 0; i < quizQuestions.length; i++) {
    questionDiv = document.createElement('div');
    questionEl = document.createElement('p')
    questionEl.textContent = quizQuestions[i].question
    //questionForm.appendChild(questionDiv)
    questionDiv.appendChild(questionEl)
  
    if (quizQuestions[i].type == 'boolean') {
      const answerDiv = document.createElement('div');

      const trueLabel = document.createElement('label');
      trueLabel.textContent = 'True'
      trueLabel.setAttribute('for', `questionTrue${[i]}`);
      const trueEl = document.createElement('input');
      trueEl.setAttribute('type', 'checkbox');
      trueEl.setAttribute('value', 'true');

      const falseLabel = document.createElement('label')
      falseLabel.textContent = 'False'
      trueLabel.setAttribute('for', `questionFalse${[i]}`);
      const falseEl = document.createElement('input');
      trueEl.setAttribute('type', 'checkbox');

      answerDiv.appendChild(trueLabel, trueEl, falseLabel, falseEl)

    } else if (quizQuestions[i].type == 'multiple') {
      const answerDiv = document.createElement('div');

      const labelA = document.createElement('label');
      labelA.textContent = quizQuestions[i].all_answer[0];
      const answerA = document.createElement('input');
      answerA.setAttribute('type', 'checkbox');
      answerDiv.appendChild(labelA, answerA)

      const labelB = document.createElement('label');
      labelB.textContent = quizQuestions[i].all_answer[1];
      const answerB = document.createElement('input');
      answerB.setAttribute('type', 'checkbox');
      answerDiv.appendChild(labelB, answerB)

      const labelC = document.createElement('label');
      labelC.textContent = quizQuestions[i].all_answer[2];
      const answerC = document.createElement('input');
      answerC.setAttribute('type', 'checkbox');
      answerDiv.appendChild(labelC, answerC)

      const labelD = document.createElement('label');
      labelD.textContent = quizQuestions[i].all_answer[3];
      const answerD = document.createElement('input');
      answerD.setAttribute('type', 'checkbox');
      answerDiv.appendChild(labelD, answerD)
    }
    document.body.appendChild(questionDiv)
  };

  //create button for submitting all the questions

};

//buttonSelector.addEventListener('submit', handleGetQuestions) For getting questions

//selectorOfFormArea.addEventListener('submit', function(event) {
//event.preventDefault()
//const = element = event.target
//if (element.matches('button)) {
//function to collect data
// location.assign(second.html)}
//})