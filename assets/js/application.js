
//Materialize Modals
$(document).on('DOMContentLoaded', () => {

    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

  $(document).ready(function(){

    $("#add-movie-btn").on("click", (event)=>{

      event.preventDefault();

        var startDate = $("#start-date-input").val().trim();
        var zipCode = $("#zip-code-input").val().trim();
        var radius = $("#radius-input").val().trim();
        var queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + startDate + "&zip=" + zipCode + "&radius=" + radius + "&api_key=h22mr6gbzmesjmx4jb5qt67b"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#movies-view").empty();
            for (var i = 0; i < 100; i++) {
            var div = $("<div class='movie_view'>");
            var title = response[i].title;
            var p = $("<p>").text(title);
            div.append(p);
            var poster = "https://cuso.tmsimg.com/" + response[i].preferredImage.uri;
            var image = $('<img>')
            image.attr('src', poster)
            div.append(image);
            $("#movies-view").append(div);

    };

    })

})
$("#add-event-btn").on("click", (event)=>{

    event.preventDefault();


    let TMapikey = "f7iOI1K6ZSelrJQmQ9kZrXMGns1biEKR";
    //default postal code
    let TMpostCode = $("#tm-zip-code-input").val().trim();

    let TMradius = $("#tm-radius-input").val().trim();
    
    let TMkeyword = "concert";
    
    let TMevents = "/discovery/v2/attractions";

    let TMsuggest = "/discovery/v2/suggest";

        console.log(TMradius)
        console.log(TMpostCode)
    let TMqueryURL = `https://app.ticketmaster.com${TMsuggest}.json?apikey=${TMapikey}&postalCode=${TMpostCode}&radius=${TMradius}&keyword=${TMkeyword}`

    $.ajax({
        url: TMqueryURL,
        method: "GET",
        dataType: "json",

      }).then(function(response) {
        console.log(response);
        let TM = response._embedded.attractions

        for (let a = 0; a < TM.length; a++){
            console.log(TM[a]);
            
            let nDiv = $("<div>");
            $("#local-events").append(nDiv);

            let nImg = $("<img>");
            nImg.attr("src", TM[a].images[0].url);

            $(nDiv).append(nImg)
        }
        
      });

    })


     
});
