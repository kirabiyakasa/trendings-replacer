let status = "green"
let fontColor = "white";
let link = 'https://avatars1.githubusercontent.com/u/66184932?s=' + 
            '460&u=e7b985fc01bdcb4ddd3e67011e6ff4a40bcf58b1&v=4'

let trending;
let eventOneCounter = 0;
let eventTwoCounter = 0;
let eventThreeCounter;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'url change') {
      eventThreeCounter = 0
      document.addEventListener('DOMSubtreeModified', function(event){
        if(document.querySelector('[aria-label=\"Timeline: Trending now\"]') &&
          eventThreeCounter < 1) {
    
          eventThreeCounter++
          trending = document.querySelector('[aria-label=\"Timeline: Trending now\"]');
          trending.innerHTML = "";
          changeElement()
        }
      });
    }
  }
);

function changeElement() {
  eventTwoCounter++

  if(status == 'green' &&
    document.querySelector('[aria-label=\"Timeline: Trending now\"]')) {
      trending = document.querySelector('[aria-label=\"Timeline: Trending now\"]');
      trending.innerHTML =
        `<div style='text-align:center;font-size:19px;color:${fontColor};` + 
        "font-family:Helvetica;padding:10px;" +
        "border-bottom:0.5px solid rgb(56, 68, 77);'" + 
        '><b>My Waifu</b></div>' +
        '<img src=' + link + ' width=\'384\'>\"'
  };
}

document.addEventListener('DOMSubtreeModified', function(event){

  if(document.querySelector('[role=\"main\"]') && eventOneCounter < 1) {

    eventOneCounter++
    console.log(eventOneCounter)

    function callback(mutationsList) {
      mutationsList.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          changeElement()
        }
      }) 
    } 
    const mutationObserver = new MutationObserver(callback);
    let main = document.querySelector('[role=\"main\"]');
    
    mutationObserver.observe(
      main,
      { attributes: true }
    )
  }
});

document.addEventListener('DOMSubtreeModified', function(event){
  if(document.querySelector('[aria-label=\"Timeline: Trending now\"]') &&
    eventTwoCounter < 1) {
      trending = document.querySelector('[aria-label=\"Timeline: Trending now\"]');
      trending.innerHTML = "";
      changeElement()
  }
});
