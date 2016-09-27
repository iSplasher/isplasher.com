$(document).ready(function () {
    //$("#load").fadeOut("slow");
    $("#main").hide()


    setTimeout(function () {
        $("#load").delay(4000).fadeOut("slow");
        $("#main").delay(4500).fadeIn("slow");
        $('#author').delay(6500).fadeOut()
        $('#head').delay(6500).stop().animate({
            height: '80pt'
        }, 700);
        $('#about').stop().animate({
            marginTop: '50pt'
        }, 700);
    }, 5000);

    $("a[data-toggle]").on("click", function (e) {
        e.preventDefault(); 
        var selector = $(this).data("toggle");
        $('html, body').animate({
            scrollTop: $(selector).offset().top
        }, 1200);
    });

    $("#analysebutton").on("click", function (e) {
        e.preventDefault();
        $('#analyseContainer').fadeIn("slow");
    });

    /// ANALYSE

    //var controller = new ScrollMagic.Controller({ container: "#analyse" });

    //var wipeAnimation = new TimelineMax()
    //    .fromTo("section.en", 1, { x: "-100%" }, { x: "0%", ease: Linear.easeNone })
    //    .fromTo("section.to", 1, { x: "100%" }, { x: "0%", ease: Linear.easeNone })
    //    .fromTo("section.tre", 1, { x: "-100%" }, { x: "0%", ease: Linear.easeNone });

    //new ScrollMagic.Scene({
    //    triggerElement: "#analyseContainer",
    //    triggerHook: "onLeave",
    //    duration: "300%"
    //    })
    //    .setPin("#analyseContainer")
    //    .setTween(wipeAnimation)
    //    .addIndicators()
    //    .addTo(controller);


    // QUIZ

    $("#quizbutton").on("click", function (e) {
        e.preventDefault();
        $('#modal').fadeIn("slow");
    });

    $("#modal").on("click", function (e) {
        if(e.target.id == "modal") {
            $("#modal").hide();
        }
    });

    (function () {

        var questions = [{
            // husk index=0

            question: "Hvilken novellesamling var novellen ‘Pantienten’ en del af?",
            choices: ["Radiator", "Eftersøgning", "Hospitalet"],
            correctAnswer: 1
        }, {
            question: "I hvilket år blev Peter Seeberg født?",
            choices: ["1894", "1913", "1925", "1941"],
            correctAnswer: 2
        }, {
            question: "Hvilken kunstperiode skrev Peter Seeberg i?",
            choices: ["Modernismen", "Ekspressionismen", "Naturalismen", "Romantikken", "Eksistentialisme"],
            correctAnswer: 0
        }, {
            question: "Hvilket job havde Peter Seeberg i 33 år, udover sit forfatterskab?",
            choices: ["Skomager", "Præst", "Museumsinspektør", "Han havde intet andet job"],
            correctAnswer: 2
        }, {
            question: "Hvilke tekst af Peter Seeberg bragte popularitet til hans forfatterskab?",
            choices: ["Polterabend", "Patienten", "Bipersonerne"],
            correctAnswer: 2
        }, {
            question: "Hvilket miljø befinder karakteren i novellen ‘Patienten’ sig i?",
            choices: ["Hospital", "I sit hjem", "Hovedpersonen er død"],
            correctAnswer: 0
        }, {
            question: "I hvilket år blev novellen ‘Patienten’ skrevet i?",
            choices: ["1914", "1925", "1953", "1962"],
            correctAnswer: 3
        }, {
            question: "Hvor er Peter Seeberg født?",
            choices: ["Skrydstrup", "Aarhus", "Odense", "Fredericia"],
            correctAnswer: 0
        }, {
            question: "Hvordan havde Peter Seeberg det med religion?",
            choices: ["Han var vokset op i en kristent familie", "Han var var ateist", "Han var strengt imod religion"],
            correctAnswer: 0
        }, {
            question: "Hvilken forfatter gruppe tilhørte Peter Seeberg i 60’e rne?",
            choices: ["Traditionalisterne der skrev prosa", "Traditionalisterne der skrev lyrik", "Eksperimentalisterne", "Folkeviserne"],
            correctAnswer: 2
        }, {
            question: "Hvad skrev eksperimentalisterne især om? ",
            choices: ["Om det enkelte menneskes virkelighed i en verden uden religiøst grundlag", "Om religion; om gud og kristendommen", "Om samfundet og deres politiske ideologier", "Om historie; især om 2. verdenskrig."],
            correctAnswer: 0
        }];

        var questionCounter = 0; //Tracks question number
        var selections = []; //Array containing user choices
        var quiz = $('#quiz'); //Quiz div object

        displayNext();

        $('#next').on('click', function (e) {
            e.preventDefault();

            if (quiz.is(':animated')) {
                return false;
            }
            choose();

            if (isNaN(selections[questionCounter])) {
                alert('Haaaallooo! Du glemte vidst nok lige at vælge et svar!');
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
                input += '<div class="check"><div class="inside"></div></div>'
                item.append(input);
                radioList.append(item);
            }
            return radioList;
        }

        function choose() {
            selections[questionCounter] = +$('input[name="answer"]:checked').val();
        }

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

            score.append('Du fik ' + numCorrect + ' ud af ' +
                         questions.length + ' spørgsmål rigtige! :D');
            return score;
        }
    })();


    // TIMELINE

    var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 250;

    (timelines.length > 0) && initTimeline(timelines);

    function initTimeline(timelines) {
        timelines.each(function () {
            var timeline = $(this),
				timelineComponents = {};
            //cache timeline components 
            timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
            timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
            timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
            timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
            timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
            timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
            timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
            timelineComponents['eventsContent'] = timeline.children('.events-content');

            //assign a left postion to the single events along the timeline
            setDatePosition(timelineComponents, eventsMinDistance);
            //assign a width to the timeline
            var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance-120);
            //the timeline has been initialize - show it
            timeline.addClass('loaded');

            //detect click on the next arrow
            timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'next');
            });
            //detect click on the prev arrow
            timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'prev');
            });
            //detect click on the a single event - show new event content
            timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
                event.preventDefault();
                timelineComponents['timelineEvents'].removeClass('selected');
                $(this).addClass('selected');
                updateOlderEvents($(this));
                updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
                updateVisibleContent($(this), timelineComponents['eventsContent']);
            });

            //on swipe, show next/prev event content
            timelineComponents['eventsContent'].on('swipeleft', function () {
                var mq = checkMQ();
                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
            });
            timelineComponents['eventsContent'].on('swiperight', function () {
                var mq = checkMQ();
                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
            });

            //keyboard navigation
            $(document).keyup(function (event) {
                if (event.which == '37' && elementInViewport(timeline.get(0))) {
                    showNewContent(timelineComponents, timelineTotWidth, 'prev');
                } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
                    showNewContent(timelineComponents, timelineTotWidth, 'next');
                }
            });
        });
    }

    function updateSlide(timelineComponents, timelineTotWidth, string) {
        //retrieve translateX value of timelineComponents['eventsWrapper']
        var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
        //translate the timeline to the left('next')/right('prev') 
        (string == 'next')
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
    }

    function showNewContent(timelineComponents, timelineTotWidth, string) {
        //go from one event to the next/previous one
        var visibleContent = timelineComponents['eventsContent'].find('.selected'),
			newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

        if (newContent.length > 0) { //if there's a next/prev event - show it
            var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

            updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
            updateVisibleContent(newEvent, timelineComponents['eventsContent']);
            newEvent.addClass('selected');
            selectedDate.removeClass('selected');
            updateOlderEvents(newEvent);
            updateTimelinePosition(string, newEvent, timelineComponents);
        }
    }

    function updateTimelinePosition(string, event, timelineComponents) {
        //translate timeline to the left/right according to the position of the selected event
        var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
        var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < -timelineTranslate)) {
            translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
        }
    }

    function translateTimeline(timelineComponents, value, totWidth) {
        var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
        value = (value > 0) ? 0 : value; //only negative translate value
        value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
        setTransformValue(eventsWrapper, 'translateX', value + 'px');
        //update navigation arrows visibility
        (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
        (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
    }

    function updateFilling(selectedEvent, filling, totWidth) {
        //change .filling-line length according to the selected event
        var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
        eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
        var scaleValue = eventLeft / totWidth;
        setTransformValue(filling.get(0), 'scaleX', scaleValue);
    }

    function setDatePosition(timelineComponents, min) {
        var interval = 20;
        for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
            timelineComponents['timelineEvents'].eq(i).css('left', interval + 'px');
            interval += min*1.2
        }
    }

    function setTimelineWidth(timelineComponents, width) {
        var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
			timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm * width;
        timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
        updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
        updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

        return totalWidth;
    }

    function updateVisibleContent(event, eventsContent) {
        var eventDate = event.data('date'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
			selectedContentHeight = selectedContent.height();

        if (selectedContent.index() > visibleContent.index()) {
            var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
        } else {
            var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
        }

        selectedContent.attr('class', classEnetering);
        visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
            visibleContent.removeClass('leave-right leave-left');
            selectedContent.removeClass('enter-left enter-right');
        });
        eventsContent.css('height', selectedContentHeight + 'px');
    }

    function updateOlderEvents(event) {
        event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
    }

    function getTranslateValue(timeline) {
        var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");

        if (timelineTranslate.indexOf('(') >= 0) {
            var timelineTranslate = timelineTranslate.split('(')[1];
            timelineTranslate = timelineTranslate.split(')')[0];
            timelineTranslate = timelineTranslate.split(',');
            var translateValue = timelineTranslate[4];
        } else {
            var translateValue = 0;
        }

        return Number(translateValue);
    }

    function setTransformValue(element, property, value) {
        element.style["-webkit-transform"] = property + "(" + value + ")";
        element.style["-moz-transform"] = property + "(" + value + ")";
        element.style["-ms-transform"] = property + "(" + value + ")";
        element.style["-o-transform"] = property + "(" + value + ")";
        element.style["transform"] = property + "(" + value + ")";
    }

    //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    function parseDate(events) {
        var dateArrays = [];
        events.each(function () {
            var singleDate = $(this),
				dateComp = singleDate.data('date').split('T');
            if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
                var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
            } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
                var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
            } else { //only DD/MM/YEAR
                var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
            }
            var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
            dateArrays.push(newDate);
        });
        return dateArrays;
    }

    function daydiff(first, second) {
        return Math.round((second - first));
    }

    function minLapse(dates) {
        //determine the minimum distance among events
        var dateDistances = [];
        for (i = 1; i < dates.length; i++) {
            var distance = daydiff(dates[i - 1], dates[i]);
            dateDistances.push(distance);
        }
        return Math.min.apply(null, dateDistances);
    }

    /*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
    }

    function checkMQ() {
        //check if mobile or desktop device
        return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
    }

});