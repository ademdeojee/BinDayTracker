chrome.alarms.onAlarm.addListener(function( alarm ) {
    chrome.storage.sync.get('checkState', function (items) {
        chrome.storage.sync.set({ 'checkState': !items.checkState });
    });
    chrome.storage.sync.get('nextDay', function (items) {
        //chrome.alarms.create('flip', {when : getNextDayOfWeek(items.nextDay).valueOf() });
        chrome.alarms.create('flip', {delayInMinutes : 1 });
    });
});

chrome.storage.sync.get('nextDay', function (items) {
    //chrome.alarms.create('flip', {when : getNextDayOfWeek(items.nextDay).valueOf() });
    chrome.alarms.create('flip', {delayInMinutes : 1 });
});

function getNextDayOfWeek(dayOfWeek){
    var d = new Date();
    d.setDate(d.getDate() + (dayOfWeek - 1 - d.getDay() + 7) % 7 + 1);
    d.setHours(23, 59, 58);
    return d;
};