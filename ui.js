// On document ready
$(document).ready(function() {
    // Functionality for the artificial checkboxes, works on click
    $(".check").click(function() {
        // If the box is checked
        if ($(this).attr("aria-checked") === "true" ) {
            // Uncheck it
            $(this).attr("aria-checked", "false");
            // Calls function to update Bigfoot's happy meter (decrease it)
            //updateBigfoot(-1);
        // If the box isn't checked
        } else {
            // Check it
            $(this).attr("aria-checked", "true");
            // Calls function to update Bigfoot's happy meter (increase it)
            //updateBigfoot(1);
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
});
