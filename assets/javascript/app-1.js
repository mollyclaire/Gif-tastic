$(document).ready(function () {
    // Initial array
    var charList = ["Michael", "Dwight", "Jim", "Creed", "Oscar", "Kevin", "Andy", "Stanley", "Deangelo", "Kelly"];

    // Function for rendering the HTML to display the appropriate content
    function displayGifs() {
        var char = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=the+office+" + char + "&api_key=54LeYFO9lvGP5gxdBJg5XsqmFnCFwb38&limit=10"
        
        // Creates AJAX call for the specific button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // Looping through each set of data
            for (var i = 0; i < response.data.length; i++) {
                // Renders the rating and gif image on the page
                var gifDiv = $("<div>");
                var newImage = $("<img>");
                newImage.attr("data-state", "animate");
                newImage.attr("data-animate", response.data[i].images.fixed_height.url)
                newImage.attr("data-state", "still");
                newImage.attr("data-still", response.data[i].images.fixed_height_still.url)
                gifDiv.append(
                    $("<p>").text("Rated: " + response.data[i].rating),
                    newImage.attr("src", response.data[i].images.fixed_height_still.url)
                )
                $("#gif-view").prepend(gifDiv);
            }
            
            
        })
    }
   
    displayGifs();
    

    // Function for displaying buttons
    function renderButtons() {

        // Deleting the character buttons prior to adding new character buttons
        $("#buttons-view").empty();

        // Looping through the array of characters and generating buttons for each
        for (var i = 0; i < charList.length; i++) {
            var a = $("<button>");
            // Adding a class
            a.addClass("new");
            // Adding a data-attribute 
            a.attr("data-name", charList[i]);
            // Adding the button's text 
            a.text(charList[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(a);
        }
    }

    // Function for clicking the "submit" button
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var userText = $("#user-input").val().trim();
        charList.push(userText);
        renderButtons();
    })
    renderButtons();

    // Function for clicking on any button with the class of new
    $(document).on("click", ".new", displayGifs);
    renderButtons();

    // If an image is clicked, it will animate -- NEED HELP HERE
    $(document).on("click", "img", function(event) {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            // $(this).attr("src", $(this).attr("data-animate")); 
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
})