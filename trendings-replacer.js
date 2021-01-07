let main;
let trending;
let headingParent;
let trendingContainerString = '[aria-label=\"Timeline: Trending now\"]'
let eventOneCounter = 0;
let eventTwoCounter = 0;
let eventThreeCounter = 0;
let eventFourCounter;

let extensionStatus;
chrome.storage.sync.get('status', function(data) {
  extensionStatus = data.status
});

let fontColor;
chrome.storage.sync.get('color', function(data) {
  if(data.color) {
    fontColor = data.color
  }
  else { // use light font by default
    fontColor = '#ffffff'
  }
});

let flavorText = 'Placeholder Text';
chrome.storage.sync.get('text', function(data) {
  if(data.text) {
    flavorText = data.text
  }
});

let imageLink;
chrome.storage.sync.get('image', function(data) {
  imageLink = data.image
});

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
          changeElement()
        }
      });
    }
  }
);

// loads content
function changeElement() {
  eventTwoCounter++

  if(extensionStatus == 'green' &&
    document.querySelector(trendingContainerString)) {
      trending = document.querySelector(trendingContainerString);
      let imageTag;
      if(imageLink != 'No Image' && imageLink != undefined) {
        imageTag = '<img src=' + imageLink + ' width=\'384\'>';
      }
      else {
        imageTag = '<div style="color:red;text-align:center;' +
        'font-family:Helvetica;font-size:19px">No Image</div>'
      }
      trending.innerHTML = "";
      trending.innerHTML =
        `<div style='text-align:center;font-size:19px;color:${fontColor};` + 
        "font-family:Helvetica;padding:10px;" +
        "border-bottom:0.5px solid rgb(56, 68, 77);'" + 
        `><b>${flavorText}</b></div>` +
        imageTag
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
      changeElement()
  }
});
