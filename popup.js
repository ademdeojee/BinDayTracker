
document.addEventListener('DOMContentLoaded', function(){
    restoreOptions();
    var link = document.querySelector("#check");
    link.addEventListener('click', checkValue);
});

function checkValue(){
    var checkBox = document.querySelector("#check");
    var text = document.querySelector(".bin-info");

    chrome.storage.sync.set({'value':checkBox.checked}, function() {});

    if(checkBox.checked == true){
        text.innerHTML = "Green";
        text.style.color = "#388e3c";
    } else{
        text.innerHTML = "Yellow";
        text.style.color =  "#fbc02d";
    }
}

function restoreOptions() {
    chrome.storage.sync.get({
        value: false
    }, function (items) {
        document.querySelector("#check").checked = items.value;
        checkValue();
    });
}