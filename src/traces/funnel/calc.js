/**
* Copyright 2012-2019, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var Axes = require('../../plots/cartesian/axes');
var arraysToCalcdata = require('./arrays_to_calcdata');
var calcSelection = require('../scatter/calc_selection');
var BADNUM = require('../../constants/numerical').BADNUM;

module.exports = function calc(gd, trace) {
    var xa = Axes.getFromId(gd, trace.xaxis || 'x');
    var ya = Axes.getFromId(gd, trace.yaxis || 'y');
    var size, pos;

    if(trace.orientation === 'h') {
        size = xa.makeCalcdata(trace, 'x');
        pos = ya.makeCalcdata(trace, 'y');
    } else {
        size = ya.makeCalcdata(trace, 'y');
        pos = xa.makeCalcdata(trace, 'x');
    }

    // create the "calculated data" to plot
    var serieslen = Math.min(pos.length, size.length);
    var cd = new Array(serieslen);

    trace._base = [];

    // set position and size
    for(var i = 0; i < serieslen; i++) {
        // treat negative values as bad numbers
        if(size[i] < 0) size[i] = BADNUM;

        var connectToNext = false;
        if(size[i] !== BADNUM) {
            if(i + 1 < serieslen && size[i + 1] !== BADNUM) {
                connectToNext = true;
            }
        }

        var cdi = cd[i] = {
            p: pos[i],
            s: size[i],
            cNext: connectToNext
        };

        trace._base[i] = -0.5 * size[i];

        if(trace.ids) {
            cdi.id = String(trace.ids[i]);
        }

        cdi.ratio = cdi.s / cd[0].s;
    }

    arraysToCalcdata(cd, trace);
    calcSelection(cd, trace);

    return cd;
};
