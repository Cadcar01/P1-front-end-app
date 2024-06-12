const userChoices = document.getElementById('user-choices');
const questionForm = document.getElementById('question-form');
const selectOne = document.getElementById('category-type');
const selectTwo = document.getElementById('difficulty');
const selectThree = document.getElementById('question-type');

const baseTriviaURL = 'https://opentdb.com/api.php?amount=10'

function getTriviaURL() {
  categoryEl = selectOne.value
  difficultyEl = selectTwo.value
  questionType = selectThree.value

  if (categoryEl == 'Entertainment: Books') {
    const userCategory = '&category=10'
  } else if (categoryEl == 'Entertainment: Film') {
    const userCategory = '&category=11'
  } else if (categoryEl == 'Entertainment: Music') {
    const userCategory = '&category=12'
  } else if (categoryEl == 'Entertainment: Musicals & Theatres') {
    const userCategory = '&category=13'
  } else if (categoryEl == 'Entertainment: Television') {
    const userCategory = '&category=14'
  } else if (categoryEl == 'Entertainment: Video Games') {
    const userCategory = '&category=15'
  } else if (categoryEl == 'Entertainment: Board Games') {
    const userCategory = '&category=16'
  } else if (categoryEl == 'Entertainment: Japanese Anime & Manga') {
    const userCategory = '&category=31'
  } else if (categoryEl == 'Entertainment: Cartoon & Animations') {
    const userCategory = '&category=32'
  };

  if (difficultyEl == 'Easy') {
    const userDifficulty = '&difficulty=easy'
  } else if (difficultyEl == 'Medium') {
    const userDifficulty = '&difficulty=medium'
  } else if (difficultyEl == 'Hard') {
    const userDifficulty = '&difficulty=hard'
  };

  if (questionType == 'Multiple Choice') {
    const userQuestionType = '&type=multiple'
  } else if (questionType == 'True or False') {
    const userQuestionType = '&type=boolean'
  } else if (questionType == 'Both') {
    const userQuestionType = ''
  };

  const userChosenURL = `https://opentdb.com/api.php?amount=10${userCategory}${userDifficulty}${userQuestionType}`
  handleGetQuestions(userChosenURL)

};

function handleGetQuestions(userChosenURL) {
  fetch (userChosenURL)
    .then(function(response) {
      return response.json()
    })

    .then (function(questions) {
      const quizQuestions = []

      const allPossibleAnswers = []

      for (let i = 0; i < questions.results.length; i++) {
        let wrongAnswers = questions.results[i].incorrect_answers;
        let randomNum = Math.floor(Math.random()*3);
        wrongAnswers.splice(randomNum, 0, questions.results[i].correct_answer);
        allPossibleAnswers.push(wrongAnswers);
      };

      for (let i = 0; i < questions.results.length; i++) {
        const individualQuestion = {
          type: questions.results[i].type,
          question: questions.results[i].question,
          correct_answer: questions.results[i].correct_answer,
          all_answers: allPossibleAnswers[i]
        };
          quizQuestions.push(individualQuestion)
      };
      localStorage.setItem(JSON.stringify('questions', quizQuestions));
      renderQuestions(quizQuestions);
        
    });
  
};

handleGetQuestions()

