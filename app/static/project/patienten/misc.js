$(document).ready(function () {
    //$("#load").fadeOut("slow");
    var ctx = document.querySelector("canvas").getContext("2d"),
    dashLen = 100, dashOffset = dashLen, speed = 6,
    txt = "Patienten", x = 0, i = 0;

    ctx.font = "50px Comic Sans MS, cursive, TSCu_Comic, sans-serif";
    ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.globalAlpha = 2 / 3;
    ctx.strokeStyle = ctx.fillStyle = "#ff0000 ";

    (function loop() {
        ctx.clearRect(x, 0, 60, 150);
        ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
        dashOffset -= speed;                                         // reduce dash length
        ctx.strokeText(txt[i], x, 90);                               // stroke letter

        if (dashOffset > 0) requestAnimationFrame(loop);             // animate
        else {
            ctx.fillText(txt[i], x, 90);                               // fill final letter
            dashOffset = dashLen;                                      // prep next char
            x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
            ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
            ctx.rotate(Math.random() * 0.005);                         // random rotation
            if (i < txt.length) requestAnimationFrame(loop);
            else {
                $("#load").delay(4000).fadeOut("slow");
            }
        }
    })();

    $(window).scroll(function(){
        if($(document).scrollTop() > 0)
        {
            $('#head').data('size', 'small');
            $('#author').fadeOut('slow')
            $('#head').stop().animate({
                height:'50pt'
            },500);
        }
    });

    // QUIZ

    (function () {




        var questions = [{
            // husk index=0

            question: "What is 2*5?",
            choices: [2, 5, 10, 15, 20],
            correctAnswer: 2
        }, {
            question: "What is 3*6?",
            choices: [3, 6, 9, 12, 18],
            correctAnswer: 4
        }, {
            question: "What is 8*9?",
            choices: [72, 99, 108, 134, 156],
            correctAnswer: 0
        }, {
            question: "What is 1*7?",
            choices: [4, 5, 6, 7, 8],
            correctAnswer: 3
        }, {
            question: "What is 8*8?",
            choices: [20, 30, 40, 50, 64],
            correctAnswer: 4
        }];







        var questionCounter = 0; //Tracks question number
        var selections = []; //Array containing user choices
        var quiz = $('#quiz'); //Quiz div object

        // Display initial question
        displayNext();

        // Click handler for the 'next' button
        $('#next').on('click', function (e) {
            e.preventDefault();

            // Suspend click listener during fade animation
            if (quiz.is(':animated')) {
                return false;
            }
            choose();

            // If no user selection, progress is stopped
            if (isNaN(selections[questionCounter])) {
                alert('Haaaallooo! Du glemte vidst nok lige at vælge sådan en ting, man kalder for et svar!');
            } else {
                questionCounter++;
                displayNext();
            }
        });

        $('#prev').on('click', function (e) {
            e.preventDefault();

            if (quiz.is(':animated')) {
                return false;
            }
            choose();
            questionCounter--;
            displayNext();
        });

        $('#start').on('click', function (e) {
            e.preventDefault();

            if (quiz.is(':animated')) {
                return false;
            }
            questionCounter = 0;
            selections = [];
            displayNext();
            $('#start').hide();
        });

        function createQuestionElement(index) {
            var qElement = $('<div>', {
                id: 'question'
            });

            var header = $('<h2>Spørgsmål ' + (index + 1) + ':</h2>');
            qElement.append(header);

            var question = $('<p>').append(questions[index].question);
            qElement.append(question);

            var radioButtons = createRadios(index);
            qElement.append(radioButtons);

            return qElement;
        }

        function createRadios(index) {
            var radioList = $('<ul>');
            var item;
            var input = '';
            for (var i = 0; i < questions[index].choices.length; i++) {
                item = $('<li>');
                input = '<input type="radio" id="opt" name="answer" value=' + i + ' />';
                input += '<label for="opt">' + questions[index].choices[i] + '</label>';
                item.append(input);
                radioList.append(item);
            }
            return radioList;
        }

        // Reads the user selection and pushes the value to an array
        function choose() {
            selections[questionCounter] = +$('input[name="answer"]:checked').val();
        }

        // Displays next requested element
        function displayNext() {
            quiz.fadeOut(function () {
                $('#question').remove();

                if (questionCounter < questions.length) {
                    var nextQuestion = createQuestionElement(questionCounter);
                    quiz.append(nextQuestion).fadeIn();
                    if (!(isNaN(selections[questionCounter]))) {
                        $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                    }

                    if (questionCounter === 1) {
                        $('#prev').show();
                    } else if (questionCounter === 0) {

                        $('#prev').hide();
                        $('#next').show();
                    }
                } else {
                    var scoreElem = displayScore();
                    quiz.append(scoreElem).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                    $('#start').show();
                }
            });
        }

        function displayScore() {
            var score = $('<p>', { id: 'question' });

            var numCorrect = 0;
            for (var i = 0; i < selections.length; i++) {
                if (selections[i] === questions[i].correctAnswer) {
                    numCorrect++;
                }
            }

            score.append('Du fik ' + numCorrect + ' ud af' +
                         questions.length + ' spørgsmål rigtigt! :D');
            return score;
        }
    })();


});