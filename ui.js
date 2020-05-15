// On document ready
$(document).ready(function() {
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
            var nextQ = currentQ + 1;
            $('#q' + currentQ).slideToggle();
            $('#q' + nextQ).slideToggle();
        } else {
        }
    });
});
function nextQ() {
    $('#next').attr('ready','true');
}
