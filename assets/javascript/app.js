$(document).ready(function () {
// Initial array of types of food
var foodList = ["kale", "sushi", "coffee", "rose", "avocado", "tofu", "kombucha", "taco", "cocktail", "macaron"];

// Function for rendering the HTML to display the appropriate content
function displayFoodGifs() {
    var food = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=54LeYFO9lvGP5gxdBJg5XsqmFnCFwb38&limit=10"

    // Creates AJAX call for the specific food button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          console.log(response.data[0].rating)
        // gifDiv.text(JSON.stringify(response));
        // var gifDiv = $("#gif-view");
        // gifDiv.append(response.rating);

        for (var i = 0; i < response.data.length; i++) {
            // var giphyPhoto = response.data[i].images.fixed_height_still.url;
            // var newImg = $("<img>");
            // newImg.attr("src", giphyPhoto);
            // $("#gif-view").prepend(newImg);
            // var rating = response.data[i].rating;
            // $("#gif-view").prepend("Rated: " + rating)
            var gifDiv = $("<div>");
            gifDiv.append(
              $("<p>").text("Rated: " + response.data[i].rating),
              $("<img>").attr("src", response.data[i].images.fixed_height_still.url)
            )
            
            $("#gif-view").prepend(gifDiv);
        }
        
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
// renderButtons();

// Function for clicking the "submit" button
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var foodText = $("#food-input").val().trim();
    foodList.push(foodText);
    renderButtons();
})
renderButtons();

$(document).on("click", ".food", displayFoodGifs);
renderButtons();

})