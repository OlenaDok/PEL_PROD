var myBill = angular.module('myBill');
var testdata = checkBillData('bill_total');
function checkBillData(elementID) {
    var data = document.getElementById(elementID);
    var result = data.innerHTML.replace(/ /g, "").replace(/\n/g, "").replace(/\t/g, "");
    try {
        JSON.parse((result));
    } catch (err) {
        return false;
    }
    return true;
}
if (testdata) {
    var bill_total = document.getElementById('bill_total');
    var Totbill = JSON.parse(prepareData(bill_total.innerHTML));
    var add_info_str = document.getElementById('add_info').innerHTML;
    myBill.controller('SubsDetails', function ($scope, $sce, ChartService ) {
        var onpageIn , onPageOut;
        var  partToOpen = {} ;
        partToOpen.status = false;
        var partsOne;
        var icont;
        var varUseIN, varUseOUT;
        var checkBox = document.getElementById("collapsible");
        var payment = document.getElementById('payment');
        var currBill = 0;
        let loaded = false;
        var windowWidth = window.innerWidth;
        let arrIMSGs;

        $scope.displayAbs = {
            value : true
        };
        $scope.mobil = windowWidth < 640;
        $scope.billlist = Totbill.bill;
        var indIData;
        $scope.showIn = function (value, index) {
            if (value === 'in' &&  $scope.indUseIn === 1 ){
                document.getElementById("usein").classList.add('slt-btn');
                document.getElementById("useout").classList.remove('slt-btn');
                $scope.objectToDisplay =  getUsage( $scope.billselected, index, value);
                if (!onpageIn){
                    ChartService.loadChart();
                    loaded = true;
                    onPageOut = !onPageOut;
                    onpageIn = !onpageIn;
                }
            }
            if (value === 'out' && $scope.indUseOUT===1 ){
                document.getElementById("useout").classList.add('slt-btn');
                document.getElementById("usein").classList.remove('slt-btn');
                $scope.objectToDisplay =  getUsage(  $scope.billselected, index, value);
                if (!onPageOut){
                    ChartService.loadChart();
                    loaded = true;
                    onpageIn = !onpageIn;
                    onPageOut = !onPageOut;
                }
            }
            if (!loaded){
                ChartService.loadChart();
                loaded = true;
            }
        }
        $scope.showData = function (index) {
            var indexElem = document.getElementById("$index");
            partToOpen.index = index;
        }
        $scope.toggleDisplay = function(index) {
            $scope.part = index;
            if ( $scope.showp2  === index ){
                $scope.showp2  = -index ;
            }
            else {
                $scope.showp2 = index ;
            }
            partsOne =  document.getElementsByClassName("part1");
            var singlePart = partsOne[index];
            var idiv = singlePart.getElementsByTagName('iplus');
            var isCurrState = idiv[0].classList[0];
            var partsTwo, singlePartTwo, secdev;
            if (isCurrState === 'plus') {
                idiv[0].classList.remove("plus");
                idiv[0].classList.toggle("minus");
                partsTwo =  document.getElementsByClassName("part2");
                singlePartTwo = partsTwo[index];
                secdev = singlePartTwo.getElementsByTagName('secdev');
                singlePartTwo.classList.remove("hide");
            }
            if (isCurrState === 'minus') {
                idiv[0].classList.remove("minus");
                idiv[0].classList.toggle("plus");
                partsTwo =  document.getElementsByClassName("part2");
                singlePartTwo = partsTwo[index];
                secdev = singlePartTwo.getElementsByTagName('secdev');
                singlePartTwo.classList.toggle("hide");
            }
        }
        $scope.part2 = function(param){
            var to_return;
            partToOpen.index = param;
            if($scope.part === partToOpen.index){
                to_return = !partToOpen.status;
            }else {
                return to_return = false;
            }
            partToOpen.status = to_return;
            return to_return;
        }
        $scope.showP2 = function(index, part, status) {
            var to_return;
            partToOpen.status = true;
            if (partToOpen.index === part && partToOpen.status === true){
                partToOpen.status = !partToOpen.status;
                $scope.status = 1;
                return true;
            }
            if (index !== part ){
                $scope.status = 0;
                to_return = false;
            }else {
                to_return = false;
                partToOpen.status = !partToOpen.status;
            }
            return to_return;
        }
        $scope.start = function() {
            onpageIn = true;
            onPageOut = false;
            partToOpen.index = 0;
            checkBox.checked = false;
            payment.style.display = 'flex';
            icont = new Array();
            $scope.MB = false;
            $scope.AMB = false;
            // $scope.billselected = Totbill.bill[0];
            /* $scope.useFilter = 'in';*/
            $scope.showp2 = -1;
            $scope.getdetails(0);
            $scope.displayAbs.value = true;
        }
        $scope.getdetails = function (index) {
            currBill = index;
            var obj = Totbill.bill[index];
            $scope.parts = obj.bill_parts;
            $scope.services = obj.services;
            $scope.msgbox = obj.msgbox;
            $scope.billselected = Totbill.bill[index];
            this.usageAll = obj.service_usageALL;
            $scope.usage = obj.service_usage;
            msgBoxVisited = false;
            loaded = false;
            varUseIN = getUsage( obj, index, 'in');
            varUseOUT = getUsage( obj, index, 'out');
            $scope.useIN = varUseIN;
            $scope.useOUT = varUseOUT;
            $scope.indUseIn = getUsageInd(this.useIN );
            $scope.indUseOUT = getUsageInd (this.useOUT );
            $scope.data = JSON.parse(JSON.stringify(varUseIN));
            $scope.objectToDisplay =  $scope.useIN;
            $scope.mainBill = obj.index == 0;
            if($scope.indUseIn === 1 && $scope.indUseOUT === 0) {
                $scope.showIn('in', index);
            }
            if($scope.indUseIn === 0 && $scope.indUseOUT === 1) {
                $scope.showIn('out', index);
            }
            else {
                $scope.showIn('in', index);
            }
            $scope.displayAbs.value = true;
            $scope.msg = !(typeof ( obj.msgbox) === 'undefined') &&  obj.msgbox.length > 0;
            $scope.msgnum = getNumberMsg(obj) ;
            $scope.partTypes = getPartType(obj);
            var partsOne =  obj.bill_parts;
            $scope.content = !(typeof ( partsOne.services) === 'undefined') &&  partsOne.services.length > 0;
            $scope.iValue = new Array(partsOne.length);
            $scope.addmsgInd =  !(typeof ( obj.addmsg) === 'undefined') &&  obj.addmsg.length > 0;
            if (!(typeof ( obj.addmsg) === 'undefined') &&  obj.addmsg.length > 0) {
                $scope.addmsg =  $scope.trustAsHtml(obj.addmsg);
            }else {
                $scope.addmsg = null;
            }
            $scope.iMsgs = getIMsgs(obj);
            indIData = getIndIData($scope.iMsgs);
            $scope.msg_tmp = buildMSGBox($scope.msgbox);

           // $scope.msg_orig = buildMSGBox1($scope.msgbox);
            var xxx = buildMSGBox1($scope.msgbox);
            $scope.msg_orig = $scope.trustAsHtml(xxx);
            $scope.addinfo = $scope.trustAsHtml(buildADDMSG(add_info_str));
        }
        function stopScrolling() {
            const body = document.body;
            body.style.height = '100vh';
            body.style.overflowY = 'hidden';
        }
        function backToBody() {
            document.getElementById('msg').scrollTop = 0;
            const body = document.body;
            body.style.position = '';
            body.style.top = '';
            body.style.height = '';
            body.style.overflowY = '';
        }
        $scope.showMB = function (){
            $scope.MB = true;
            stopScrolling();
        }
        $scope.closeMB = function (){
            backToBody();
            $scope.MB = false;
        }
        $scope.showAMB = function (){
            $scope.AMB = true;
            stopScrolling();
        }
        $scope.closeAMB = function (){
            $scope.AMB = false;
            backToBody();
        }
        function buildMSGBox (object) {
            let newLine = "\n";
            var data= '';
            if(!(typeof ( object) === 'undefined') &&  object.length > 0){
                for( var i=0; i < object.length; i++) {
                    data+= object[i].title;
                    data+= newLine;
                    data+= object[i].msg;
                    data+= newLine;
                }
            }
            return data;
        }
        function closeMsgS(e) {
            if (e.code === 'Escape' || e.code === 'Tab') {
                $scope.MB = false;
                $scope.AMB = false;
                $scope.closeIs();
            }
        }
        function getUsage(object, index, param) {
            var testArr = null;
            if (index == 0) {
                if (typeof object.service_usageALL !== 'undefined') {
                    if (param === 'in') {
                        testArr =  object.service_usageALL.filter (function (obj) {
                            return obj.in === 'in';
                        });
                    }
                    if (param === 'out') {
                        testArr =  object.service_usageALL.filter (function (obj) {
                            return obj.in === 'out';
                        });
                    }
                }
            }
            if (index > 0) {
                if (typeof object.service_usage !== 'undefined') {
                    if (param === 'in') {
                        testArr =  object.service_usage.filter (function (obj) {
                            return obj.in === 'in';
                        });
                    }
                    if (param === 'out') {
                        testArr =  object.service_usage.filter (function (obj) {
                            return obj.in === 'out';
                        });
                    }
                }
            }
            return testArr;
        }
        function getUsageInd (object) {
            var index = 0;
            if (object !== null) {
                if (object.length > 0 ) {
                    index = 1;
                }
            }
            return index;
        }
        function getNumberMsg(obj) {
            if (!(typeof ( obj.msgbox) === 'undefined') &&  obj.msgbox.length > 0){
                return obj.msgbox.length;
            }
            else {
                return 0;
            }
        }
        function getPartType (obj) {
            if (!(typeof ( obj.bill_parts) === 'undefined') &&  obj.bill_parts.length > 0){
                var size = obj.bill_parts.length;
                var types = new Array(size);
                for( var i = 0; i < size; i++) {
                    if(obj.bill_parts[i].paycode === 'eqip' ||
                        obj.bill_parts[i].paycode === 'disc' ||
                        obj.bill_parts[i].paycode === 'refund')
                        types[i] = 'simple';
                    if(obj.bill_parts[i].paycode === 'pcn' ||
                        obj.bill_parts[i].paycode === 'pch' ||
                        obj.bill_parts[i].paycode === 'smth' ||
                        obj.bill_parts[i].paycode === 'pad')
                        types[i] = 'regular';
                    if(obj.bill_parts[i].paycode === 'onep' )
                        types[i] = 'cloud';
                }
                return types;
            }
            else {
                return null;
            }
        }
        function getIndIData (arr) {
            let indIdata = new Array(arr.length);
            for (let i=0; i < indIdata.length; i++){
                indIdata[i] = false;
            }
            return indIdata;
        }
        function getIMsgs (obj) {
            if (!(typeof ( obj.bill_parts) === 'undefined') &&  obj.bill_parts.length > 0){
                let temp = new Array(obj.bill_parts.length);
                for (let i=0; i < temp.length; i++){
                    temp[i] = obj.bill_parts[i].submsg;
                }
                return temp;
            }
            else
                return null;
        }
        $scope.dataInd = function (index) {
            return indIData[index];
        }
        $scope.showNewI = function (index) {
            indIData[index] = true;
            closeNonRelativeIs(index);
        }
        $scope.getValue= function (index){
            return indIData[index];
        }
        $scope.closeI = function (index) {
            indIData[index] = false;
        }
        $scope.closeIs = function () {
            for (let i=0; i < indIData.length; i++){
                indIData[i] = false;
            }
        }
        function closeNonRelativeIs (index) {
            for (let i=0; i < indIData.length; i++){
                if(index != i ){
                    indIData[i] = false;
                }
            }
        }
        $scope.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
        };
        function buildMSGBox1(msgbox) {
            var temp = "";
            if (!(typeof ( msgbox) === 'undefined') &&  msgbox.length > 0){
                for (let i=0; i < msgbox.length; i++){
                    temp += "<span class='msg-title'>" + msgbox[i].title + "</span>";
                    temp += "<div class='msg-body'>" + msgbox[i].msg + "</div>";
                }
            }
            return temp;
        }
        function buildADDMSG(text) {
            var temp = "";
            if (!(typeof ( text) === 'undefined') &&  text.length > 0){
                    temp += "<div class='msg-body'>" + text + "</div>";
                }
            return temp;
        }

    });
    myBill.directive('dirEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown", function (event) {
                if(event.code === 'Enter') {
                    scope.$apply(function (){
                        if(attrs.dirEnter === 'showBOX'){
                            scope.showMB();
                        }
                        if(attrs.dirEnter.substr(0, 5) === 'part1'){
                            scope.toggleDisplay(attrs.dirEnter.substr(6, 1));
                        }
                        if(attrs.dirEnter.substr(0, 3) === 'inn'){
                            scope.showIn('in', scope.billselected.index);
                        }
                        if(attrs.dirEnter.substr(0, 3) === 'out'){
                            scope.showIn('out', scope.billselected.index);
                        }
                        if(attrs.dirEnter === 'displayAbs'){
                            scope.displayAbs.value = !scope.displayAbs.value;
                        }
                    });
                    event.preventDefault();
                }
            });
        };
    });
    myBill.directive('dirEsc', function () {
        return function (scope, element, attrs) {
            element.bind("keydown", function (event) {
                if(event.code === 'Escape') {
                    scope.$apply(function (){
                        scope.closeMB();
                        scope.closeAMB();
                        scope.closeIs();
                    });
                    event.preventDefault();
                }
            });
        };
    });
    myBill.directive('iInfo', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                close: '&onClose'
            },
            template:
              //  "<div class='i-overlay' ng-click='close()'></div>" +
                "<div class='i-background'>" +
                "<div class='i-close' ng-click='close()'>&times;</div>" +
                "<div class='i-content' ng-transclude></div></div></div>"
        }
    } );
    myBill.directive('msgBox', function ($sce) {
        return {
            restrict: 'E',
            scope: {
                close: '&onClose',
                msgdata: '=msgdata'
            },
            template:
                "<div class='msg-background'>" +
                "<div class='msg-close' ng-click='close()'>&times;</div>" +
                "<div class='box-ttl'>תיבת ההודעות שלך</div>" +
                "<div id='msg' class='msg-content msgBox-msg' ng-bind-html='msgdata'></div>" +
                "</div>" +
                "</div>" +
                "<div class='msg-overlay' ng-click='close()' dir-esc='showBOX'></div>"
        };
    } );
    myBill.directive('addMsg', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                close: '&onClose',
                addinfo: '=addinfo'
            },
            template:
                "<div class='msg-background'  >" +
                "<div class='msg-close' ng-click='close()'>&times;</div>" +
                "<div class='box-ttl'>מידע נוסף אודות חשבונית דיגיטלית</div>" +
                " <div class='msg-content msgBox-msg'>" +
                " <span class='msg-title'>חברת פלאפון תקשורת בע\"מ עוסק מורשה/ ח.פ. מספר: 511076572</span>" +
                "<div class='msgBox-msg'  ng-bind-html='addinfo'>" +
                " </div></div></div></div>" +
                "<div class='msg-overlay' ng-click='close()' dir-esc='showBOX'></div>"
        }
    } );
} else {
    dataNotLoaded();
}
function prepareData (data) {
    return data.replace(/\bBOLDS\b/g, '<strong>').replace(/\bBOLDE\b/g, '</strong>');
}
function dataNotLoaded(){
    var error_msg = document.createElement('div');
    var err_div = 'Something was wrong in parsing data';
    error_msg.innerHTML = err_div;
    error_msg.id = "brw-err";
    var sp2 = document.getElementById('div-err');
    var parentDiv = sp2.parentNode;
    var err = document.createElement('div');
    err.className = 'overlay';
    err.appendChild(error_msg);
    parentDiv.insertBefore(err, sp2);
}

var test = navigator.userAgent;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    window.addEventListener("orientationchange", function() {
        window.location.reload();
    }, false);
}
if( /Edg|rv:11/i.test(navigator.userAgent) ) {
}
else {
    window.screen.orientation.onchange = function() {
        window.location.reload();
    }
}