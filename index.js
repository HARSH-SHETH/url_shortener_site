var submit  = document.querySelector("#form button");
var urlArray = [];
var urlObject = {};
var count = 0;
var urlList = document.querySelector("#urlList");
submit.addEventListener('click', function(){
  var url = document.querySelector("#form input").value;
  var request = new XMLHttpRequest();
  request.open('POST', "https://rel.ink/api/links/");
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.responseType = 'json';
  request.onload = function(){
    var data = request.response;
    if(data.url != "Enter a valid URL."){
      urlArray.push(data);
      localStorage.setItem('urls', JSON.stringify(urlArray));
      if(urlList.children.length >= 3){
          urlList.children[0].remove();
      }
          urlList.innerHTML += "<div class=\"urlListBox\">" +
          "<p>" + data.url + "</p>" +
          "<div>" +
          "<p>https://rel.link/" + data.hashid + "</p>" +
          "<button>Copy</button>" +
          "</div>";
    }
    else{
      alert("invalid url");
    }
  }
  request.send("url=" + url);
});
window.onload = function(){
  urlObject = JSON.parse(localStorage.getItem('urls'));
  var j = 0;
  for(var i = urlObject.length-1; i >= 0 && j < 3; i--){
      urlList.innerHTML += "<div class=\"urlListBox\">" +
        "<p>" + urlObject[i].url + "</p>" +
        "<div>" +
        "<p>https://rel.link/" + urlObject[i].hashid + "</p>" +
        "<button>Copy</button>" +
        "</div>";
      j++;
  }
  copyUrlToClipboard();
}
// let user copy the shortened link
function copyUrlToClipboard(){
  var shortUrl = document.querySelectorAll("#urlList button");
  for(var i = 0; i < shortUrl.length; i++){
    shortUrl[i].addEventListener("click", function(){
      for(var j = 0; j < shortUrl.length; j++){
        if(shortUrl[j].textContent == "Copied"){
          shortUrl[j].textContent = "copy";
          shortUrl[j].style.background = "hsl(180, 66%, 49%)";
        }
      }
      this.style.background = "hsl(257, 27%, 26%)"
      this.textContent = "Copied";
      var copyUrl = "https://rel.ink/" + urlObject[urlObject.length-1].hashid;
      var el      = document.createElement('textarea');
      el.value    = copyUrl;
      document.body.appendChild(el);
      el.select(); 
      document.execCommand('copy');
      document.body.removeChild(el);
    });
  }
}
