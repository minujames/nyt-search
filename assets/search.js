$(document).ready(function(){


$( "#submit" ).on("click", function( event ) {
  // alert( "Handler for sumit called." );
  event.preventDefault();

  var baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  var apikey = "c9beeb2ff1f54bad81f07c49240a4146";
  
  var q =  $("#search-term").val().trim();     
  var beginDate = $("#start-year").val().trim();     //"20130101";
  var endDate =  $("#end-year").val().trim();      //"20150101";

  console.log(q, beginDate, endDate);

  if(q === undefined || q === ''){

    console.log("Please enter all the inputs");
    $("#main-panel").html("Please enter all the inputs");
    return;
  }

  // https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=c9beeb2ff1f54bad81f07c49240a4146&q=trump&begin_date=20130101&end_date=20150101&  

  var searchUrl = baseUrl + "api-key=" + apikey + "&q=" + q;

  if(beginDate !== "" && beginDate !== undefined){
    beginDate = beginDate + "0101";
    searchUrl += "&begin_date=" + beginDate;
  }
  if(endDate !== "" && endDate != undefined){
    endDate =  endDate +"1231"; 
    searchUrl += "&end_date=" + endDate;
  }


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

  var records = result.docs;
  
  var limit = $("#num-records").val().trim();

  $("#main-panel").empty();

  for(var i=0; i < limit ; i++){
    var index = i + 1;

    // hasOwnProperty()

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
