let status = "green"
let fontColor = "white";
let link = 'https://avatars1.githubusercontent.com/u/66184932?s=' + 
            '460&u=e7b985fc01bdcb4ddd3e67011e6ff4a40bcf58b1&v=4'

let main;
let trending;
let headingParent;
let trendingContainerString = '[aria-label=\"Timeline: Trending now\"]'
let eventOneCounter = 0;
let eventTwoCounter = 0;
let eventThreeCounter = 0;
let eventFourCounter;

let mutationObserver = new MutationObserver(callback);
const mutationObserver2 = new MutationObserver(callback);

function callback(mutationsList) {
  for (let mutationRecord of mutationsList) {
    if (mutationRecord.removedNodes) {
      for (let removedNode of mutationRecord.removedNodes) {
        if (removedNode.attributes['role']) {
          // load content on theme change and restore mutation observer
          if(removedNode.attributes['role'].value === "heading")

          main = document.querySelector('[role=\"main\"]');

          mutationObserver.observe(
            main,
            { attributes: true }
          )
          changeElement()
        }
      }
    }
  }
  // look for changes to content due to window resize
  mutationsList.forEach(mutation => {
    if (mutation.attributeName === 'class') {
      changeElement()
    }
  })
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'url change') {
      eventFourCounter = 0
      document.addEventListener('DOMSubtreeModified', function(event){
        if(document.querySelector(trendingContainerString) &&
          eventFourCounter < 1) {
    
          eventFourCounter++
          trending = document.querySelector(trendingContainerString);
          trending.innerHTML = "";
          changeElement()
        }
      });
    }
  }
);

// loads content
function changeElement() {
  eventTwoCounter++

  if(status == 'green' &&
    document.querySelector(trendingContainerString)) {
      trending = document.querySelector(trendingContainerString);
      trending.innerHTML =
        `<div style='text-align:center;font-size:19px;color:${fontColor};` + 
        "font-family:Helvetica;padding:10px;" +
        "border-bottom:0.5px solid rgb(56, 68, 77);'" + 
        '><b>My Waifu</b></div>' +
        '<img src=' + link + ' width=\'384\'>\"'
  };
}

document.addEventListener('DOMSubtreeModified', function(event){

  // reloads content if window is resized
  if(document.querySelector('[role=\"main\"]') && eventOneCounter < 1) {

    eventOneCounter++

    main = document.querySelector('[role=\"main\"]');
    
    mutationObserver.observe(
      main,
      { attributes: true }
    )
  }

  // observer for detecting theme change
  else if(document.querySelector('[role=\"heading\"]') &&
    eventThreeCounter < 1) {

      eventThreeCounter++

      headingParent = document.querySelector('[role=\"heading\"]').parentNode;

      mutationObserver2.observe(
        headingParent,
        { childList: true }
      )
  }
});

// loads content on page load
document.addEventListener('DOMSubtreeModified', function(event){
  if(document.querySelector(trendingContainerString) &&
    eventTwoCounter < 1) {
      trending = document.querySelector(trendingContainerString);
      trending.innerHTML = "";
      changeElement()
  }
});
