document.querySelectorAll("iframe").forEach( function(iframe) {
  const url = iframe.src
  const n = url.search("https://button.like.co/in/embed/")
  if(n !== -1) {
    console.log(url)
	chrome.runtime.sendMessage({"message": url})
  }
  else{ console.log( "No Liker Coin Clap" ) }
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message)
})