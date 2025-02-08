/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//html converted
const createTweetElement = (tweet) => {
  return `
    <article class="tweet">
        <header>
            <div>
                <img src="${tweet.user.avatars}"/>
                <span>${tweet.user.name}</span>
            </div>
            <p>${tweet.user.handle}</p>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
            <p>${timeago().format(tweet.created_at)}</p>
            <div>
                <i class="fa-solid fa-reply"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
            </div>
        </footer>
    </article>
    `;
};

const loadtweets = function () {
  $.ajax({
    url: "/tweets",
    type: "GET",
  })
    .done(function (res) {
      renderTweets(res);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error(`Error fetching tweets: ${textStatus}, ${errorThrown}`);
    });
};

const renderTweets = function (data) {
  for (let tweet in data) {
    $("#tweets-container").prepend(createTweetElement(data[tweet]));
  }
};

$(document).ready(function () {
  //when the dom is loaded find the ID tweet container and append the new created tweet
  // Main function to handle DOM when ready
  loadtweets();
  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  // Handle form submission
  $("#target").on("submit", function (event) {
    event.preventDefault();

    var tweetContent = $(this).find("textarea").val().trim();

    $("#error-message").slideUp();

    if (!tweetContent) {
      $("#error-message").text("Your tweet cannot be empty.").slideDown();
      return;
    }

    if (tweetContent.length > 140) {
      $("#error-message")
        .text("Your tweet is too long. Please keep it within 140 characters.")
        .slideDown();
      return;
    }
    // Serialize the form data
    var formData = $(this).serialize();

    // Send serialized data using a POST request
    $.post("/tweets", formData, function (response) {
      console.log("Response from server:", response);

      $("#tweet-text").val("");

      // Fetch and render the updated tweets
      fetchAndRenderTweets();
    });
  });

  // Function to fetch and render tweets
  function fetchAndRenderTweets() {
    fetch("/tweets")
      .then((response) => response.json())
      .then((data) => {
        $("#tweets-container").empty();
        renderTweets(data);
      })
      .catch((error) => console.error("Error fetching tweets:", error));
  }
});
