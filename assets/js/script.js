const modalForm = document.getElementById('modal-form');
const questionForm = document.getElementById('question-form');
const quizForm = document.getElementById('quiz-form');
const selectOne = document.getElementById('category-type');
const selectTwo = document.getElementById('difficulty');
const selectThree = document.getElementById('question-type');

// Function for taking the user's quiz choices and alters the URL used in the fetch
function getTriviaURL(event) {
  event.preventDefault();

  quizForm.innerHTML = ''

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
  } else if (categoryEl == 'Entertainment: Musicals & Theatres') {
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
  handleGetQuestions(userChosenURL);

};

// Fetches data user the user modified URL and then creates an array of objects containing important information to render the quiz questions
function handleGetQuestions(userChosenURL) {
  fetch(userChosenURL)
    .then(function (response) {
      return response.json()
    })

    .then(function (questions) {

      if (questions.response_code == 1) {
        const explanationDiv = document.createElement('div');
        const explanationP = document.createElement('p');
        explanationP.textContent = `We are sorry but there are not enough questions for your quiz request. Please choose a different category, difficulty or question type`;
        quizForm.appendChild(explanationDiv);
        explanationDiv.appendChild(explanationP);
        return
      }

      const quizQuestions = [];

      const allPossibleAnswers = [];

      for (let i = 0; i < questions.results.length; i++) {
        let wrongAnswers = questions.results[i].incorrect_answers;
        let randomNum = Math.floor(Math.random()*4);
        wrongAnswers.splice(randomNum, 0, questions.results[i].correct_answer);
        allPossibleAnswers.push(wrongAnswers);
      };

      for (let i = 0; i < allPossibleAnswers.length; i++) {
        for (let y = 0; y < allPossibleAnswers[i].length; y++) {
          allPossibleAnswers[i][y] = decodeHtml(allPossibleAnswers[i][y]);
        }
      }

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
      renderQuestions(quizQuestions);

    });
};

