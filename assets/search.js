$(document).ready(function(){


$( "#submit" ).on("click", function( event ) {
  alert( "Handler for sumit called." );
  event.preventDefault();

  var baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  var apikey = "c9beeb2ff1f54bad81f07c49240a4146";
  var q = "trump";
  var beginDate = "20130101";
  var endDate = "20150101";
  // https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=c9beeb2ff1f54bad81f07c49240a4146&q=trump&begin_date=20130101&end_date=20150101&  

  var searchUrl = baseUrl + "api-key=" + apikey + "&q=" + q + 
    "&begin_date=" + beginDate + "&end_date=" + endDate;

  console.log("search Url", searchUrl);

  $.ajax({
      url: searchUrl,
      method: "GET"
    }).done(function(response){

      console.log( response);
      displayResult(response);
    });
});


function displayResult(response){
  var result = response.response;

  // filter according to input limit
  var limit = 3;


  var records = result.docs;

  for(var i=0; i < limit ; i++){
    var index = i + 1;
    var headline = records[i].headline.main;
    var author = records[i].byline.original;
    var section = records[i].section_name;
    var date = records[i].pub_date;
    var url = records[i].web_url;

    console.log (headline, author, section, date, url);

    var mainDiv = $("<div>");
    mainDiv.append( $("<label>").text(index));
    mainDiv.append( $("<h1>").text(headline));
    mainDiv.append( $("<p>").text(author));
    mainDiv.append( $("<p>").text(section));
    mainDiv.append( $("<p>").text(date));
    mainDiv.append( $("<a>").attr("href", url).text(url));

    $("#main-panel").append(mainDiv);
  }  
}


});
