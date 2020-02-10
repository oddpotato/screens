
function getJSON(url) {
    return fetch(url).then((response) => response.json());
}

const $event = document.querySelector(".event"),
      $eventDate = document.querySelector(".event-date"),
      $eventTime = document.querySelector(".event-time");

function setEventDetails(eventObject) {
    localStorage.nextEvent = JSON.stringify(eventObject);
    $event.textContent = eventObject.summary;
    const eventDateTime = (new Date(eventObject.start)),
          eventDate = eventDateTime.toLocaleDateString().slice(0, -5),
          eventTime = eventDateTime.toLocaleTimeString().split(":").slice(0, -1).join(":");
    $eventDate.textContent = eventDate;
    $eventTime.textContent = eventTime;
}

async function updateEvent() {
    const loadedNextEvent = localStorage.nextEvent && JSON.parse(localStorage.nextEvent);
    if (loadedNextEvent) {
        setEventDetails(loadedNextEvent);
    }
    const [ nextEvent ] = await getJSON("https://lcpt-api.herokuapp.com/api/upcomingEvents.json");
    setEventDetails(nextEvent);
}

updateEvent();
