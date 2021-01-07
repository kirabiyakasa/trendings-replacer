let button = document.getElementById('toggle-extension');

button.addEventListener('click', () => {
  chrome.tabs.create({url:"options.html"})
});
