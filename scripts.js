const apiKey = '5d576382955ff5829fc3844390db4427';
const baseAPIUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&certification_country=US&append_to_response=release_dates&sort_by=popularity.desc`;
let dataServer = [];

$(function () {
  // After the DOM has loaded, call afterGoClicked after any time the button is clicked
  $(document).ready(function(){
    $('button').click(clearButtonClicked);
    afterGoClicked();
    $('#year').on('change keyup', afterGoClicked);
    $('#genre').change(afterGoClicked);
    $('#G').change(afterGoClicked);
    $('#PG').change(afterGoClicked);
    $('#PG-13').change(afterGoClicked);
    $('#R').change(afterGoClicked);
    $("#movies").slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  })
})


function clearButtonClicked(){
  $('#year').val("");
  $('#genre').val("");
  $('#G')[0].checked = false;
  $('#PG')[0].checked = false;
  $('#PG-13')[0].checked = false;
  $('#R')[0].checked = false;

  afterDataLoaded();
}

function afterGoClicked() {

  var year = $('#year').val();

  if(isNaN(year)){
    $('#year-error').html('Please only enter numbers');
  } else {
    $('#year-error').html('');
  }

  if(year.length != 4 ){
    year="";
  }

  var genre = $('#genre').val();

  // Read the selected genre id from the select boxes and save it to a variable
  // Hint: use the JQuery .val() function on the element
  // Documentation: http://api.jquery.com/val/
   
  var certifications= [];

  if(document.getElementById('G').checked){

    certifications.push('G');
  }

  if(document.getElementById('PG').checked){

    certifications.push('PG');
  }

  if(document.getElementById('PG-13').checked){

    certifications.push('PG-13');
  }

  if(document.getElementById('R').checked){

    certifications.push('R');
  }


  var completeUrl = buildQueryString(baseAPIUrl, genre, year, certifications.join());
  
  console.log(completeUrl);

  // Read the entered year from the text box and save it to a variable
  $.getJSON(completeUrl, afterDataLoaded);
 

  // Call buildQueryString to handle building a completeUrl

  // Load the JSON from the API with completeUrl, and then call the afterDataLoaded function

}


/* Combine the baseUrl, genre, and year together to create a complete url with the
  right query parameters. Then return the url.

  Check out examples query params at https://www.themoviedb.org/documentation/api/discover
*/

function buildQueryString(baseUrl, genre, year, certification){
  return `${baseUrl}&with_genres=${genre}&primary_release_year=${year}&certification=${certification}`;
}


// Call this function with the data object that comes back from getJSON
  /* Loop over the results in the dataObject.
   HINT: use your debugger to find the name
    of the property that includes the array of results.
  */

function afterDataLoaded(data){
  // All images have this base URL
  var posterBaseUrl = "https://image.tmdb.org/t/p/w500"
  
  /* For each result:
    - Look up a corresponding img element (in order)
    - Set the img element's src tag to posterBaseUrl + the poster_path from the result movie
   */
  for(var i= 0; i < 9; i++){
   var element = $(`#movieImg${i}`);
   if(data && data.results[i] && data.results[i].poster_path ){
   element.attr('src', posterBaseUrl + data.results[i].poster_path);
   } else {
    element.attr('src', '/Users/Hilary/Documents/CodeProjects/Homework/top9-begin/film-poster-placeholder.png');
   }

  }

}
