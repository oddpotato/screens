
const $time = document.querySelector(".time");

function updateTime() {
    $time.textContent = new Date().toLocaleTimeString().split(":").slice(0, -1).join(":");
}

updateTime();

setInterval(updateTime, 5000);
