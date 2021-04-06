function setValue (value, color) {
    var xmlns = "http://www.w3.org/2000/svg";
    var str_wdt = 4,
        base_color = '#E6E6E6',
        start = 10;
    baseLineD = 'M 10,10 h 100';
    if (value < 0) { value = 0;}
    if (value > 100) { value = 100;}
    if (isNaN(value)) { value = 0;}

    valueLineD = 'M 10,10 h '+ (value);
    circleValue_v = start +  parseFloat(value);
  //  console.log('valueLineD value = ' + valueLineD);
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute('viewBox', "0 0 120 18");
    var circleStart = document.createElementNS(xmlns, "circle");
    circleStart.setAttribute('id', 'start');
    circleStart.setAttribute('cx', '10');
    circleStart.setAttribute('cy', '10');
    circleStart.setAttribute('r', '1');
    circleStart.setAttribute('stroke', color);
    circleStart.setAttribute('stroke-width', '1');
    circleStart.setAttribute('fill', color);


    var circleEnd = document.createElementNS(xmlns, "circle");
    circleEnd.setAttribute('id', 'end');
    circleEnd.setAttribute('cx', '110');
    circleEnd.setAttribute('cy', '10');
    circleEnd.setAttribute('r', '1');
    circleEnd.setAttribute('stroke', base_color);
    circleEnd.setAttribute('stroke-width', '1');
    circleEnd.setAttribute('fill', base_color);

    var circleValue = document.createElementNS(xmlns, "circle");
    circleValue.setAttribute('id', 'pointValue');
    circleValue.setAttribute('cx', circleValue_v);
    circleValue.setAttribute('cy', '10');
    circleValue.setAttribute('r', '1');
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

    svg.append(base);
    svg.append(val);
    svg.append(circleStart);
    svg.append(circleEnd);
    svg.append(circleValue);

    return svg;
}
function drawLineChart() {
    console.log('drawLineChart in line');
    var divs = document.getElementsByClassName("lineChart");
    console.log('divs in drawLineChart ' + divs);
    for (i = 0; i < divs.length; i++ ){
        var item = divs.item(i),
        value = item.getAttribute('data-value'),
        text = item.getAttribute('data-text');
       // console.log('before set value = ' + value);
        item.appendChild(setValue(value, text));
    }
}


