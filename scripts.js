const quizDB = [
  { question: "Q1: What does HTML stand for?",
    a: "Hyper Text Markup Language",
    b: "High Transfer Markup Language",
    c: "Hyper Text Making Language",
    d: "Hyperlinks Text Mark Language",
    ans: "ans1" },
  { question: "Q2: What does CSS stand for?",
    a: "Colorful Style Sheets",
    b: "Cascading Style Sheets",
    c: "Computer Style Sheets",
    d: "Creative Style System",
    ans: "ans2" },
  { question: "Q3: Which HTML tag is used for JavaScript?",
    a: "<java>",
    b: "<js>",
    c: "<script>",
    d: "<javascript>",
    ans: "ans3" },
  { question: "Q4: Inside which HTML element do we put CSS?",
    a: "<style>",
    b: "<css>",
    c: "<link>",
    d: "<design>",
    ans: "ans1" },
  { question: "Q5: Which property changes text color in CSS?",
    a: "background-color",
    b: "text-color",
    c: "color",
    d: "font-color",
    ans: "ans3" },
  { question: "Q6: Which is the correct way to declare a JavaScript variable?",
    a: "var name;",
    b: "v name;",
    c: "variable name;",
    d: "dim name;",
    ans: "ans1" },
  { question: "Q7: In CSS, which symbol is used for ID selector?",
    a: ".",
    b: "#",
    c: "@",
    d: "%",
    ans: "ans2" },
  { question: "Q8: Which company developed JavaScript?",
    a: "Netscape",
    b: "Microsoft",
    c: "Sun Microsystems",
    d: "Oracle",
    ans: "ans1" },
  { question: "Q9: Which HTML tag is used to create a hyperlink?",
    a: "<link>",
    b: "<a>",
    c: "<href>",
    d: "<hyper>",
    ans: "ans2" },
  { question: "Q10: Which CSS property controls text size?",
    a: "font-style",
    b: "text-size",
    c: "font-size",
    d: "size",
    ans: "ans3" }
];

const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit');
const answers = document.querySelectorAll('.answer');
const showScore = document.querySelector('#showScore');
const timerDisplay = document.querySelector('#timer');

let questionCount = 0;
let score = 0;
let timer;
let timeLeft = 45;

const loadQuestion = () => {
  deselectAll();
  resetOptions();
  const questionList = quizDB[questionCount];
  question.innerText = questionList.question;
  option1.innerText = questionList.a;
  option2.innerText = questionList.b;
  option3.innerText = questionList.c;
  option4.innerText = questionList.d;
  startTimer();
};

const getCheckAnswer = () => {
  let answer;
  answers.forEach(curAnsElem => {
    if(curAnsElem.checked){
      answer = curAnsElem.id;
    }
  });
  return answer;
};

const deselectAll = () => {
  answers.forEach(curAnsElem => curAnsElem.checked = false);
};

const resetOptions = () => {
  document.querySelectorAll("label").forEach(lbl => {
    lbl.classList.remove("correct", "wrong");
  });
};

const startTimer = () => {
  clearInterval(timer);
  timeLeft = 45;
  timerDisplay.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timer);
      checkAnswer();
    }
  }, 1000);
};

const checkAnswer = () => {
  const checkedAnswer = getCheckAnswer();
  const correctAnswer = quizDB[questionCount].ans;

  if(checkedAnswer){
    if(checkedAnswer === correctAnswer){
      document.querySelector(`label[for=${checkedAnswer}]`).classList.add("correct");
      score++;
    } else {
      document.querySelector(`label[for=${checkedAnswer}]`).classList.add("wrong");
      document.querySelector(`label[for=${correctAnswer}]`).classList.add("correct");
    }
  } else {
    // if time runs out or nothing selected
    document.querySelector(`label[for=${correctAnswer}]`).classList.add("correct");
  }

  clearInterval(timer);

  setTimeout(() => {
    questionCount++;
    if(questionCount < quizDB.length){
      loadQuestion();
    } else {
      let resultText = score >= 7 ? "🎉 You Passed!" : "❌ You Failed!";
      showScore.innerHTML = `
        <h3>Your Score: ${score}/${quizDB.length}</h3>
        <h2>${resultText}</h2>
        <button class="btn" onclick="location.reload()">Play Again</button>
      `;
      showScore.classList.remove('scoreArea');
      showScore.classList.add(score >= 7 ? "pass" : "fail");
    }
  }, 2000);
};

submit.addEventListener('click', () => {
  checkAnswer();
});

loadQuestion();
