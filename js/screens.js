
var urls = [
    "./dashboard.html",
    "./joe.html",
    "https://electiontechhandbook.uk",
    "./ration-club.html",
    "https://hackthepress.org",
    "./vlad.html",
    "https://gdes.app",
    "./scribe.html",
    "./ration-club.html",
    "./sheezy.html",
    "https://gived.org",
    "./mutual-dislike.html",
    "https://www.lajones21.com/4dpong",
    "./ration-club.html",
];

// Schedule the page to refresh in an hour (ensures screens pull latest update to codebase)
setTimeout(() => {
    location.reload();
}, 60 * 60 * 1000);

var index = 0;

function updateIframe() {
    var iframe = document.querySelector("iframe");
    var newIndex = (index + 1) % urls.length;
    var url = urls[index];
    index = newIndex;
    iframe.setAttribute("src", url);
}

setInterval(updateIframe, 1000 * 30);

updateIframe();
