
document.addEventListener('DOMContentLoaded', function () {
    restoreOptions();
    var link = document.querySelector("#check");
    link.addEventListener('click', checkValue);
});

function checkValue() {
    var checkBox = document.querySelector("#check");
    var text = document.querySelector(".bin-info");

    chrome.storage.sync.set({ 'checkState': checkBox.checked });

    if (checkBox.checked == true) {
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
}

function getNextDayOfWeek(dayOfWeek) {
    //returns today if today is day of week
    var d = new Date();
    d.setDate(d.getDate() + ((7-d.getDay())%7+dayOfWeek) % 7);
    return d;
}