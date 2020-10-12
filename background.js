chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ 'nextFriday': nextFriday }, function () { });
});

function nextFriday() {
    var ret = new Date();
    ret.setDate(ret.getDate() + (5 - 1 - ret.getDay() + 7) % 7 + 1);
    return ret;
}