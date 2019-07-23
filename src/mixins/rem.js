/*设置自适应字体*/

window.addEventListener('resize', __resize, false);

__resize();

function __resize() {
  var currClientWidth = document.documentElement.clientWidth;
  //这里是设置屏幕的最大和最小值时候给一个默认值
  if (currClientWidth > 1200) currClientWidth = 1200;
  if (currClientWidth < 320) currClientWidth = 320;
  fontValue = (currClientWidth/1200*100).toFixed(2);
  // $('html').css('font-size',fontValue + 'px');
  document.documentElement.style.fontSize = fontValue + 'px';
};
