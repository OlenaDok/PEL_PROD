function createSVG() {
    var xmlns = "http://www.w3.org/2000/svg";
    var size = 120;
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', "0 0 100 100");

    return svg;
}

function baseDonut( svg ) {
    var xmlns = "http://www.w3.org/2000/svg";
    var size = 100;
    var id = 'svg-circle-bs',
        stroke = '#E6E6E6',
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

function progressDonut(svg, color, progress) {
    var id = 'svg-circle-prg';
    var xmlns = "http://www.w3.org/2000/svg";
    var size = 100,
        stroke = color,
        strokeWidth = '2px' ,
        center = 0,
        radius = (size - 2)/2,
        circumference = 2 * Math.PI * radius;

    if (progress < 0) { progress = 0;}
    if (progress > 100) { progress = 100;}
    if (isNaN(progress)) { progress = 55;}
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

//78 90 progress = 15
    /*
    var q = 49 + parseFloat(progress) + 20, //parseFloat(progress) + 63,
    w = 49+ parseFloat(progress) + 20;
    var circleEnd = document.createElementNS(xmlns, "circle");
    circleEnd.setAttribute('cx', q);
    circleEnd.setAttribute('cy', w);
    circleEnd.setAttribute('r', '1');
    circleEnd.setAttribute('stroke', stroke);
    circleEnd.setAttribute('stroke-width', '2');
    circleEnd.setAttribute('fill', stroke);
    svg.appendChild(circleEnd);

     */
    return svg;
}


function createDonut(color, progress) {
    var svg = createSVG();
    baseDonut(svg);
    progressDonut(svg, color, progress);
console.log('createDonut progress -' + progress);
    return svg;
}


function drawDonutChart() {
    console.log('drawDonutChart in donut');
    var divs = document.getElementsByClassName("donut");
    console.log('divs in drawDonutChart ' + divs.length);
    for (i = 0; i < divs.length; i++ ){

        var item = divs.item(i);
        var value = item.getAttribute('data-value');
        var text = item.getAttribute('data-text');
        var svg = createDonut(text, value);

        console.log('svg in donut ' + svg.getAttribute('path'));
        item.appendChild(svg);
     }
}


/*
$('#percent').on('change', function(){
    var val = parseInt($(this).val());
    var $circle = $('#svg #bar');

    if (isNaN(val)) {
        val = 100;
    }
    else{
        var r = $circle.attr('r');
        var c = Math.PI*(r*2);

        if (val < 0) { val = 0;}
        if (val > 100) { val = 100;}

        var pct = ((100-val)/100)*c;

        $circle.css({ strokeDashoffset: pct});

        $('#cont').attr('data-pct',val);
    }
});



var r = 90 ;//$circle.attr('r');
var c = Math.PI*(r*2);
var val = 85;

if (val < 0) { val = 0;}
if (val > 100) { val = 100;}

var pct = ((100-val)/100)*c;

var svg = document.getElementById("bar");
console.log('svg ' + svg);
svg.style.strokeDashoffset = pct;
 */

