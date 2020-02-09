
function getJSON(url) {
    return fetch(url).then((response) => response.json());
}

const $event = document.querySelector(".event"),
      $eventTime = document.querySelector(".event-time");

async function updateEvent() {
    const _nextEvent = localStorage.nextEvent && JSON.parse(localStorage.nextEvent);
    if (_nextEvent) {
        const nextEvent = _nextEvent; // Yuk
        localStorage.nextEvent = JSON.stringify(nextEvent);
        $event.textContent = nextEvent.summary;

        const eDate = (new Date(nextEvent.start)),
              eventDate = eDate.toLocaleDateString().slice(0, -5),
              eventTime = eDate.toLocaleTimeString().split(":").slice(0, -1).join(":");
        $eventTime.textContent = eventDate + " " + eventTime;
    }

    const [ nextEvent ] = await getJSON("https://lcpt-api.herokuapp.com/api/upcomingEvents.json");

    localStorage.nextEvent = JSON.stringify(nextEvent);
    $event.textContent = nextEvent.summary;

    const eDate = (new Date(nextEvent.start)),
          eventDate = eDate.toLocaleDateString().slice(0, -5),
          eventTime = eDate.toLocaleTimeString().split(":").slice(0, -1).join(":");
    $eventTime.textContent = eventDate + " " + eventTime;
}

updateEvent();
