chrome.alarms.onAlarm.addListener(function( alarm ) {
    console.log("Got an alarm!", alarm);
    chrome.storage.sync.get({
        checkState: false
    }, function (items) {
        chrome.storage.sync.set({ 'checkState': !items.checkState });
        restoreOptions();
    });
    chrome.storage.sync.get('nextDay', function (items) {
        //chrome.alarms.create('flip', {when : getNextDayOfWeek(items.nextDay).valueOf() });
        chrome.alarms.create('flip', {delayInMinutes: 1});
    });
});

chrome.storage.sync.get('nextDay', function (items) {
    //chrome.alarms.create('flip', {when : getNextDayOfWeek(items.nextDay).valueOf() });
    chrome.alarms.create('flip', {delayInMinutes: 1});
});

document.addEventListener('DOMContentLoaded', function () {
    restoreOptions();
    var link = document.querySelector("#check");
    link.addEventListener('click', checkValue);
});

function checkValue() {
    var checkBox = document.querySelector("#check");
    var text = document.querySelector(".bin-info");
    chrome.storage.sync.set({ 'checkState': checkBox.checked });
    if (checkBox.checked) {
        text.innerHTML = "Green";
        text.style.color = "#388e3c";
    } else {
        text.innerHTML = "Yellow";
        text.style.color = "#fbc02d";
    }
}

function restoreOptions() {
    chrome.storage.sync.get({
        checkState: false
    }, function (items) {
        document.querySelector("#check").checked = items.checkState;
        checkValue();
    });
    chrome.storage.sync.get('nextDay', function (items) {
        document.querySelector(".date").innerHTML = "The next " + getNextDayOfWeek(items.nextDay).toLocaleString('en-us', {  weekday: 'long' }) + " is " + getNextDayOfWeek(items.nextDay).toLocaleString('en-us', {  month: 'long', day :'numeric'});
    });
}

function getNextDayOfWeek(dayOfWeek) {
    //returns next day of week if today is day of week
    var d = new Date();
    d.setDate(d.getDate() + (7-d.getDay())%7+dayOfWeek);
    return d;
}


