class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    checkAnswer(answer) {
        return this.answer === answer;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.questionIndex = 0;
    }
    getQuestion() {
        return this.questions[this.questionIndex];
    }
    isFinish() {
        return this.questionIndex >= this.questions.length;
    }
    guess(answer) {
        var question = this.getQuestion();
        if (question.checkAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }
}

let q1 = new Question(
    "What's the best programming language?",
    ["C#", "Javascript", "Python", "Java"],
    "Javascript"
);
let q2 = new Question(
    "What's the most popular language?",
    ["C++", "Javascript", "Delphi", "Java"],
    "Javascript"
);
let q3 = new Question(
    "What's the best modern programming language?",
    ["C#", "Javascript", "Python", "Visual Basic"],
    "Javascript"
);
let q4 = new Question(
    "What's the best javascript framework?",
    ["Vue.js", "React", "Angular", "Node.js"],
    "React"
);

let questions = [q1, q2, q3, q4];

var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
    if (quiz.isFinish()) {
        result = `
                <div>
                <h2>Correct Answer : ${quiz.score}</h2>
                <h2>Wrong Answer : ${quiz.questions.length - quiz.score}</h2>
                <h1 class="score">Your Score : ${
                    (100 / quiz.questions.length) * quiz.score
                }</h1>
                </div>
                `;
        document.querySelector("#body").innerHTML = result;
    } else {
        var question = quiz.getQuestion();
        var choices = question.choices;

        document.querySelector("#question").textContent =
            quiz.questionIndex + 1 + " ) " + question.text;

        for (i = 0; i < choices.length; i++) {
            var button = document.querySelector("#btn" + i);
            button.textContent = choices[i];

            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
}

function guess(id, guess) {
    var btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.guess(guess);
        loadQuestion();
    };
}

function showProgress() {
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex + 1;
    document.querySelector(
        "#footer"
    ).textContent = `Question ${questionNumber} of ${totalQuestion}`;
}
