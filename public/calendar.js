let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedYear = document.getElementById("year");
let selectedMonth = document.getElementById("month");
let markedDay;

let months = [
    "January",
    "February",
    "Marts",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let monthAndYear = document.getElementById("monthAndYear");
createCalendar(currentMonth, currentYear);

function next() {
    if (currentMonth === 11) {
        currentYear = currentYear + 1;
    }
    currentMonth = (currentMonth + 1) % 12;
    createCalendar(currentMonth, currentYear);
    markedDay = undefined;
}

function previous() {
    if (currentMonth === 0) {
        currentYear = currentYear - 1;
        currentMonth = 11;
    } else if (currentMonth !== 0) {
        currentMonth = currentMonth - 1;
    }
    createCalendar(currentMonth, currentYear);
    markedDay = undefined;
}

function createCalendar(month, year) {
    let startDay = (new Date(year, month)).getDay();

    //Sets monday as 0 instead of sunday
    let mondayFirstDay = (startDay === 0 ? 6 : startDay - 1);

    let daysInMonth = (new Date(year, month + 1, 0)).getDate();

    // The last day of the previous month when comparing to the current month.
    let prevLastDay = (new Date(year, month, 0)).getDate();

    let calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    monthAndYear.innerHTML = months[month] + " " + year;

    let dateCounter = 1;

    for (let i = 0; i <= 5; i++) {
        let verticalRow = document.createElement("tr");

        // Days from previous month, after subtracting the first day of current month
        let prevMonthDays = prevLastDay - (mondayFirstDay - 1);
        for (let j = 0; j <= 6; j++) {
            if (i === 0 && prevMonthDays !== prevLastDay + 1) {
                let dayCell = document.createElement("td");
                let dayCellText = document.createTextNode(prevMonthDays);
                dayCell.append(dayCellText);
                verticalRow.append(dayCell);
                prevMonthDays++;
            } else if (dateCounter > daysInMonth) {
                break;
            } else {
                let dayCell = document.createElement("td");
                let dayCellText = document.createTextNode(dateCounter);
                dayCell.append(dayCellText);
                dayCell.classList.add("current");
                dayCell.onclick = function () {
                    if (markedDay !== undefined) {
                        if (markedDay !== dayCell) {
                            unMark();
                            markedDay = dayCell;
                            markedDay.style.backgroundColor = "#ffbc21";
                        } else {
                            unMark();
                        }
                    } else {
                        markedDay = dayCell;
                        markedDay.style.backgroundColor = "#ffbc21";
                    }
                };
                verticalRow.append(dayCell);
                dateCounter++;
            }
        }

        calendar.appendChild(verticalRow);
    }
}

function unMark() {
    if (markedDay !== undefined) {
        markedDay.removeAttribute("style");
        markedDay = undefined;
    }
}