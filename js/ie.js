function isOldIE() {
    var ua = navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var trident = ua.indexOf('Trident/');
    var IExplorerOldAgent;

    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        var ver =  parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    if(msie > -1 || ver < 11) {
        IExplorerOldAgent = true;
    }
    else {
        IExplorerOldAgent = false;
    }

    return IExplorerOldAgent;
}

function ieNotSuported(){

    var error_msg = document.createElement('div');

    var err_div = 'You are using an <strong>outdated</strong> browser.<br/>\n' +
                  'Please <a href="https://www.google.com/intl/he/chrome/">upgrade to latest version.</a>';

    error_msg.innerHTML = err_div;
    error_msg.id = "brw-err";

    var sp2 = document.getElementById('div-err');

    var parentDiv = sp2.parentNode;

    var err = document.createElement('div');

    err.className = 'overlay';

    err.appendChild(error_msg);

    parentDiv.insertBefore(err, sp2);
}

function checkIE() {
    if(isOldIE()){
        console.log(' ==== checkIE ====');
        ieNotSuported();
        }
}

checkIE();
