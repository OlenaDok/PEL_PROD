//"use strict";

var myApp = angular.module('myBill');

myApp.service('ChartService', function ($timeout) {
    var setValue = function(value) {
        var xmlns = "http://www.w3.org/2000/svg";
        var str_wdt = 4,
            base_color = '#c5c5c5',
            start = 10;
        baseLineD = 'M 10,10 h 100';
      //  console.log('value = ' + value + 'isNaN(value)=' +"(value=='')" + (value==''));
        if (value < 0) { value = 0;}
        if (value > 100) { value = 100;}
        if (isNaN(value) || (value=='')) { value = 0;}

        if (value >= 75) {
            color = '#E1248E';
        }
        else {
            color = '#0B69BA';
        }

        valueLineD = 'M 10,10 h '+ (value);
        circleValue_v = start +  parseFloat(value);
      //  console.log('valueLineD value = ' + valueLineD);
        var svg = document.createElementNS(xmlns, "svg");
        svg.setAttribute('viewBox', "0 0 120 18");
        var circleStart = document.createElementNS(xmlns, "circle");
        circleStart.setAttribute('id', 'start');
        circleStart.setAttribute('cx', '10');
        circleStart.setAttribute('cy', '10');
        circleStart.setAttribute('r', '0.5');
        circleStart.setAttribute('stroke', color);
        circleStart.setAttribute('stroke-width', '1');
        circleStart.setAttribute('fill', color);


        var circleEnd = document.createElementNS(xmlns, "circle");
        circleEnd.setAttribute('id', 'end');
        circleEnd.setAttribute('cx', '110');
        circleEnd.setAttribute('cy', '10');
        circleEnd.setAttribute('r', '0.5');
        circleEnd.setAttribute('stroke', base_color);
        circleEnd.setAttribute('stroke-width', '1');
        circleEnd.setAttribute('fill', base_color);

        var circleValue = document.createElementNS(xmlns, "circle");
        circleValue.setAttribute('id', 'pointValue');
        circleValue.setAttribute('cx', circleValue_v);
        circleValue.setAttribute('cy', '10');
        circleValue.setAttribute('r', '0.5');
        circleValue.setAttribute('stroke', color);
        circleValue.setAttribute('stroke-width', '1');
        circleValue.setAttribute('fill', color);

        var base = document.createElementNS(xmlns, "path");
        base.setAttribute('stroke', base_color);
        base.setAttribute('stroke-width', '2');
        base.setAttribute('d', baseLineD);

        var val = document.createElementNS(xmlns, "path");
        val.setAttribute('stroke', color);
        val.setAttribute('stroke-width', '2');
        val.setAttribute('d', valueLineD);

        svg.appendChild(base);


        if (value > 0 ){
            svg.appendChild(circleStart);
            svg.appendChild(circleEnd);
            svg.appendChild(val);
            svg.appendChild(circleValue);
        }


        return svg;
    }

    var drawLineChart = function () {
     //   console.log('drawLineChart in line');
        var divs =  document.getElementsByClassName("lineChart");
        var divs2 =  angular.element(document.getElementsByClassName("lineChart"));
        var divsSelect = document.querySelectorAll('lineChart');
     //   console.log('angular divs in drawLineChart ' + divsSelect.length);
        for (i = 0; i < divs.length; i++ ){
            var item = divs.item(i),
                value = item.getAttribute('data-value');
              /*  text = item.getAttribute('data-text');*/
         //    console.log('before set value = ' + value);
            item.appendChild(setValue(value));
        }
    }

    var drawLineChart1 = function (value) {

        if (value >= 75) {
            color = '#E1248E';
        }
        else {
            color = '#0B69BA';
        }

     //   console.log('drawLineChart with values ');
        var divs = document.getElementsByClassName("lineChart");
        var divsSelect = document.querySelectorAll('lineChart');
      //  console.log('divsSelect in drawLineChart ' + divsSelect.length);
        for (i = 0; i < divsSelect.length; i++ ){
            var item = divsSelect.item(i);
        //    console.log('before set value = ' + value);
            item.appendChild(setValue(value, color));
        }
    }

    var  createSVG = function () {
        var xmlns = "http://www.w3.org/2000/svg";
        var size = 120;
        var svg = document.createElementNS(xmlns, "svg");
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', "0 0 100 100");

        return svg;
    }

    var baseDonut = function (svg) {
        var xmlns = "http://www.w3.org/2000/svg";
        var size = 100;
        var id = 'svg-circle-bs',
            stroke = '#c5c5c5',
            strokeWidth = '2px' ,
            center = size/2,
            radius = size - 2,
            circumference = 2 * Math.PI * radius;

        var baseCircle = document.createElementNS(xmlns, "circle");
        baseCircle.setAttribute('r', radius/2);
        baseCircle.setAttribute('cx', center);
        baseCircle.setAttribute('cy', center);
        baseCircle.setAttribute('stroke', stroke);
        baseCircle.setAttribute('stroke-width', strokeWidth);
        baseCircle.setAttribute('fill', 'transparent');
        baseCircle.setAttribute('stroke-dasharray', 565);
        baseCircle.setAttribute('stroke-dashoffset', '0');
        svg.appendChild(baseCircle);

        return svg;
    }

    var progressDonut = function(svg, progress) {

        var id = 'svg-circle-prg';
        var xmlns = "http://www.w3.org/2000/svg";
        var size = 100,
            stroke,
            strokeWidth = '2px' ,
            center = 0,
            radius = (size - 2)/2,
            circumference = 2 * Math.PI * radius;

        if (progress < 0) { progress = 0;}
        if (progress > 100) { progress = 100;}
        if (isNaN(progress)) { progress = 55;}

        if (progress >= 75) {
            color = '#E1248E';
        }
        else {
            color = '#0B69BA';
        }

        stroke = color;
        var pct = ((100-progress)/100)*circumference * (1);

        var progressCircle = document.createElementNS(xmlns, "circle");
        progressCircle.setAttribute('r', radius);
        progressCircle.setAttribute('cx', 50);
        progressCircle.setAttribute('cy', 50);
        progressCircle.setAttribute('stroke', stroke);
        progressCircle.setAttribute('stroke-width', strokeWidth);
        progressCircle.setAttribute('fill', 'transparent');
        progressCircle.setAttribute('stroke-dasharray', circumference);
        progressCircle.setAttribute('stroke-dashoffset', pct);
        svg.appendChild(progressCircle);

        return svg;
    }

    var createDonut = function (progress) {
        var svg =  createSVG();
        baseDonut(svg);
        progressDonut(svg, progress);
     //   console.log('createDonut progress -' + progress);
        return svg;
    }

    var drawDonutChart = function() {
    //    console.log('drawDonutChart in donut');
        var divs = document.getElementsByClassName("donut");
    //    console.log('divs in drawDonutChart ' + divs.length);
        for (i = 0; i < divs.length; i++ ){

            var item = divs.item(i);
            var value = item.getAttribute('data-rel');
         /*   var text = item.getAttribute('data-text');*/
            var svg = createDonut(value);

     //       console.log('svg in donut ' + svg.getAttribute('path'));
            item.appendChild(svg);
        }
    }

    this.loadChart = function () {
         $timeout(function () {
     //       console.log('timeout ', v);
            drawLineChart();
            drawDonutChart();
        }, 5);
    }
});




