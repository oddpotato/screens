
async function getJSON(url) {
    const response = await fetch(url);
    return await response.json();
}

const $event = document.querySelector(".event"),
      $eventTime = document.querySelector(".event-time");

function setEventDetails(eventObject) {
    if (!eventObject) {
        $event.textContent = "not yet scheduled";
        $eventTime.textContent = "please stand by";
        return;
    }
    localStorage.nextEvent = JSON.stringify(eventObject);
    $event.textContent = eventObject.summary;
    const daysPerMillisecond = 1 / (1000 * 60 * 60 * 24),
          nowDateTime = Date.now(),
          startDateTime = new Date(eventObject.start),
          relativeMillis = startDateTime - nowDateTime,
          relativeDays = parseInt(startDateTime * daysPerMillisecond, 10)
            - parseInt(nowDateTime * daysPerMillisecond, 10),
          startDate = startDateTime.toLocaleDateString().slice(0, -5),
          startTime = startDateTime.toLocaleTimeString().split(":").slice(0, -1).join(":");
    // By default, list the date and time of the event
    let eventTimeString = startDate + " at " + startTime;
    $eventTime.textContent = eventTimeString;
    // Set up an indexable list of day names
    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    // If a more specific time can be given
    if (relativeDays < 7) {
        if (relativeDays > 1) {
            // The event is happening within a week
            eventTimeString = "on " + days[startDateTime.getDay()] + " at " + startTime;
        } else if (relativeDays === 1) {
            // The event is happening tomorrow
            eventTimeString = "tomorrow at " + startTime;
        } else if (relativeDays <= 0) {
            if (relativeMillis > 1000 * 60 * 60 * 4) {
                // Event is happening today (in more than 4 hours)
                eventTimeString = "today at " + startTime;
            } else if (relativeMillis >= 1000 * 60 * 60) {
                // Event is happening within 4 hours, but in more than 1 hour
                const hours = parseInt(relativeMillis / (1000 * 60 * 60), 10);
                eventTimeString = "in " + hours + " hour" + (hours > 1 ? "s" : "");
                setTimeout(function() {
                    // Update the display of the event details (without re-requesting the event)
                    setEventDetails(eventObject);
                }, (hours > 1 ? 1000 * 60 * 60 : relativeMillis - (1000 * 60 * 60)));
            } else {
                const minutes = parseInt(relativeMillis / (1000 * 60), 10);
                if (minutes > 0) {
                    eventTimeString = "in " + minutes + " minute" + (minutes > 1 ? "s" : "");
                    setTimeout(function() {
                        // Update the display of the event details (without re-requesting the event)
                        setEventDetails(eventObject);
                    }, 1000 * 60);
                } else if (new Date(eventObject.end) - nowDateTime < 0) {
                    eventTimeString = "this event has finished";
                } else {
                    eventTimeString = "it's happening now!";
                }
            }
        }
    }
    $eventTime.textContent = eventTimeString;
}

async function updateEvent() {
    const loadedNextEvent = localStorage.nextEvent && localStorage.nextEvent !== "undefined"
        && JSON.parse(localStorage.nextEvent);
    if (loadedNextEvent) {
        setEventDetails(loadedNextEvent);
    }
    const upcomingEvents = await getJSON("https://lcpt-api.herokuapp.com/api/upcomingEvents.json");
    let eventIndex = -1,
        nextEvent;
    do {
        eventIndex++;
        nextEvent = upcomingEvents[eventIndex];
    } while (eventIndex < upcomingEvents.length && nextEvent.summary.includes("[CANCELLED]"));
    if (eventIndex < upcomingEvents.length) {
        setEventDetails(nextEvent);
    } else {
        setEventDetails();
    }
}

updateEvent();
