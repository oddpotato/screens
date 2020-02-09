
function getJSON(url) {
    return fetch(url).then(r => r.json());
}

const $event = document.querySelector(".event");
const $eventTime = document.querySelector(".event-time");
async function updateEvent() {
    const _nextEvent = localStorage.nextEvent && JSON.parse(localStorage.nextEvent);
    if (_nextEvent) {
        const nextEvent = _nextEvent; // yuk
        localStorage.nextEvent = JSON.stringify(nextEvent);
        $event.textContent = nextEvent.summary;

        const eDate = (new Date(nextEvent.start));
        const eventDate = eDate.toLocaleDateString().slice(0, -5);
        const eventTime = eDate.toLocaleTimeString().split(":").slice(0, -1).join(":");
        $eventTime.textContent = eventDate + " " + eventTime;
    }

    const [nextEvent] = await getJSON("https://lcpt-api.herokuapp.com/api/upcomingEvents.json");

    localStorage.nextEvent = JSON.stringify(nextEvent);
    $event.textContent = nextEvent.summary;

    const eDate = (new Date(nextEvent.start));
    const eventDate = eDate.toLocaleDateString().slice(0, -5);
    const eventTime = eDate.toLocaleTimeString().split(":").slice(0, -1).join(":");
    $eventTime.textContent = eventDate + " " + eventTime;
}
updateEvent();

const $time = document.querySelector(".time");
function updateTime() {
    const d = new Date();
    const timeString = d.toLocaleTimeString().split(":").slice(0, -1).join(":");
    $time.textContent = timeString;
}
setInterval(updateTime, 5000);
updateTime();
