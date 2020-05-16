// On document ready
$(document).ready(function() {
    windowStartQuiz();
    // Functionality for the artificial checkboxes, works on click
    $(".check").click(function() {
        // If the box is checked
        if ($(this).attr("aria-checked") === "true" ) {
            // Calls function to activate the next button
            nextQ();
        // If the box isn't checked
        } else {
            // Check it
            $(this).parent().find('.check').attr("aria-checked", "false");
            $(this).attr("aria-checked", "true");
            // Calls function to activate the next button
            nextQ();
        }
    });
    // For accessibility, tracks the use of return/space key to replace a mouse click event, listens for key press
    $('.check').keydown(function (e) {
        var code = e.which;
        // 13 = Return, 32 = Space
        if ((code === 13) || (code === 32)) {
            // Activates original click event
            $(this).click();
        }
    });
    $('#next').click(function() {
        if ( $(this).attr('ready') === 'true' ) {
            var currentQ = parseInt($(this).attr("q"));
            if ( currentQ < 5 ) {
                var nextQ = currentQ + 1;
                $('#q' + currentQ).slideToggle();
                $('#q' + nextQ).slideToggle();
                $(this).attr('ready','false').attr('q',nextQ);
                if ( nextQ === 5 ) {
                    $('#next').text('See results');
                }
            } else {
                $('#q' + currentQ).slideToggle();
                showResults();
            }
        } else {
        }
    });
    // For accessibility, tracks the use of return/space key to replace a mouse click event, listens for key press
    $('#next').keydown(function (e) {
        var code = e.which;
        // 13 = Return, 32 = Space
        if ((code === 13) || (code === 32)) {
            // Activates original click event
            $(this).click();
        }
    });
    $('#restart').click(function() {
        $('#next').text('Next').attr('q','1').attr('ready','false').slideToggle();
        $('.check').attr('aria-checked','false');
        $('#results').slideToggle();
        $('#q1').slideToggle();
    });
    // For accessibility, tracks the use of return/space key to replace a mouse click event, listens for key press
    $('#restart').keydown(function (e) {
        var code = e.which;
        // 13 = Return, 32 = Space
        if ((code === 13) || (code === 32)) {
            // Activates original click event
            $(this).click();
        }
    });
    $('.begin').click(function() {
        if ( $(this).attr('ready') === 'false' ) {
        } else {
          beginQuiz();
        }
    });
    // For accessibility, tracks the use of return/space key to replace a mouse click event, listens for key press
    $('.begin').keydown(function (e) {
        var code = e.which;
        // 13 = Return, 32 = Space
        if ((code === 13) || (code === 32)) {
            // Activates original click event
            $(this).click();
        }
    });
    $('#close').click(function() {
        $('#next').text('Next').attr('q','1').attr('ready','false').slideToggle();
        $('.check').attr('aria-checked','false');
        $('#results').slideToggle();
        $('#q1').slideToggle();
        closeQuiz();
    });
    // For accessibility, tracks the use of return/space key to replace a mouse click event, listens for key press
    $('#close').keydown(function (e) {
        var code = e.which;
        // 13 = Return, 32 = Space
        if ((code === 13) || (code === 32)) {
            // Activates original click event
            $(this).click();
        }
    });
});
function nextQ() {
    $('#next').attr('ready','true');
}
function showResults() {
    $('#next').slideToggle();
    $('#results').slideToggle();
}
function beginQuiz() {
    $('.begin').attr('ready','false');
    $('#quiz').slideToggle();
}
function closeQuiz() {
    $('.begin').attr('ready','true');
    $('#quiz').slideToggle();
}
function getParameterByName(name, url) {
    // Gets current URL
    if (!url) url = window.location.href;
    // Some regular expression manipulation to get to the parameter we're looking for
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    // Failsafes
    if (!results) return null;
    if (!results[2]) return '';
    // Returns the parameter information
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
/* Starts quiz */
function windowStartQuiz() {
    // Retrieves quiz parameter
    var quiz = getParameterByName('start');
    // If there isn't a quiz instruction
    if (!quiz) {
        // Do nothing
        return null;
    // If there is a quiz instruction
    } else {
        $('.begin').click()
    }
}
