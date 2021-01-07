const statusRadio = document.querySelectorAll('[name="extension-status"]');
const themeRadio = document.querySelectorAll('[name="twitter-theme"]');
const flavorTextField = document.querySelector('#set-flavor-text');
const imageField = document.querySelector('#set-image');
const submitButton = document.querySelector('#options-submit');

chrome.storage.sync.get('status', function(data) {
  if(data.status === "green") {
    console.log("green")
    statusRadio[0].checked = true
    statusRadio[1].checked = false
  } else {
    console.log("red")
    statusRadio[0].checked = false
    statusRadio[1].checked = true
  }
});
chrome.storage.sync.get('color', function(data) {
  if(data.color === "#0f1419f") {
    console.log("light")
    themeRadio[0].checked = false
    themeRadio[1].checked = true
  } else {
    console.log("dark")
    themeRadio[0].checked = true
    themeRadio[1].checked = false
  }
});
chrome.storage.sync.get('text', function(data) {
  if(data.text) {
    flavorTextField.value = data.text
  }
});
chrome.storage.sync.get('image', function(data) {
  if(data.image) {
    imageField.value = data.image
  }
});

function setStatus() {
  chrome.storage.sync.get("status", function(data) {
    if(data.status) {
      chrome.storage.sync.remove('status', function() {
        console.log('Status has been removed')
      });
    }
    statusRadio.forEach(function(radio) {
      if(radio.checked === true) {
        chrome.storage.sync.set({status: radio.value}, function() {
          console.log('Status is set to ' + radio.value);
        });
      }
    });
  })
};

function setColor() {
  chrome.storage.sync.get("color", function(data) {
    if(data.color) {
      chrome.storage.sync.remove('color', function() {
        console.log('Color has been removed')
      });
    }
    themeRadio.forEach(function(radio) {
      if(radio.checked === true) {
        chrome.storage.sync.set({color: radio.value}, function() {
          console.log('Color is set to ' + radio.value);
        });
      }
    });
  })
};

function setFlavorText() {
  chrome.storage.sync.get("text", function(data) {
    if(data.text) {
      chrome.storage.sync.remove('text', function() {
        console.log('Text has been removed')
      });
    }
    if(flavorTextField.value) {
      chrome.storage.sync.set({text: flavorTextField.value}, function() {
        console.log('Text is set to ' + flavorTextField.value);
      });
    }
    else {
      chrome.storage.sync.set({text: 'Placeholder Text'}, function() {
        console.log('Text is set to ' + 'Placeholder Text');
      });
    }
  })
};

function setImage() {
  chrome.storage.sync.get("image", function(data) {
    if(data.image) {
      chrome.storage.sync.remove('image', function() {
        console.log('Image has been removed')
      });
    }
    if(imageField.value) {
      chrome.storage.sync.set({image: imageField.value}, function() {
        console.log('Image is set to ' + imageField.value);
      });
    }
    else {
      chrome.storage.sync.set({image: 'No Image'}, function() {
        console.log('Image is set to ' + 'No Image');
      });
    }
  })
};

submitButton.addEventListener('click', () => {
  setStatus()
  setColor()
  setFlavorText()
  setImage()
});
