$(document).ready(function() {

    // varibles for each screen 
    var startGame = $("#startGame");
    var gameForm = $("#multipleChoice");
    var transitionPage = $("#transitionPage");
    var endScreen = $("#endScreen");

    // turn different screens on or off for development
    startGame.show();
    gameForm.hide();
    transitionPage.hide();
    endScreen.hide();

    // variables for questions and answers
    var questions = ["Who bears the title of 'The Thunder's Roar'?",
        "What champion does NOT have a blind?",
        "What creature was Ahri before her human transformation?",
        "What little animals can we see in the Howling Abyss?",
        "Who is the most hated champion in League of Legends?"
    ];
    var answers = [
        ["Volibear", "Shyvana", "Kennen", "Rengar"],
        ["Lee Sin", "Teemo", "Sona", "Quinn"],
        ["Fox", "Poro", "Frog", "Golem"],
        ["Teemos", "Wolves", "Poros", "Cats"],
        ["Skarner", "Lulu", "Bard", "Teemo"]
    ];
    var imagearr = ["assets/images/voli.png", "assets/images/sona.png", "assets/images/ahri.png", "assets/images/poro.png", "assets/images/teemo.png"];
    var correctAnswer = [0, 2, 0, 2, 3];
    var rightAns = ["Volibear", "Sona", "Fox", "Poros", "Teemo"];
    var chosenAnswer;

    // time varibles and functions
    var countdown;
    var intervalId;
    var correct = 0;
    var wrong = 0;
    var result = "";
    // stops the current countdown
    function stop() {
        clearInterval(intervalId);
    }
    // Timer and HTML for questions
    function questionTimer() {
        startGame.hide();
        transitionPage.hide();
        endScreen.hide();
        gameForm.show();
        questionHTML();
        countdown = 15; // change question time
        $("#timeleft").html(countdown);
        intervalId = setInterval(questionCount, 1000);

        function questionCount() {
            if (countdown === 0) {
                stop();
                gameForm.hide();
                transitionPage.show();
                isWrong();
            }
            if (countdown > 0) {
                countdown--;
            }
            $("#timeleft").html(countdown);
        }
    }
    // sets up next question during transition page or else it moves onto end screen
    function transitionTimer() {
        console.log(slideCount);
        if (slideCount < 4) {
            slideCount++;
            console.log(slideCount);
            questionTimer();
        } else {
            gameForm.hide();
            transitionPage.hide();
            startGame.hide();
            endScreen.show();
            endScreenHTML();

        }
    }

    // fills up the HTML for the questions and answers
    function questionHTML() {
        $("#question").html(questions[slideCount]);
        $("#choice1").html(answers[slideCount][0]);
        $("#choice2").html(answers[slideCount][1]);
        $("#choice3").html(answers[slideCount][2]);
        $("#choice4").html(answers[slideCount][3]);
    }
    // fills up the HTML as it gets ready for next set of questions and answers
    function transitionHTML() {
        $("#result").html(result);
        if (result == "Correct!") {
            $("#result").css('color', 'lime');
        } else {
            $("#result").css('color', 'red');
        }
        $("#theAns").html(rightAns[slideCount]);
        if (slideCount < 4) {
        	$("#message").html("The next question will start shortly!");
        } else {
        	$("#message").html("You're done!")
        }
    }
    // fills up HTML to show you the results of trivia quiz
    function endScreenHTML() {
        var finalScore = Math.round((correct / questions.length) * 100);
        $("#numRight").html(correct);
        $("#numWrong").html(wrong);
        $("#percentage").html(finalScore + "%");
    }

    // From start screen, start game
    $("#startBtn").click(function() {
        slideCount = 0;
        questionTimer();
    });

    // pick from the answer choices
    $(".answer").click(function() {
        chosenAnswer = $(this).text();
        if (chosenAnswer === answers[slideCount][correctAnswer[slideCount]]) {
            stop();
            isCorrect();
        } else {
            stop();
            isWrong();
        }
    }); // end of check chosen answer

    // score functions
    function isCorrect() {
        result = "Correct!";
        imageDisplay();
        transitionHTML();
        correct++;
        gameForm.hide();
        transitionPage.show();
        setTimeout(transitionTimer, 6000); // change wait time
    } // end of isCorrect()

    function isWrong() {
        result = "Wrong!";
        imageDisplay();
        transitionHTML();
        wrong++;
        gameForm.hide();
        transitionPage.show();
        setTimeout(transitionTimer, 6000); // change wait time
    } // end of isWrong

    function imageDisplay() {
        $("#placeImage").empty().append('<img src="'+ imagearr[slideCount] +'">');
    }

    $("#resetBtn").click(function() {
        slideCount = 0;
        correct = 0;
        wrong = 0;
        resetAutomatic();
    });

    function resetAutomatic() {
        // reset variables
        var countdown;
        var intervalId;
        var result = "";
        questionTimer();

    }


}); // end of document ready