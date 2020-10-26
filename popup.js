document.addEventListener('DOMContentLoaded', function() {
    var text = document.querySelector("#bin-info");
    var image = document.querySelector('#bin');
    chrome.storage.sync.get('checkState', function(items) {
        if (items.checkState) {
            text.innerHTML = "Green";
            text.style.color = "#00ac54";
            image.src = 'GreenBin.png';
        } else {
            text.innerHTML = "Yellow";
            text.style.color = "#ffc622";
            image.src = 'YellowBin.png';
        }
    });
    chrome.storage.sync.get({'nextDay' : '1'}, function(items) {
        var now = new Date();
        if (getNextDayOfWeek(items.nextDay).getDate() - 7 == now.getDate()) {
            document.querySelector("#date").innerHTML = "Today Is Bin Day (" + now.toLocaleString('en-au', { weekday: 'short', day: 'numeric', month: 'numeric' }) + ")";
        } else {
            document.querySelector("#date").innerHTML = "The Next Bin Day: " + getNextDayOfWeek(items.nextDay).toLocaleString('en-au', { day: 'numeric', month: 'numeric' }) + " (" + getNextDayOfWeek(items.nextDay).toLocaleString('en-au', { weekday: 'short' }) + ")";
        }
    });
});

function getNextDayOfWeek(dayOfWeek) {
    var d = new Date();
    d.setDate(d.getDate() + (dayOfWeek - 1 - d.getDay() + 7) % 7 + 1);
    d.setHours(23, 59, 58);
    return d;
};