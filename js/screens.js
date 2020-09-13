
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

// Schedule the page to refresh in an hour (ensures screens pull latest update to codebase)
setTimeout(() => {
    location.reload();
}, 60 * 60 * 1000);

let index = 0;

function setIframe(url) {
    document.querySelector("iframe").setAttribute("src", url);
}

function updateIframe() {
    index = (index + 1) % urls.length;
    setIframe(urls[index]);
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
    setIframe(targetURL);
}

initialize();
