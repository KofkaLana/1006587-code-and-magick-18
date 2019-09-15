'use strict';

var CLOUD_WIDTH = 420; // ширина окна
var CLOUD_HEIGHT = 270; // высота окна
var CLOUD_X = 100; // координаты окна
var CLOUD_Y = 10;
var GAP = 10; // отступ от края сверху
var FONT_GAP = 20; // высота строки
var BAR_GAP = 50; // расстояние между колонками
var BAR_WIDTH = 40; // ширина колонки
var BAR_HEIGHT = 150; // высота гистограммы

var barY = CLOUD_HEIGHT - 2 * GAP; // отсуп от края снизу
var barX = CLOUD_X + BAR_GAP; // отступ от края сбоку

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 130, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', 130, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], barX + (BAR_WIDTH + BAR_GAP) * i, barY);
    ctx.fillText(Math.round(times[i]), barX + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP - BAR_HEIGHT * times[i] / maxTime - 2 * FONT_GAP);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(230, ' + Math.round(Math.random() * 100) + '%,' + Math.round(Math.random() * 100) + '%)';
    }
    ctx.fillRect(barX + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[i] / maxTime, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
  }
};
