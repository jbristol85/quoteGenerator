/*global $ */

var mashAPI = "";
var quotes = {
  quote: "",
  title: "",
  image: "",
  getQuote: function() {
    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(data) {
      console.log(data);
      quotes.quote = data[0].content;
      quotes.title = data[0].title;
      quotes.postQuote();
      quotes.getImage();
    });
  },
  getQuoteMash: function() {
    $.ajax({
      url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
      type: "GET",
      data: {},
      datatype: 'json',
      success: function(data) {
        console.log(data);
        quotes.quote = data.quote;
        quotes.title = data.author;
        quotes.postQuote();
        quotes.getImage();
      },
      error: function(err) { alert(err); },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", mashAPI);
      }
    });
  },
  postQuote: function() {
    document.getElementById("insertQuote").innerHTML = quotes.quote;
    document.getElementById("insertTitle").innerHTML = quotes.title;
  },
  postImg: function() {
    console.log(quotes.image);
    document.getElementById("insertImg").src = quotes.image;

  },
  getImage: function() {
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${" + quotes.title + "}&gpslimit=20",
      dataType: "jsonp",
      success: function(data) {
        console.log(data);
        if (data.query) {
          if (data.query.pages[0].hasOwnProperty("thumbnail")) {
            quotes.image = data.query.pages[0].thumbnail.source;
            document.getElementById("insertImg").style.display = "inline-block";
            quotes.postImg();
          }
        }
        else {
          document.getElementById("insertImg").style.display = "none";
        }
      }
    });
  },
  postTwitter: function(){
    var slicedQuote = quotes.quote.slice(3,-5);
    // console.log(slicedQuote);
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"'+slicedQuote+'"'+ '  - '+quotes.title));
  },
  postReddit: function(){
    var slicedQuote = quotes.quote.slice(3,-5);
    window.open('https://www.reddit.com/r/quotes/submit?amp;title=Quote by: '+quotes.title+"&text="+slicedQuote);
    
  }
};



document.getElementById("newQuote").onclick = function() {
  document.getElementById("insertImg").style.display = "none";
  document.getElementById("postTwit").style.display = "inline-block";
  document.getElementById("postRed").style.display = "inline-block";
  quotes.getQuote();
};

document.getElementById("postTwit").onclick = function(){
  quotes.postTwitter();
};
document.getElementById("postRed").onclick = function(){
  quotes.postReddit();
};
