$(document).ready(function() {
    // --- our code goes here ---
    console.log("Document is ready - JS is running!");
 

  const $textarea = $('.new-tweet textarea');

$textarea.on('input', function() {
    console.log("Input event detected!"); // Add this line for debugging
    const maxLength = 140;
    const length = $(this).val().length;
    const remainingChars = maxLength - length;
    
    const $counter = $(this).siblings().find('.counter');
    console.log("Updating counter to:", remainingChars); // Debug line
    $counter.text(remainingChars);
    
    if (remainingChars < 0) {
        $counter.addClass('over-limit');
    } else {
        $counter.removeClass('over-limit');
    }
});
});