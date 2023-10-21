$(document).ready(function () {
    let currentQuestion = 1;
    let score = 0;
    let feedbackShown = false;

    function showQuestion(questionNumber) {
        $(".question-container").hide();
        $(`#question${questionNumber}`).show();
        $(".feedback").empty();
        feedbackShown = false; // Reset feedbackShown flag when showing a new question.
    }

    function provideFeedback(isCorrect, selectedOption) {
        const feedback = $(`#question${currentQuestion} .feedback`);
        if (isCorrect) {
            feedback.text("Correct!").removeClass("incorrect").addClass("correct");
        } else {
            feedback.text(`Incorrect. You selected: ${selectedOption}`).removeClass("correct").addClass("incorrect");
        }
        feedbackShown = true; // Set feedbackShown flag to true after showing feedback.
    }

    function updateScore() {
        $("#score").text(score + " out of 10");
    }

    function enableNextButton() {
        $(".next-btn").prop("disabled", false);
    }

    function disableNextButton() {
        $(".next-btn").prop("disabled", true);
    }

    // Handle the "Start Quiz" button click
    $("#start").click(function () {
        const username = $("#username").val().trim();
        if (username !== "") {
            $(".user-input").hide();
            showQuestion(currentQuestion);
            enableNextButton(); // Enable "Next" button when the quiz starts
        } else {
            alert("Please enter a username.");
        }
    });

    // Handle the "Next" button click
    $(".next-btn").click(function () {
        if (currentQuestion <= 10) {
            if (feedbackShown) {
                if (currentQuestion === 10) {
                    // Show the final result and Play Again button
                    $(".question-container").hide();
                    $("#result-container").show();
                    updateScore();
                } else {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                    disableNextButton(); // Disable "Next" button for the next question
                }
            } else {
                const selectedOption = $(`#question${currentQuestion} input[type=radio]:checked`).val();
                const correctAnswer = getCorrectAnswer(currentQuestion);
                const isCorrect = selectedOption === correctAnswer;
                provideFeedback(isCorrect, selectedOption);

                if (isCorrect) {
                    score++;
                }
            }
        }
    });

    // Handle radio button change events to enable the "Next" button
    $("input[type=radio]").change(function () {
        enableNextButton();
    });

    // Handle the "Play Again" button click
    $("#play-again-button").click(function () {
        currentQuestion = 1;
        score = 0;
        updateScore();
        showQuestion(currentQuestion);
        enableNextButton();
        $(".feedback").empty();
        $("input[type=radio]").prop("checked", false); // Clear selected answers
        $("#result-container").hide();
        $("#play-again").hide();
    });

    function getCorrectAnswer(questionNumber) {
        const correctAnswers = [
            null, // Index 0 is not used
            "Melody",
            "No worries",
            "Zazu",
            "Kala",
            "New Orleans",
            "Wolves",
            "Coral",
            "Short-term memory loss",
            "Red",
            "Stitch"
        ];
        return correctAnswers[questionNumber];
    }
});

