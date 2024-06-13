const userChoices = document.getElementById('user-choices'); // No longer need
const modalForm = document.getElementById('modal-form');
const questionForm = document.getElementById('question-form');
const quizForm = document.getElementById('quiz-form')
const selectOne = document.getElementById('category-type');
const selectTwo = document.getElementById('difficulty');
const selectThree = document.getElementById('question-type');

const baseTriviaURL = 'https://opentdb.com/api.php?amount=10' //Don't need anymore

// Function for taking the user's quiz choices and alters the URL used in the fetch
function getTriviaURL(event) {
  event.preventDefault();
  let categoryEl = selectOne.value;
  let difficultyEl = selectTwo.value;
  let questionType = selectThree.value;
  let userCategory;
  let userDifficulty;
  let userQuestionType;

  if (categoryEl == 'Entertainment: Books') {
    userCategory = '&category=10';
  } else if (categoryEl == 'Entertainment: Film') {
    userCategory = '&category=11';
  } else if (categoryEl == 'Entertainment: Music') {
    userCategory = '&category=12';
  } else if (categoryEl == 'Entertainment: Musicals & Theatres') { // Double check this one
    userCategory = '&category=13';
  } else if (categoryEl == 'Entertainment: Television') {
    userCategory = '&category=14';
  } else if (categoryEl == 'Entertainment: Video Games') {
    userCategory = '&category=15';
  } else if (categoryEl == 'Entertainment: Board Games') {
    userCategory = '&category=16';
  } else if (categoryEl == 'Entertainment: Japanese Anime & Manga') {
    userCategory = '&category=31';
  } else if (categoryEl == 'Entertainment: Cartoon & Animations') {
    userCategory = '&category=32';
  };

  if (difficultyEl == 'Easy') {
    userDifficulty = '&difficulty=easy';
  } else if (difficultyEl == 'Medium') {
    userDifficulty = '&difficulty=medium';
  } else if (difficultyEl == 'Hard') {
    userDifficulty = '&difficulty=hard';
  };

  if (questionType == 'Multiple Choice') {
    userQuestionType = '&type=multiple';
  } else if (questionType == 'True or False') {
    userQuestionType = '&type=boolean';
  } else if (questionType == 'Both') {
    userQuestionType = ''
  };

  const userChosenURL = `https://opentdb.com/api.php?amount=10${userCategory}${userDifficulty}${userQuestionType}`
  console.log(userChosenURL) // DELETE when done
  handleGetQuestions(userChosenURL);

};

