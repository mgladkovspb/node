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
    //e.preventDefault();
    //e.stopPropagation();

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

function getUserList() {
    HttpRequest('/users', '', 'GET', '', function() {
        if (this.readyState === 4 && this.status === 200) {
            let data          = JSON.parse(this.response)
              , usersContainer = document.getElementById('userList');

            usersContainer.innerHTML = '';
            let ul = document.createElement('ul')
              , li;
            data.forEach((v) => {
                li = document.createElement('li');
                li.innerText = v.name + ', ' + v.age;
                ul.appendChild(li);
            });
            usersContainer.appendChild(ul);
        }
    });
}

function getHtmlContent() {
    HttpRequest('/ajax', '', 'GET', '', function() {
        if (this.readyState === 4 && this.status === 200) {
            let ajaxContainer = document.getElementById('ajax');
            ajaxContainer.innerHTML = this.response;
        }
    });
}

function getProducts() {
    HttpRequest('/products', '', 'GET', '', function() {
        if (this.readyState === 4 && this.status === 200) {
            let productsContainer = document.getElementById('productList')
              , data              = JSON.parse(this.response)
              , ul                = productsContainer.children[0];

            data.forEach((v) => {
                let li = document.createElement('li');
                li.innerHTML = v.id + ' | <span style="width: 180px; display: inline-block;">' + v.name + '</span> | ' + v.cnt;
                ul.appendChild(li);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('productList').addEventListener('scroll', function(e) { 
        if(e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight)
            getProducts();
    });
    getProducts();
});
