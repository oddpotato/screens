
const defaultPeriod = 10,
      urls = [
          { period: 10, url: "./dashboard.html" },
          { period: 10, url: "./cal.html" },
          { period: 10, url: "https://coronavirus.data.gov.uk/" },
          { period: 10, url: "./dashboard.html" },
          { period: 10, url: "./twitter.html" },
          //{ period: 10, url: "./dashboard.html" },
          { period: 5, url: "./bones.html" },
          { period: 5, url: "./hello.html" },
          { period: 5, url: "./joe.html" },
          //"https://www.wbstack.com",
          //"./dashboard.html",
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

// Schedule the page to refresh at every quarter hour
// If the clocks are right this should mean the screens are fairly in sync
setTimeout(() => {
    location.reload();
}, msToNextQuarterHourForRefresh());

function msToNextQuarterHourForRefresh(){
    var nextQuarter = new Date();
    var quarterHours = Math.ceil(nextQuarter.getMinutes()/15);
    var nextQuarterHours = quarterHours + 1
    if ( nextQuarterHours >= 4) {
        nextQuarter.setHours(nextQuarter.getHours()+1);
        nextQuarter.setMinutes(0,0,0);
    } else {
        nextQuarter.setMinutes((nextQuarterHours*15)%60,0,0);
    }
    var msToNextQuarter = ( nextQuarter - new Date() )
    console.log( 'Decided that the next quarter for refresh is: ' + nextQuarter )
    return msToNextQuarter
}

let index = 0;

function switchIframe(urlIndex) {
    index = urlIndex;
    var urlData = urls[urlIndex]

    var iframeForUrl = document.querySelector("iframe[src*=\""+urlData.url+"\"]");
    var otherIframes = document.querySelectorAll("iframe:not([src*=\""+urlData.url+"\"])");

    // If we have not setup this iframe yet then create it
    if( iframeForUrl === null ){
        iframeForUrl = document.createElement('iframe');
        iframeForUrl.setAttribute("src", urlData.url);
        document.body.appendChild(iframeForUrl);
    }

    // Hide the other iframes and show the one we want to
    otherIframes.forEach(iframeToHide => {
        iframeToHide.style.visibility = "hidden";
    })
    iframeForUrl.style.visibility = "";

    // Update the url footer
    document.getElementById("url-footer").innerHTML = urlData.url;

    return periodToUse(urlData);
}

function advanceIframesAndScheduleNext() {
    scheduleNext(advanceIframes())
}

function scheduleNext(period){
    if(period > 0){
        setTimeout(advanceIframesAndScheduleNext, period * 1000);
    }
}

function advanceIframes() {
    index = (index + 1) % urls.length;
    return switchIframe(index);
}

function getURLParam(parameter) {
    return new URLSearchParams(window.location.search).get(parameter);
}

function periodToUse(urlData){
    let overridePeriod = getURLParam("period");
    if (overridePeriod !== null && overridePeriod !== "") {
        return overridePeriod;
    }
    if( urlData.period ){
        return urlData.period;
    }
    return defaultPeriod;
}

function initialUrlIndex() {
    let givenURL = getURLParam("url");
    if (givenURL !== null && givenURL !== "") {
        for (var i = 0; i < urls.length; i++) {
            if( urls[i].url == givenURL ) {
                return i;
            }
        }
    }

    const givenIndex = getURLParam("index");
    if (givenIndex !== null && givenIndex !== "" && givenIndex >= 0 && givenIndex < urls.length) {
        return givenIndex;
    }

    return 0;
}

scheduleNext(switchIframe(initialUrlIndex()));

// Space advances to the next page
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        advanceIframes();
    }
}
