const calendar = document.getElementById("calendar");
const selectedDate = document.getElementById("selectedDate");
const activityInput = document.getElementById("activity");
const activityList = document.getElementById("activityList");
let selectedDay = null;
const activities = JSON.parse(localStorage.getItem("activities")) || {};

function generateCalendar() {
    for (let i = 1; i <= 30; i++) {
        const day = document.createElement("div");
        day.className = "day";
        day.textContent = i;
        day.onclick = () => selectDay(i, day);
        calendar.appendChild(day);
    }
}

function selectDay(day, element) {
    document.querySelectorAll(".day").forEach(d => d.classList.remove("selected"));
    element.classList.add("selected");
    selectedDay = day;
    selectedDate.textContent = `Atividades do dia ${day}`;
    activityInput.value = activities[day] || "";
    updateActivityList(day);
}

function saveActivity() {
    if (!selectedDay) {
        alert("Selecione um dia!");
        return;
    }
    activities[selectedDay] = activityInput.value;
    localStorage.setItem("activities", JSON.stringify(activities));
    updateActivityList(selectedDay);
}

function updateActivityList(day) {
    activityList.innerHTML = "";
    if (activities[day]) {
        const li = document.createElement("li");
        li.textContent = activities[day];
        activityList.appendChild(li);
    }
}

generateCalendar();

