'use strict';

var bool = true;
var defDataX = void 0;
var defDataY = void 0;

var echartsToSorts = function echartsToSorts(method, data) {

    if (bool) {
        defDataX = data.xAxis[0].data.slice();
        defDataY = JSON.parse(JSON.stringify(data.series.slice()));
        bool = !bool;
    }

    if (method == "default") {
        data.xAxis[0].data = defDataX.slice();
        data.series = JSON.parse(JSON.stringify(defDataY.slice()));
        return data;
    }

    var lestX = data.xAxis[0].data.slice();

    var twoDimensionalOri = Array();
    for (var i = 0; i <= data.series[0].data.slice().length - 1; i++) {
        var a = Array();
        for (var j = 0; j <= data.series.slice().length - 1; j++) {
            a.push(data.series[j].data[i]);
        }
        twoDimensionalOri.push(a);
    }

    var twoDimSumIndex = twoDimensionalOri.map(function (m, i) {
        var sum = m.reduce(function (a, b) {
            return a + b;
        });
        return [sum, i];
    });

    var sumSort = [];
    if (method == "up") sumSort = twoDimSumIndex.slice().sort(function (a, b) {
        return a[0] - b[0];
    });
    else if (method == "down") sumSort = twoDimSumIndex.slice().sort(function (a, b) {
        return b[0] - a[0];
    });

    data.xAxis[0].data = lestX.slice();
    var oriSort = sumSort.map(function (m, i) {
        data.xAxis[0].data[i] = lestX[sumSort[i][1]];
        return twoDimensionalOri[sumSort[i][1]]
    });

    for (var _i = 0; _i <= oriSort[0].length - 1; _i++) {
        var _a = Array();
        var name = data.series[_i].name;

        for (var _j = 0; _j <= oriSort.length - 1; _j++) {
            _a.push(oriSort[_j][_i]);
        }
        data.series[_i].name = name.toString();
        data.series[_i].data = _a.slice();
    }

    return data;
};