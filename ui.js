// On document ready
$(document).ready(function() {
    // Prepare event listener for links that are intended to slide the scroll to an anchorpoint
    // In case scripts are disabled on the client, the links also have hrefs
    $(".sliding-link").click(function(e) {
        // Prevent the detault hrefs from being executed
        e.preventDefault();
        // Loads the inteded destination from the href
        var dest = $(this).attr("href");
        // Animates the body scroll to the requested anchorpoint
        $('html,body').animate({scrollTop: $(dest).offset().top},'slow');
    });
    // Functionality for the artificial checkboxes, works on click
    $(".checkbox").click(function() {
        // If the box is checked
        if ($(this).attr("aria-checked") === "true" ) {
            // Uncheck it
            $(this).attr("aria-checked", "false");
            // Calls function to update Bigfoot's happy meter (decrease it)
            updateBigfoot(-1);
        // If the box isn't checked
        } else {
            // Check it
            $(this).attr("aria-checked", "true");
            // Calls function to update Bigfoot's happy meter (increase it)
            updateBigfoot(1);
        }
    });
    // For accessibility, tracks the use of return/space key to replace a mouse click event, listens for key press
    $('.checkbox').keydown(function (e) {
        var code = e.which;
        // 13 = Return, 32 = Space
        if ((code === 13) || (code === 32)) {
            // Activates original click event
            $(this).click();
        }
    });
    // On hamburger click, switches to open/close visual
    $("#hamburger-menu").click(function() {
        // If the hamburger menu is opened
        if ($(this).attr("aria-checked") === "true" ) {
            // Close it
            $(this).attr("aria-checked", "false");
            // Animate the dropdown menu (close)
            closeMenu();
        // If not
        } else {
            // Open it
            $(this).attr("aria-checked", "true");
            // Animate the dropdown menu (open)
            openMenu();
        }
    });
    // Closes the menu if a dropdown option is selected
    $("#post-header ul li a").click(function() {
        // Closes menu
        $("#hamburger-menu").attr("aria-checked", "false");
        // Animate the dropdown menu (close)
        closeMenu();
    });
    // Closes the menu if the page title is selected
    $("#logo").click(function() {
        // Closes menu
        $("#hamburger-menu").attr("aria-checked", "false");
        // Animate the dropdown menu (close)
        closeMenu();
    });
});
// Function to update Bigfoot's happy meter with an input of 1 or -1 to increase/decrease
function updateBigfoot(num) {
    var change = num;
    var current = parseInt($(".happy-meter img").attr("score"));
    // Calculates the new happiness level
    var update = current + change;
    // Loads the new image based on a naming convention that aligns with levels
    $(".happy-meter img").attr("src", "images/bigfoot-happy-" + update + ".svg");
    // Updates the "score" custom attribute to allow for future adjustments
    $(".happy-meter img").attr("score", update);
}
// Opens the dropdown from the hamburger menu
function openMenu() {
    // Disables scrolling
    $("body").css("overflow", "hidden");
    // Fills the page with the dropdown (mobile first design)
    $("#post-header").css("height", "100%");
}
// Closes the dropdown from the hamburger menu
function closeMenu() {
    // Re-enables scrolling
    $("body").css("overflow", "visible");
    // Sets the height of the dropdown back to 0
    $("#post-header").css("height", "0");
}
// Listens for user scroll
$(window).scroll(function () {
    // Rest of the function only runs if the screen is wider than the largest breakpoint (to prevent content overlap)
    if ( $( window ).width() < 800 ) {
        // Does nothing if the screen is too small, media queries in the CSS render the element invisible as well
    } else {
        // Sets timeout for scroll to see if the user has finished scrolling
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function () {
            // Calls function to determin which section the user is in
            determineScrollLocation();
        //Scroll timer value
        }, 100));
    }
});
// Function to determine scroll position; separate in case future additions also need the current scroll position
function getScrollPosition() {
    var scrollPosition = $(window).scrollTop();
    return scrollPosition;
}
// Function to determine which section the user is in
function determineScrollLocation() {
    // Changeable variable that offsets the actual offsets of each section 
    // This is so that the number changes before the section is actually at the top of the screen, which feels more natural
    var scrollOffset = 150
    // Variables to pull the locations of the different sections as well as current scroll position
    var currentScroll = getScrollPosition();
    var sectionOne = $('#section-1').offset().top - scrollOffset;
    var sectionTwo = $('#section-2').offset().top - scrollOffset;
    var sectionThree = $('#section-3').offset().top - scrollOffset;
    // Nested ifs to calculate which section the user is in
    // Depending on the outcome, runs the function updateNavBlocks passing in the current section number
    if (currentScroll > sectionOne) {
        if (currentScroll > sectionTwo) {
            if (currentScroll > sectionThree) {
                updateNavBlocks(3);
                return null;
            }
            updateNavBlocks(2);
            return null;
        }
        updateNavBlocks(1);
        return null;
    } else {
        updateNavBlocks(0);
        return null;
    }
}
// Function that updates the side page number navigation, also called the NavBlocks, with a parameter indicating the current section
function updateNavBlocks(section) {
    var num = section;
    // If the user is at the top of the page and has not yet reached #section-1
    if (num === 0) {
        // Collapse all numbers
        $('#scroll p').attr('expanded','false');
    // Otherwise
    } else {
        // Collapse all numbers
        $('#scroll p').attr('expanded','false');
        // Open current number by ID
        $('#page-' + num).attr('expanded','true');
    }
}
