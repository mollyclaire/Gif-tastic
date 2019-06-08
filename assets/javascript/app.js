$(document).ready(function () {
// Initial array of types of food
var foodList = ["kale", "sushi", "coffee", "rose", "avocado", "tofu", "kombucha", "taco", "cocktail", "macaron"];

// Function for rendering the HTML to display the appropriate content
function displayFoodGifs() {
    var food = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=54LeYFO9lvGP5gxdBJg5XsqmFnCFwb38"

    // Creates AJAX call for the specific food button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          var gifDiv = $("#gif-view");
          gifDiv.append(response.data[0]);
          console.log(response.data[0].rating)
        // gifDiv.text(JSON.stringify(response));
        // var gifDiv = $("#gif-view");
        // gifDiv.append(response.rating);

        //   $("<p>").text("Rated: " + response.rating),
        //   $("<img>").attr("src" + response.img)
        
    
    })
}
displayFoodGifs();

// Function for displaying buttons
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    $("#buttons-view").empty();

    // Looping through the array of food
    for (var i = 0; i < foodList.length; i++) {

        // Generating buttons for each movie in the array.
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