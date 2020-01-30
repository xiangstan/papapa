async function createTab(url) {
  return new Promise(resolve => {
    chrome.tabs.create({url: url, active: false}, async tab => {
      chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
        if (info.status === "complete" && tabId === tab.id) {
          chrome.tabs.onUpdated.removeListener(listener);
		  chrome.extension.getBackgroundPage().console.log(tab)
          resolve(tab);
        }
	  })
	})
  })
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const activeTab = tabs[0]
    let newTab = (async (tab) => await createTab(message.message))()
	chrome.tabs.sendMessage(activeTab.id, {"message": "My Message: "+message.message, newTab: newTab})
  })
});