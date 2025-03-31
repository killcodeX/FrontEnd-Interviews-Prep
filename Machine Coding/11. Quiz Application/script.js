class Quiz {
  constructor() {
    this.quizCont = document.querySelector(".quiz-container");
    this.scrollCounter = document.querySelector(".quiz-scroll-counter");
    this.idx = 0;
    this.questions = [];
    this.isTransitioning = false;
    this.canScroll = true;
    this.lastDirection = null;

    // Track user answers
    this.userAnswers = {};

    this.init();

    document.addEventListener("wheel", (e) => this.handleScroll(e));

    document.addEventListener("touchstart", (e) => {
      this.touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", (e) => {
      if (!this.canScroll) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = this.touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.navigateQuiz("down");
        } else {
          this.navigateQuiz("up");
        }
      }
    });
  }

  async init() {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy"
      );
      const { results } = await response.json();
      this.questions = results;
      this.buildLayout(results);

      // Setup answer selection event delegation
      this.quizCont.addEventListener("click", (e) =>
        this.handleAnswerSelection(e)
      );
    } catch (err) {
      console.error(err);
    }
  }

  buildLayout(data) {
    data.forEach((item, index) => {
      const container = document.createElement("div");
      container.classList.add("quiz-steps");
      container.dataset.questionId = index;
      container.append(this.addQuiz(item, index));
      this.quizCont.append(container);

      if (this.idx === index) {
        container.classList.add("active");
      }

      const counter = document.createElement("div");
      counter.classList.add("counter-steps");
      if (this.idx === index) {
        counter.classList.add("active");
      }
      this.scrollCounter.append(counter);
    });
  }

  addQuiz(item, index) {
    const quizBody = document.createElement("div");
    quizBody.classList.add("quiz-body");

    quizBody.innerHTML = `
        <h3>Question ${index + 1}</h3>
        <p>${item.question}</p>
        <div class="answers">
          ${this.buildAnswers(item, index)}
        </div>
      `;

    return quizBody;
  }

  buildAnswers(item, questionIndex) {
    // Combine and shuffle answers
    const answers = [...item.incorrect_answers, item.correct_answer].sort(
      () => Math.random() - 0.5
    );

    // Store the correct answer for scoring later
    this.questions[questionIndex].correctAnswer = item.correct_answer;

    return answers
      .map(
        (answer) => `
        <div class="answer-option" data-value="${answer}" data-question-id="${questionIndex}">
          ${answer}
        </div>
      `
      )
      .join("");
  }

  handleScroll(e) {
    if (!this.canScroll || this.isTransitioning) return;

    if (e.deltaY > 0) {
      this.navigateQuiz("down");
    } else {
      this.navigateQuiz("up");
    }

    this.canScroll = false;
    this.detectScrollStop();
  }

  detectScrollStop() {
    setTimeout(() => {
      const checkForScrollReset = (e) => {
        if (
          e.deltaY === 0 ||
          (this.lastDirection === "down" && e.deltaY < 0) ||
          (this.lastDirection === "up" && e.deltaY > 0)
        ) {
          this.canScroll = true;
          document.removeEventListener("wheel", checkForScrollReset);
        }
      };

      document.addEventListener("wheel", checkForScrollReset);
    }, 100);
  }

  navigateQuiz(direction) {
    this.lastDirection = direction;

    if (direction === "down" && this.idx >= this.questions.length - 1) {
      this.canScroll = true;
      // Optional: Show results if at the end
      if (this.idx === this.questions.length - 1) {
        this.showResults();
      }
      return;
    }

    if (direction === "up" && this.idx <= 0) {
      this.canScroll = true;
      return;
    }

    this.isTransitioning = true;

    this.idx = direction === "down" ? this.idx + 1 : this.idx - 1;

    const quizSteps = document.querySelectorAll(".quiz-steps");
    quizSteps.forEach((step, index) => {
      step.classList.remove("active");
      if (index === this.idx) {
        step.classList.add("active");
      }
    });

    const counterSteps = document.querySelectorAll(".counter-steps");
    counterSteps.forEach((step, index) => {
      step.classList.remove("active");
      if (index === this.idx) {
        step.classList.add("active");
      }
    });

    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  // Handle answer selection
  handleAnswerSelection(e) {
    const answerOption = e.target.closest(".answer-option");
    if (!answerOption) return;

    const questionId = answerOption.dataset.questionId;
    const selectedValue = answerOption.dataset.value;

    // Store the user's answer
    this.userAnswers[questionId] = selectedValue;

    // Update visual state of all answers for this question
    const allAnswersForQuestion = document.querySelectorAll(
      `.answer-option[data-question-id="${questionId}"]`
    );
    allAnswersForQuestion.forEach((answer) => {
      answer.classList.remove("selected");
    });

    // Mark this answer as selected
    answerOption.classList.add("selected");

    // Update the counter to show question has been answered
    const counterStep = document.querySelectorAll(".counter-steps")[questionId];
    counterStep.classList.add("answered");

    // Optional: Auto-advance to next question after selection
    // setTimeout(() => this.navigateQuiz("down"), 800);
  }

  // Show results when quiz is complete
  showResults() {
    // Create results screen
    const resultsContainer = document.createElement("div");
    resultsContainer.classList.add("quiz-steps", "results");

    let correctCount = 0;

    // Calculate score
    Object.keys(this.userAnswers).forEach((questionId) => {
      const userAnswer = this.userAnswers[questionId];
      const correctAnswer = this.questions[questionId].correctAnswer;

      if (userAnswer === correctAnswer) {
        correctCount++;
      }
    });

    // Create results content
    const resultsBody = document.createElement("div");
    resultsBody.classList.add("quiz-body", "results-body");

    resultsBody.innerHTML = `
        <h2>Quiz Results</h2>
        <p>You got ${correctCount} out of ${
      this.questions.length
    } questions correct!</p>
        <div class="score-percentage">${Math.round(
          (correctCount / this.questions.length) * 100
        )}%</div>
        <button class="restart-quiz">Restart Quiz</button>
      `;

    resultsContainer.append(resultsBody);
    this.quizCont.append(resultsContainer);

    // Add restart button functionality
    const restartButton = resultsBody.querySelector(".restart-quiz");
    restartButton.addEventListener("click", () => {
      location.reload(); // Simple way to restart
    });

    // Show results screen
    const quizSteps = document.querySelectorAll(".quiz-steps");
    quizSteps.forEach((step) => {
      step.classList.remove("active");
    });
    resultsContainer.classList.add("active");
  }
}

new Quiz();
