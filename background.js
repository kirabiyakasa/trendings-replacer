chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // listen for changes to url and inform trendings-replacer.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'url change',
        url: changeInfo.url
      })
    }
  }
);
