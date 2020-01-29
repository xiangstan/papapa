function getTabs(id, url) {
  chrome.tabs.query({url: url}, function(tabs) {
    chrome.tabs.sendMessage(id, {"message": "My Message: "+encodeURI(url), newTab: tabs})
  });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const activeTab = tabs[0]
    const myTime=new Date()
	chrome.tabs.create({url: message.message, active: false})
	const newTab=getTabs(activeTab.id, message.message)
  })
});