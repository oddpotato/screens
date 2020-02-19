
async function getJSON(url) {
    const response = await fetch(url);
    return await response.json();
}

function eventIsValid(eventObject) {
    return eventObject && eventObject.summary;
}

function eventIsCancelled(eventObject) {
    return !eventIsValid(eventObject) || eventObject.summary.includes("[CANCELLED]");
}

const $event = document.querySelector(".event"),
      $eventTime = document.querySelector(".event-time");

function setEventDetails(eventObject) {
    if (!eventIsValid(eventObject)) {
        $event.textContent = "not yet scheduled";
        $eventTime.textContent = "please stand by";
        return;
    }
    localStorage.nextEvent = JSON.stringify(eventObject);
    $event.textContent = eventObject.summary;
    if (!eventObject.start) {
        if (eventIsCancelled(eventObject)) {
            $eventTime.textContent = "not happening";
        } else {
            $eventTime.textContent = "happening soon";
        }
        return;
    }
    const daysPerMillisecond = 1 / (1000 * 60 * 60 * 24),
          nowDateTime = Date.now(),
          startDateTime = new Date(eventObject.start),
          relativeMillis = startDateTime - nowDateTime,
          relativeDays = parseInt(startDateTime * daysPerMillisecond, 10)
            - parseInt(nowDateTime * daysPerMillisecond, 10),
          startDate = startDateTime.toLocaleDateString().slice(0, -5),
          startTime = startDateTime.toLocaleTimeString().split(":").slice(0, -1).join(":");
    // By default, list the date and time of the event
    let eventTimeString = startDate + " at " + startTime,
        pastTenseString = "no longer ";
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
            if (relativeMillis > 1000 * 60 * 60 * 2) {
                // Event is happening today (in more than 2 hours)
                eventTimeString = "today at " + startTime;
            } else if (relativeMillis >= 1000 * 60 * 60) {
                // Event is happening in 1-2 hours
                eventTimeString = "today at " + startTime;
                setTimeout(function() {
                    // Update the display of the event details (without re-requesting the event)
                    setEventDetails(eventObject);
                }, relativeMillis - (1000 * 60 * 60));
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
                    if (eventIsCancelled(eventObject)) {
                        eventTimeString = "this event would have finished ";
                        pastTenseString = "";
                    }
                } else {
                    eventTimeString = "it's happening now!";
                    if (eventIsCancelled(eventObject)) {
                        eventTimeString = "would have been happening now!";
                        pastTenseString = "";
                    }
                }
            }
        }
    } else {
        pastTenseString = "no longer on ";
    }
    $eventTime.textContent = eventTimeString;
    if (eventIsCancelled(eventObject)) {
        $eventTime.textContent = pastTenseString + $eventTime.textContent;
    }
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
    } while (eventIndex < upcomingEvents.length && !eventIsValid(nextEvent));
    if (eventIndex < upcomingEvents.length) {
        setEventDetails(nextEvent);
    } else {
        setEventDetails();
    }
}

updateEvent();
