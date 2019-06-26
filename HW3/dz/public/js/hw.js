'use strict';

function HttpRequest(url, data, METHOD = 'GET', contentType = '', callback) {
    let xhr = new XMLHttpRequest()

    xhr.open(METHOD, url, true);
    if(contentType !== '')
        xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = callback;
    xhr.send(data);
}


function onCovertFormSend(e) {
    e.preventDefault();
    e.stopPropagation();

    var activeElement = document.activeElement;
    if(activeElement.type === 'submit') {
        let str = '/' + activeElement.id + '?name=' 
            + document.forms.convertForm.elements.identificator.value;
        HttpRequest(str, '', 'GET', '', function() {
            if (this.readyState === 4 && this.status === 200) {
                alert(this.response);
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('convertForm').addEventListener('submit', onCovertFormSend);
});