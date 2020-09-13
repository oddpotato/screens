
const defaultIndex = 0,
      defaultPeriod = 10,
      urls = [
          "./dashboard.html",
          //"https://www.wbstack.com",
          //"./dashboard.html",
          "./bones.html",
          "./dashboard.html",
          "./joe.html",
          //"https://electiontechhandbook.uk",
          //"./ration-club.html",
          //"https://hackthepress.org",
          //"./vlad.html",
          //"https://gdes.app",
          //"./scribe.html",
          //"./ration-club.html",
          //"./sheezy.html",
          //"https://gived.org",
          //"./mutual-dislike.html",
          //"https://www.lajones21.com/4dpong",
          //"./ration-club.html"
      ];

// Schedule the page to refresh in 15 mins (ensures screens pull latest update to codebase)
setTimeout(() => {
    location.reload();
}, 15 * 60 * 1000);

let index = 0;

function showIframe(url) {
    var iframeForUrl = document.querySelector("iframe[src*=\""+url+"\"]");
    var otherIframes = document.querySelectorAll("iframe:not([src*=\""+url+"\"])");

    // If we have not setup this iframe yet then create it
    if( iframeForUrl === null ){
        iframeForUrl = document.createElement('iframe');
        iframeForUrl.setAttribute("src", url);
        document.body.appendChild(iframeForUrl);
    }

    // Hide the other iframes and show the one we want to
    otherIframes.forEach(iframeToHide => {
        iframeToHide.style.visibility = "hidden";
    })
    iframeForUrl.style.visibility = "";
}

function updateIframe() {
    index = (index + 1) % urls.length;
    showIframe(urls[index]);
}

function getURLParam(parameter) {
    return new URLSearchParams(window.location.search).get(parameter);
}

function initialize() {
    let timeoutPeriod = getURLParam("period");
    if (timeoutPeriod === null || timeoutPeriod === "") {
        timeoutPeriod = defaultPeriod;
    }
    index = defaultIndex;
    let targetURL = getURLParam("url");
    if (targetURL === null || targetURL === "") {
        const givenIndex = getURLParam("index");
        if (givenIndex !== null && givenIndex !== "" && givenIndex >= 0) {
            index = givenIndex % urls.length;
        }
        targetURL = urls[index];
    }
    if (timeoutPeriod > 0) {
        setInterval(updateIframe, timeoutPeriod * 1000);
    }
    showIframe(targetURL);
}

initialize();