function renderQuestions(quizQuestions) {

  const quizForm = document.createElement('form');
  quizForm.setAttribute('id', 'quiz-form');
  
  questionForm.appendChild(quizForm);

  for (let i = 0; i < quizQuestions.length; i++) {
    questionDiv = document.createElement('div');
    questionEl = document.createElement('p')
    questionEl.textContent = quizQuestions[i].question

    quizForm.appendChild(questionDiv)
    questionDiv.appendChild(questionEl)
  
    if (quizQuestions[i].type == 'boolean') {
      const answerFieldset = document.createElement('fieldset');

      const trueLabel = document.createElement('label');
      trueLabel.textContent = 'True'
      trueLabel.setAttribute('for', `questionAnswer${i}`);
      const trueEl = document.createElement('input');
      trueEl.setAttribute('type', 'radio');
      trueEl.setAttribute('id', `questionAnswer${i}`);
      trueEl.setAttribute('name', `trueOrFalse${i}`);
      trueEl.setAttribute('value', 'True');

      const falseLabel = document.createElement('label')
      falseLabel.textContent = 'False'
      trueLabel.setAttribute('for', `questionAnswer${i}`);
      const falseEl = document.createElement('input');
      trueEl.setAttribute('type', 'radio');
      trueEl.setAttribute('id', `questionAnswer${i}`);
      trueEl.setAttribute('name', `trueOrFalse${i}`);
      trueEl.setAttribute('value', 'False');

      answerFieldset.appendChild(trueLabel, trueEl, falseLabel, falseEl);
      questionDiv.appendChild(answerFieldset);

    } else if (quizQuestions[i].type == 'multiple') {
      const answerFieldset = document.createElement('fieldset');

      const labelA = document.createElement('label');
      labelA.textContent = quizQuestions[i].all_answer[0];
      labelA.setAttribute('for', `questionAnswer${i}`);
      const answerA = document.createElement('input');
      answerA.textContent = `A: ${questionMultis[0]}`
      answerA.setAttribute('type', 'radio');
      answerA.setAttribute('id', `questionAnswer${i}`);
      answerA.setAttribute('name', `questionMulti${i}`);
      answerA.setAttribute('value', `${quizQuestions[i].all_answer[0]}`);

      const labelB = document.createElement('label');
      labelB.textContent = quizQuestions[i].all_answer[1];
      labelB.setAttribute('for', `questionAnswers${i}`);
      const answerB = document.createElement('input');
      answerB.textContent = `B: ${questionMultis[1]}`
      answerB.setAttribute('type', 'radio');
      answerB.setAttribute('id', `questionAnswer${i}`);
      answerB.setAttribute('name', `questionMulti${i}`);
      answerB.setAttribute('value', `${quizQuestions[i].all_answer[1]}`);

      const labelC = document.createElement('label');
      labelC.textContent = quizQuestions[i].all_answer[2];
      labelC.setAttribute('for', `questionAnswer${i}`);
      const answerC = document.createElement('input');
      answerC.textContent = `C: ${questionMultis[2]}`
      answerC.setAttribute('type', 'radio');
      answerC.setAttribute('id', `questionAnswer${i}`);
      answerC.setAttribute('name', `questionMulti${i}`);
      answerC.setAttribute('value', `${quizQuestions[i].all_answer[2]}`);

      const labelD = document.createElement('label');
      labelD.textContent = quizQuestions[i].all_answer[3];
      labelD.setAttribute('for', `questionAnswer${i}`);
      const answerD = document.createElement('input');
      answerD.textContent = `D: ${questionMultis[3]}`
      answerD.setAttribute('type', 'radio');
      answerD.setAttribute('id', `questionAnswer${i}`);
      answerD.setAttribute('name', `questionMulti${i}`);
      answerD.setAttribute('value', `${quizQuestions[i].all_answer[3]}`);

      answerFieldset.appendChild(labelA, answerA, labelB, answerB, labelC, answerC, labelD, answerD);
      questionDiv.appendChild(answerFieldset);
    };
    
  };

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit quiz answers';
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('form', 'quiz-form');

};

function getUserAnswers() {
  const userAnswers = [];
  
  for (let i = 0; i < quizQuestions.length; i++) {
    const userQuestionAnswer = document.getElementById(`questionAnswer${i}`).value;
    userAnswers.push(userQuestionAnswer);
  }
  localStorage.setItem(JSON.stringify('Answers', userAnswers));
};

userChoices.addEventListener('submit', getTriviaURL);

questionForm.addEventListener('submit', function(event) {
  event.preventDefault()

  const element = event.target
  if (element.matches('button')) {
  getUserAnswers()
  location.assign('./results.html');
  };

});