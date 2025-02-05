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
    date.text("Tweet Date");

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
const $footer = createTweetFooter(tweet.user);
$tweet.append($footer);

return $tweet;
}

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  const renderTweets = function(tweets) {
    for (let tweet in tweets) {
        $('#tweets-container').append(createTweetElement(tweets[tweet]));

    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }



$(document).ready(function() { //when the dom is loaded find the ID tweet container and append the new created tweet
  // Test / driver code (temporary)
renderTweets(data) // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

  