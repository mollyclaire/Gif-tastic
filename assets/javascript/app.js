$(document).ready(function () {
    // Initial array
    var foodList = ["kale", "sushi", "coffee", "rose", "avocado", "tofu", "kombucha", "taco", "cocktail", "macaron"];

    // Function for rendering the HTML to display the appropriate content
    function displayFoodGifs() {
        var food = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=54LeYFO9lvGP5gxdBJg5XsqmFnCFwb38&limit=10"
        
        // Creates AJAX call for the specific food button being clicked
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
                newImage.addClass("still");
                gifDiv.append(
                    $("<p>").text("Rated: " + response.data[i].rating),
                    newImage.attr("src", response.data[i].images.fixed_height_still.url)
                )
                $("#gif-view").prepend(gifDiv);
            }
            // If an image with a class of still is clicked, it will animate -- NEED HELP HERE
            $("#still").on("click", function () {
                $("#still").attr("src", response.data.images.fixed_height.url)
            })
        })
    }
   
    displayFoodGifs();
    

    // Function for displaying buttons
    function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        $("#buttons-view").empty();

        // Looping through the array of food and generating buttons for each
        for (var i = 0; i < foodList.length; i++) {
            var a = $("<button>");
            // Adding a class
            a.addClass("food");
            // Adding a data-attribute with a value of the type of food
            a.attr("data-name", foodList[i]);
            // Adding the button's text 
            a.text(foodList[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(a);
        }
    }

    // Function for clicking the "submit" button
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var foodText = $("#food-input").val().trim();
        foodList.push(foodText);
        renderButtons();
    })
    renderButtons();

    // Function for clicking on any button with the class of food
    $(document).on("click", ".food", displayFoodGifs);
    renderButtons();


})