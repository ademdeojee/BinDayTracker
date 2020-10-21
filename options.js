document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    var link = document.querySelector("#check");
    link.addEventListener('click', function() {
        var checkBox = document.querySelector("#check");
        chrome.storage.sync.set({ 'checkState': checkBox.checked });
    });
    var link = document.querySelector("#days");
    link.onchange = function() {
        chrome.storage.sync.set({ 'nextDay': link.value });
        restoreOptions();
    };
});



function restoreOptions() {
    chrome.storage.sync.get({'nextDay' : '1'}, function(items) {
        document.querySelector("#days").value = items.nextDay;
        chrome.alarms.clearAll();
        chrome.alarms.create('flip', { when: getNextDayOfWeek(items.nextDay).valueOf() });
    });
    chrome.storage.sync.get('checkState', function(items) {
        var link = document.querySelector("#check");
        link.checked = items.checkState;
    });
}

function getNextDayOfWeek(dayOfWeek) {
    var d = new Date();
    d.setDate(d.getDate() + (dayOfWeek - 1 - d.getDay() + 7) % 7 + 1);
    d.setHours(23, 59, 58);
    return d;
};