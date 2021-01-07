chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({status: 'green'}, function() {
    console.log('Extension is enabled.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'twitter.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

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