// Function for getting rid of html entities
function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Function for rendering the quiz questions to the webpage
function renderQuestions(quizQuestions) {

  for (let i = 0; i < quizQuestions.length; i++) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('columns', 'custom-border');
    const questionEl = document.createElement('p');
    questionEl.classList.add('column', 'is-offset-1', 'is-8', 'is-flex', 'is-justify-content-center', 'is-align-items-center', 'has-text-weight-bold');
    questionEl.textContent = decodeHtml(quizQuestions[i].question);

    quizForm.appendChild(questionDiv)
    questionDiv.appendChild(questionEl)
    
    // This section is used for rendering true or false answer radio buttons
    if (quizQuestions[i].type == 'boolean') {
      const answerFieldset = document.createElement('fieldset');
      answerFieldset.classList.add('column', 'is-3', 'is-flex-direction-column', 'custom-border-left');

      const answerDivTrue = document.createElement('div');
      answerDivTrue.classList.add('column', 'is-12', 'py-0');

      const trueLabel = document.createElement('label');
      trueLabel.textContent = 'True'
      trueLabel.setAttribute('for', `questionAnswerTrue${i}`);
      const trueEl = document.createElement('input');
      trueEl.setAttribute('type', 'radio');
      trueEl.setAttribute('id', `questionAnswerTrue${i}`);
      trueEl.setAttribute('name', `quizInput${i}`);
      trueEl.setAttribute('value', 'True');

      const answerDivFalse = document.createElement('div');
      answerDivFalse.classList.add('column', 'is-12', 'py-0');

      const falseLabel = document.createElement('label');
      falseLabel.textContent = 'False'
      trueLabel.setAttribute('for', `questionAnswerFalse${i}`);
      const falseEl = document.createElement('input');
      falseEl.setAttribute('type', 'radio');
      falseEl.setAttribute('id', `questionAnswerFalse${i}`);
      falseEl.setAttribute('name', `quizInput${i}`);
      falseEl.setAttribute('value', 'False');

      answerDivTrue.append(trueEl, trueLabel);
      answerDivFalse.append(falseEl, falseLabel);
      answerFieldset.append(answerDivTrue, answerDivFalse);
      questionDiv.appendChild(answerFieldset);

      // This section is used for rendering multiple choice radio buttons
    } else if (quizQuestions[i].type == 'multiple') {
      const answerFieldset = document.createElement('fieldset');
      answerFieldset.classList.add('column', 'is-3', 'is-flex-direction-column', 'custom-border-left');

      const answerDivA = document.createElement('div');
      answerDivA.classList.add('column', 'is-12', 'py-0');

      const labelA = document.createElement('label');
      labelA.textContent = `A: ${quizQuestions[i].all_answers[0]}`;
      labelA.setAttribute('for', `questionAnswerA${i}`);
      const answerA = document.createElement('input');
      answerA.textContent = quizQuestions[i].all_answers[0];
      answerA.setAttribute('type', 'radio');
      answerA.setAttribute('id', `questionAnswerA${i}`);
      answerA.setAttribute('name', `quizInput${i}`);
      answerA.setAttribute('value', `${quizQuestions[i].all_answers[0]}`);

      const answerDivB = document.createElement('div');
      answerDivB.classList.add('column', 'is-12', 'py-0');

      const labelB = document.createElement('label');
      labelB.textContent = `B: ${quizQuestions[i].all_answers[1]}`;
      labelB.setAttribute('for', `questionAnswerB${i}`);
      const answerB = document.createElement('input');
      answerB.textContent = quizQuestions[i].all_answers[1];
      answerB.setAttribute('type', 'radio');
      answerB.setAttribute('id', `questionAnswerB${i}`);
      answerB.setAttribute('name', `quizInput${i}`);
      answerB.setAttribute('value', `${quizQuestions[i].all_answers[1]}`);

      const answerDivC = document.createElement('div');
      answerDivC.classList.add('column', 'is-12', 'py-0');

      const labelC = document.createElement('label');
      labelC.textContent = `C: ${quizQuestions[i].all_answers[2]}`;
      labelC.setAttribute('for', `questionAnswerC${i}`);
      const answerC = document.createElement('input');
      answerC.textContent = quizQuestions[i].all_answers[2];
      answerC.setAttribute('type', 'radio');
      answerC.setAttribute('id', `questionAnswerC${i}`);
      answerC.setAttribute('name', `quizInput${i}`);
      answerC.setAttribute('value', `${quizQuestions[i].all_answers[2]}`);

      const answerDivD = document.createElement('div');
      answerDivD.classList.add('column', 'is-12', 'py-0');

      const labelD = document.createElement('label');
      labelD.textContent = `D: ${quizQuestions[i].all_answers[3]}`;
      labelD.setAttribute('for', `questionAnswerD${i}`);
      const answerD = document.createElement('input');
      answerD.textContent = quizQuestions[i].all_answers[3];
      answerD.setAttribute('type', 'radio');
      answerD.setAttribute('id', `questionAnswerD${i}`);
      answerD.setAttribute('name', `quizInput${i}`);
      answerD.setAttribute('value', `${quizQuestions[i].all_answers[3]}`);

      answerDivA.append(answerA, labelA);
      answerDivB.append(answerB, labelB);
      answerDivC.append(answerC, labelC);
      answerDivD.append(answerD, labelD);
      answerFieldset.append(answerDivA, answerDivB, answerDivC, answerDivD);
      questionDiv.appendChild(answerFieldset);
    };

  };

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('is-flex', 'is-justify-content-center')
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit quiz answers';
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('form', 'quiz-form');
  submitButton.setAttribute('id', 'submit-button');
  submitButton.classList.add("button", "is-primary")

  quizForm.appendChild(buttonDiv);
  buttonDiv.appendChild(submitButton);

};

// Function for collecting the users answers
function getUserAnswers() {
  const userAnswers = [];

  quizQuestions = JSON.parse(localStorage.getItem('questions'));

  for (let i = 0; i < quizQuestions.length; i++) {
    const userQuestionAnswer = document.querySelector(`input[name="quizInput${i}"]:checked`).value
    userAnswers.push(userQuestionAnswer);
  }
  localStorage.setItem('answers', JSON.stringify(userAnswers));
};

// Event listeners for the user submiting the form of what type of quiz they want and submitting their quiz answers
modalForm.addEventListener('submit', getTriviaURL);

quizForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const element = event.target
  if (element.matches('form')) {
    getUserAnswers()
    location.assign('./results.html');
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