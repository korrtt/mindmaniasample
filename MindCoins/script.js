let questions = [
    {
      question: "What is 2 + 2?",
      answers: ["3", "4", "5"],
      correct: "4",
      difficulty: 1,
    },
    {
      question: "Capital of France?",
      answers: ["Berlin", "Paris", "Rome"],
      correct: "Paris",
      difficulty: 2,
    },
  ];
  
  let coins = 0;
  let currentQuestion;
  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  const coinsElement = document.getElementById("coins");
  const submitButton = document.getElementById("submitButton");
  
  // Start the game
  function startGame() {
    coins = 0;
    updateCoins();
    loadNextQuestion();
  }
  
  // Load a new question
  function loadNextQuestion() {
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    questionElement.textContent = currentQuestion.question;
  
    answersElement.innerHTML = "";
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("answer");
      button.addEventListener("click", () => checkAnswer(answer));
      answersElement.appendChild(button);
    });
  
    answersElement.scrollIntoView({ behavior: "smooth" }); // Scroll for better mobile UX
  }
  
  // Check the player's answer
  function checkAnswer(answer) {
    const answerButtons = document.querySelectorAll(".answer");
    answerButtons.forEach((button) => {
      if (button.textContent === currentQuestion.correct) {
        button.classList.add("correct");
      } else {
        button.classList.add("wrong");
      }
      button.disabled = true;
    });
  
    if (answer === currentQuestion.correct) {
      coins += currentQuestion.difficulty * 10;
      updateCoins();
    }
  
    setTimeout(loadNextQuestion, 2000);
  }
  
  // Update coins display
  function updateCoins() {
    coinsElement.textContent = coins;
  }
  
  // Add event listeners for buttons
  document.getElementById("startButton").addEventListener("click", startGame);
  submitButton.addEventListener("click", () => {
    alert(`You have earned ${coins} MindCoins!`);
    coins = 0;
    updateCoins();
  });