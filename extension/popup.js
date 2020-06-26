browser.tabs.query({
  active: true,
  lastFocusedWindow: true
}).then(function(tabs) {
let url = new URL(tabs[0].url);
if (url.host != "addons.mozilla.org") {
  showMessage("This extension only works on addons.mozilla.org.");
  return;
}
let splitPath = url.pathname.split("/");
if (splitPath[3] != "addon") {
  showMessage("This extension only works on addon pages.");
  return;
}
let slug = splitPath[4];
fetch(`https://addons.mozilla.org/api/v4/addons/addon/${slug}/`)
.then((response) => {
  return response.json();
})
.then((data) => {
  document.getElementById("guid").textContent = data.guid;
  document.getElementById("url").textContent =  `https://addons.mozilla.org/firefox/downloads/latest/${slug}/latest.xpi`;
});})

document.getElementById("copy_guid").addEventListener("click", function() {
  var copyText = document.getElementById("clipboard");
  copyText.value = document.getElementById("guid").textContent;
  copyText.select();
  document.execCommand("copy");
});

document.getElementById("copy_url").addEventListener("click", function() {
  var copyText = document.getElementById("clipboard");
  copyText.value = document.getElementById("url").textContent;
  copyText.select();
  document.execCommand("copy");
});

function showMessage(message) {
  let messageElement = document.getElementById("message");
  messageElement.style.display = "block";
  messageElement.textContent = message;
  document.getElementById("addon").style.display = "none";
}