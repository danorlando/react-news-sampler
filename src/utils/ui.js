import $ from 'jquery';

export function calculateTextDimensions(text, classes, escape) {
    classes = classes || [];
    if (escape === undefined) {
        escape = true;
    }
    classes.push('textDimensionCalculation');
    var div = document.createElement('div');
    div.setAttribute('class', classes.join(' '));
    if (escape) {
        $(div).text(text);
    } else {
        div.innerHTML = text;
  }
  document.body.appendChild(div);
  var dimensions = {
      width : jQuery(div).outerWidth(),
      height : jQuery(div).outerHeight()
  };
  div.parentNode.removeChild(div);
  return dimensions;
};

export function updateScale() {
    let baseSize = {
        w: 1440,
        h: 1000 
      }
    var $win = $(window);
    var ww = $win.width();
    var wh = $win.height();
    let scaleFactor = 1;
    // compare ratios
    if(ww/wh < baseSize.w/baseSize.h) { // tall ratio
      scaleFactor = ww / baseSize.w;
    } else { // wide ratio
      scaleFactor = wh / baseSize.h;        
    } 
   return scaleFactor;
  }