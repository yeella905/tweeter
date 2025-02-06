/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const createTweetHeader = function(user) {
    const header = $("<header>");
    const name = $("<h2>");
    const icon = $("<i>");
    const headerdiv = $("<div>");
    headerdiv.addClass("user-info")
    icon.addClass("fa-regular fa-face-smile")
    name.text(user.name);
    headerdiv.append(icon);
    headerdiv.append(name);
    header.append(headerdiv);
    return header;
}

const createTweetFooter = function(day) {
    const footer = $("<footer>");
    const date = $("<span>");
    const icon = $("<span>");
    const iconReply = $("<i>");
    const iconRetweet = $("<i>");
    const iconHeart = $("<i>");
    icon.addClass("tweet-icons")
    iconReply.addClass("fa-solid fa-reply");
    iconRetweet.addClass("fa-solid fa-retweet");
    iconHeart.addClass("fa-solid fa-heart");
    icon.append(iconReply);
    icon.append(iconRetweet);
    icon.append(iconHeart);
    footer.append(date);
    footer.append(icon);
    date.text($.timeago(day));
    return footer
}


const createTweetElement = function(tweet) {
  let $tweet = $("<article>");
  $tweet.addClass("tweet")
const $header = createTweetHeader(tweet.user);
$tweet.append($header);


const tweetContent = $("<p>");
tweetContent.addClass("text");
tweetContent.text(tweet.content.text);
$tweet.append(tweetContent);
const $footer = createTweetFooter(tweet["created_at"]);
$tweet.append($footer);

return $tweet;
}


const loadtweets = function() {
  $.ajax({
    url:"/tweets",
    type:"GET",
    }).done(function(res) {
        renderTweets(res);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error(`Error fetching tweets: ${textStatus}, ${errorThrown}`);
  });
}

  const renderTweets = function(data) {
        for (let tweet in data) {
            $('#tweets-container').append(createTweetElement(data[tweet]));
        }
  }
  
  $(document).ready(function() { //when the dom is loaded find the ID tweet container and append the new created tweet
    // Test / driver code (temporary)
     loadtweets()
    // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    $( "#target" ).on( "submit", function( event ) {
        event.preventDefault();

    var tweetContent = $(this).find('textarea').val(); // Assuming you have a <textarea> inside the form for tweets

        // Validation logic
        if (!tweetContent) {
            alert("Your tweet cannot be empty.");
        return;
        }
  
        if (tweetContent.length > 140) {
            alert("Your tweet is too long. Please keep it within 140 characters.");
        return;
        }

    // Serialize the form data
    var formData = $(this).serialize();

    // Send serialized data using a POST request
    $.post('/tweets', formData, function(response) {
    console.log("Response from server:", response);
        
    // Optionally, call a function to update your tweet list with the new data
    renderTweets([response]);
    });

    alert( "Handler for `submit` called." );
    });
});