// Fetches data user the user modified URL and then creates an array of objects containing important information to render the quiz questions
function handleGetQuestions(userChosenURL) {
  fetch(userChosenURL)
    .then(function (response) {
      return response.json()
    })

    .then(function (questions) {
      console.log('just the data', questions) // Delete when done
      const quizQuestions = [];

      const allPossibleAnswers = [];

      for (let i = 0; i < questions.results.length; i++) {
        let wrongAnswers = questions.results[i].incorrect_answers;
        let randomNum = Math.floor(Math.random()*4);
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
      localStorage.setItem('questions', JSON.stringify(quizQuestions));
      console.log('my array', quizQuestions) // DELETE when done
      renderQuestions(quizQuestions);

    });
};

// Function for rendering the quiz questions to the webpage
function renderQuestions(quizQuestions) {

  for (let i = 0; i < quizQuestions.length; i++) {
    questionDiv = document.createElement('div');
    questionEl = document.createElement('p')
    questionEl.textContent = quizQuestions[i].question

    quizForm.appendChild(questionDiv)
    questionDiv.appendChild(questionEl)
    
    // This section is used for rendering true or false answer radio buttons
    if (quizQuestions[i].type == 'boolean') {
      const answerFieldset = document.createElement('fieldset');

      const trueLabel = document.createElement('label');
      trueLabel.textContent = 'True'
      trueLabel.setAttribute('for', `questionAnswerTrue${i}`);
      const trueEl = document.createElement('input');
      trueEl.setAttribute('type', 'radio');
      trueEl.setAttribute('id', `questionAnswerTrue${i}`);
      trueEl.setAttribute('name', `quizInput${i}`);
      trueEl.setAttribute('value', 'True');

      const falseLabel = document.createElement('label')
      falseLabel.textContent = 'False'
      trueLabel.setAttribute('for', `questionAnswerFalse${i}`);
      const falseEl = document.createElement('input');
      falseEl.setAttribute('type', 'radio');
      falseEl.setAttribute('id', `questionAnswerFalse${i}`);
      falseEl.setAttribute('name', `quizInput${i}`);
      falseEl.setAttribute('value', 'False');

      answerFieldset.append(trueEl, trueLabel, falseEl, falseLabel);
      questionDiv.appendChild(answerFieldset);

      // This section is used for rendering multiple choice radio buttons
    } else if (quizQuestions[i].type == 'multiple') {
      const answerFieldset = document.createElement('fieldset');

      //console.log('quizQuestions', quizQuestions[i])

      const labelA = document.createElement('label');
      labelA.textContent = quizQuestions[i].all_answers[0];
      labelA.setAttribute('for', `questionAnswerA${i}`);
      const answerA = document.createElement('input');
      answerA.textContent = `A: ${quizQuestions[i].all_answers[0]}`
      answerA.setAttribute('type', 'radio');
      answerA.setAttribute('id', `questionAnswerA${i}`);
      answerA.setAttribute('name', `quizInput${i}`);
      answerA.setAttribute('value', `${quizQuestions[i].all_answers[0]}`);

      const labelB = document.createElement('label');
      labelB.textContent = quizQuestions[i].all_answers[1];
      labelB.setAttribute('for', `questionAnswerB${i}`);
      const answerB = document.createElement('input');
      answerB.textContent = `B: ${quizQuestions[i].all_answers[1]}`
      answerB.setAttribute('type', 'radio');
      answerB.setAttribute('id', `questionAnswerB${i}`);
      answerB.setAttribute('name', `quizInput${i}`);
      answerB.setAttribute('value', `${quizQuestions[i].all_answers[1]}`);

      const labelC = document.createElement('label');
      labelC.textContent = quizQuestions[i].all_answers[2];
      labelC.setAttribute('for', `questionAnswerC${i}`);
      const answerC = document.createElement('input');
      answerC.textContent = `C: ${quizQuestions[i].all_answers[2]}`
      answerC.setAttribute('type', 'radio');
      answerC.setAttribute('id', `questionAnswerC${i}`);
      answerC.setAttribute('name', `quizInput${i}`);
      answerC.setAttribute('value', `${quizQuestions[i].all_answers[2]}`);

      const labelD = document.createElement('label');
      labelD.textContent = quizQuestions[i].all_answers[3];
      labelD.setAttribute('for', `questionAnswerD${i}`);
      const answerD = document.createElement('input');
      answerD.textContent = `D: ${quizQuestions[i].all_answers[3]}`
      answerD.setAttribute('type', 'radio');
      answerD.setAttribute('id', `questionAnswerD${i}`);
      answerD.setAttribute('name', `quizInput${i}`);
      answerD.setAttribute('value', `${quizQuestions[i].all_answers[3]}`);

      answerFieldset.append(answerA, labelA, answerB, labelB, answerC, labelC, answerD, labelD);
      questionDiv.appendChild(answerFieldset);
    };

  };

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit quiz answers';
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('form', 'quiz-form');
  submitButton.setAttribute('id', 'submit-button');
  submitButton.classList.add("button", "is-primary")
  //submitButton.classList.add('btn', 'is-primary')

  questionForm.appendChild(submitButton);

};

function getUserAnswers() {
  const userAnswers = [];

  quizQuestions = JSON.parse(localStorage.getItem('questions'));

  for (let i = 0; i < quizQuestions.length; i++) {
    const userQuestionAnswer = document.querySelector(`input[name="quizInput${i}"]:checked`).value
    userAnswers.push(userQuestionAnswer);
  }
  localStorage.setItem('Answers', JSON.stringify(userAnswers));
};

// Event listeners for the user submiting the form of what type of quiz they want and submitting their quiz answers
modalForm.addEventListener('submit', getTriviaURL);

quizForm.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('hit')

  const element = event.target
  console.log(element)
  if (element.matches('form')) {
    console.log('hit')
    getUserAnswers()
    //location.assign('./results.html');
  };
});

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});