/*global $ */

//Please copy and paste your API key between the quotes! //
// var mashAPI = "";



var quotes = {
  mashAPI: "",
  quote: "",
  title: "",
  image: "",
  getQuote: function() {
    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(data) {
      console.log(data);
      quotes.quote = data[0].content.slice(3, -5);
      quotes.title = data[0].title;
      quotes.postQuote();
      quotes.getImage();
    });
  },
  getQuoteMash: function() {
    $.ajax({
      url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
      type: "GET",
      data: {},
      datatype: 'json',
      success: function(data) {
        // console.log(data);
        quotes.quote = data.quote;
        quotes.title = data.author;
        quotes.postQuote();
        quotes.getImage();
      },
      error: function(err) { alert(err); },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", quotes.mashAPI);
      }
    });
  },
  postQuote: function() {
    document.getElementById("insertQuote").innerHTML = ('"' + quotes.quote + '"');
    document.getElementById("insertTitle").innerHTML = '- ' + quotes.title;
  },
  postImg: function() {
    console.log(quotes.image);
    document.getElementById("insertImg").src = quotes.image;

  },
  getImage: function() {
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${" + quotes.title+ "}&gpslimit=20",
      dataType: "jsonp",
      success: function(data) {
        console.log(data);
        if (data.query) {
          console.log("first if");
          for(var i=0; i<data.query.pages.length; i++){
            console.log("for loop", i);
          if(data.query.pages[i].thumbnail){
            console.log("second if");
            
          
         
            quotes.image = data.query.pages[i].thumbnail.source;
            document.getElementById("insertImg").style.display = "inline-block";
            quotes.postImg();
          break;
          }
          } 
          
        }else {
          console.log("else")
          document.getElementById("insertImg").style.display = "none";
        }
      }
    });
  },
  postTwitter: function() {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quotes.quote + '"' + '  - ' + quotes.title));
  },
  postReddit: function() {
    window.open("https://www.reddit.com/r/quotes/submit?amp;title=Quote by: " + quotes.title + "&text=" + quotes.quote);
  },
  getRandomColor: function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    document.body.style.backgroundColor = rgb;
  }
};



document.getElementById("newQuote").onclick = function() {
  quotes.getQuote();
  quotes.getRandomColor();
  document.getElementById("insertImg").style.display = "none";
  document.body.classList.remove("movie");
//   quotes.getQuote();
//   quotes.getRandomColor();
};
document.getElementById("newQuoteMash").onclick = function() {
  document.getElementById("insertImg").style.display = "none";
  document.body.classList.add("movie");
  
  quotes.getQuoteMash();
};


document.getElementById("postTwit").onclick = function() {
  quotes.postTwitter();
};
document.getElementById("postRed").onclick = function() {
  quotes.postReddit();
};

document.getElementById("submitAPI").onclick = function() {
  quotes.mashAPI = document.getElementById("inputAPI").value;
  document.getElementById("newQuoteMash").style.display = "inline-block";
  document.getElementById("APISection").style.display = "none";
  
};
window.onload = function(){
  console.log("window");
quotes.getQuote();
quotes.getRandomColor();
};