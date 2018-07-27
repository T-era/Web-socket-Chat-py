(function() {
    chat.view = {
        disableAllControl: function() {
            disableAllByTagName('button');
            disableAllByTagName('intpu');
        },
        showMessage: function(name, message) {
            var outDiv = document.getElementById('output');
            var msgTr = document.createElement('tr');
            outDiv.append(msgTr);
            var th = document.createElement('th');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            msgTr.append(th);
            msgTr.append(td1);
            msgTr.append(td2);

            th.innerHTML = name;
            td1.className = 'prpt';
            td2.innerHTML = '<pre>' + message + '</pre>';

            toBottom(document.getElementById('rtable'));
        },
        sendMessage: function() {
            var msg = document.getElementById('msg');
            var message = msg.value;
            var name = document.getElementById('name').value;
            if (message) {
                chat.socket.send({ name: name, message: message});
                chat.view.showMessage(name, message);
                msg.value = '';
            }
        },
        close: function() {
            chat.socket.close();
        }
    };
    function toBottom(dom) {
        dom.scrollTop = dom.scrollHeight;
    }
    function disableAllByTagName(tagName) {
        var divs = document.getElementsByTagName(tagName);
        for (var i = 0, max = divs.length; i < max; i ++) {
            var div = divs[i];
            div.disabled = true;
        }
    }
})();
