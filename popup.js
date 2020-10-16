document.addEventListener('DOMContentLoaded', function () {
    var text = document.querySelector(".bin-info");
    chrome.storage.sync.get('checkState', function (items) {
        if (items.checkState) {
            text.innerHTML = "Green";
            text.style.color = "#388e3c";
        } else {
            text.innerHTML = "Yellow";
            text.style.color = "#fbc02d";
        }
    });
    chrome.storage.sync.get('nextDay', function (items) {
        document.querySelector(".date").innerHTML = "The next " + getNextDayOfWeek(items.nextDay).toLocaleString('en-us', {  weekday: 'long' }) + " is " + getNextDayOfWeek(items.nextDay).toLocaleString('en-us', {  month: 'long', day :'numeric'});
    });
});

function getNextDayOfWeek(dayOfWeek){
    var d = new Date();
    d.setDate(d.getDate() + (dayOfWeek - 1 - d.getDay() + 7) % 7 + 1);
    d.setHours(23, 59, 58);
    return d;
};


