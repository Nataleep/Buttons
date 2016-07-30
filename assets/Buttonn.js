$(document).ready(function() {
    // your code here

    var Science = ['Biology', 'Magnet', 'Bubbles', 'Space'];

//creates the initial buttons that are in Science array
function renderButtons(){
    $('#buttonsView').empty(); //empties the div so it doesn't repeat every button
    for (var i = 0; i < Science.length; i++){ //for the length of Science array
        
        var a = $('<button>') //creates the button
        a.addClass('typeScience'); //adds class 
        a.attr('data-name', Science[i]);
        a.text(Science[i]); //adds the name to the button
        
        $('#buttonsView').append(a); //adding it to the div to show on the page
    }

//adds the images
    $('button').on('click', function () {// when the buttons are clicked
            $('#gif').empty(); //clears previous images from div
            var Science = $(this).data('name'); //gets the name of science
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Science + "&api_key=dc6zaTOxFJmzC&limit=10"; 

        $.ajax({
            url: queryURL, method: 'GET'})
            .done(function(response) {
                console.log(response) //logs the object
                    
                var results = response.data;

        for (var i = 0; i < results.length; i++) {
                    
                    var ScienceDiv = $('<div>'); //creates ScienceDiv
                    ScienceDiv.addClass('imagestyling');
                    
                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var ScienceImage = $('<img>');

                ScienceImage.attr('data-animate', results[i].images.fixed_height.url);
                ScienceImage.attr('data-still', results[i].images.fixed_height_still.url);
                ScienceImage.attr('src', results[i].images.fixed_height_still.url);
                ScienceImage.attr('data-state', "still");

                ScienceDiv.append(p); //adds rating to the div
                ScienceDiv.append(ScienceImage); //adds the gif to the div
                ScienceImage.addClass("TheImage")
            
            $('#gif').prepend(ScienceDiv); //adds the div to the page
                    };


                     //change state when image is clicked
    $(".TheImage").on('click', function(){
        console.log("works");
            var state = $(this).attr('data-state');
                        
                if (state == 'still') {
                        //changes the data-state
                    $(this).attr('data-state',"animate" );
                            //change image to animated gif
                    $(this).attr('src', $(this).data('animate'));
                        }
                else{
                                //change to still image
                    $(this).attr('src', $(this).data('still'));
                                //changes the data-state
                    $(this).attr('data-state','still' );
                        }
                    });
                });
    });
};

renderButtons();

//adds science button
    $('#addScience').on('click', function(){

    var ScienceText = $('#input').val().trim();
        Science.push(scienceText);
        renderButtons();

    return false;
});

 });