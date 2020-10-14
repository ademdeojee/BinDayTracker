
document.addEventListener('DOMContentLoaded', function () {
    restoreOptions();
    var link = document.querySelector("#days");
    link.onchange = function (){
        chrome.storage.sync.set({'nextDay' : link.value});
        restoreOptions();
    };
});

function restoreOptions() {
    chrome.storage.sync.get('nextDay', function (items) {
        document.querySelector("#days").value = items.nextDay;
    });
}
