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

var q1 = new Question("what's the best programming language?", ["C#", "Javascript", "Python", "Java"], "Javascript");
var q2 = new Question("what's the most popular language?", ["C++", "Javascript", "Delphi", "Java"], "Javascript");
var q3 = new Question("what's the best modern programming language?", ["Nodejs", "Javascript", "Python", "Visual Basic"], "Javascript");

let questions = [q1, q2, q3];


var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
    if (quiz.isFinish()) {
        result = `<h1>Your Score</h1><h2>${quiz.score}</h2>`;
        document.querySelector("#body").innerHTML = result;
    } else {
        var question = quiz.getQuestion();
        var choices = question.choices;

        document.querySelector("#question").textContent = question.text;

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
    btn.onclick = function() {
        quiz.guess(guess);
        loadQuestion();
    }
}

function showProgress() {
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex + 1;
    document.querySelector("#footer").textContent = `Question ${questionNumber} of ${totalQuestion}`;
}