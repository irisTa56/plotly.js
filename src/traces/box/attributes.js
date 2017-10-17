/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var scatterAttrs = require('../scatter/attributes');
var colorAttrs = require('../../components/color/attributes');
var extendFlat = require('../../lib/extend').extendFlat;

var scatterMarkerAttrs = scatterAttrs.marker;
var scatterMarkerLineAttrs = scatterMarkerAttrs.line;

module.exports = {
    y: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the y sample data or coordinates.',
            'See overview for more info.'
        ].join(' ')
    },
    x: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the x sample data or coordinates.',
            'See overview for more info.'
        ].join(' ')
    },
    x0: {
        valType: 'any',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the x coordinate of the box.',
            'See overview for more info.'
        ].join(' ')
    },
    y0: {
        valType: 'any',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the y coordinate of the box.',
            'See overview for more info.'
        ].join(' ')
    },
    name: {
        valType: 'string',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the trace name.',
            'The trace name appear as the legend item and on hover.',
            'For box traces, the name will also be used for the position',
            'coordinate, if `x` and `x0` (`y` and `y0` if horizontal) are',
            'missing and the position axis is categorical'
        ].join(' ')
    },
    whiskerwidth: {
        valType: 'number',
        min: 0,
        max: 1,
        dflt: 0.5,
        role: 'style',
        editType: 'calcIfAutorange',
        description: [
            'Sets the width of the whiskers relative to',
            'the box\' width.',
            'For example, with 1, the whiskers are as wide as the box(es).'
        ].join(' ')
    },
    boxpoints: {
        valType: 'enumerated',
        values: ['all', 'outliers', 'suspectedoutliers', false],
        dflt: 'outliers',
        role: 'style',
        editType: 'calcIfAutorange',
        description: [
            'If *outliers*, only the sample points lying outside the whiskers',
            'are shown',
            'If *suspectedoutliers*, the outlier points are shown and',
            'points either less than 4*Q1-3*Q3 or greater than 4*Q3-3*Q1',
            'are highlighted (see `outliercolor`)',
            'If *all*, all sample points are shown',
            'If *false*, only the box(es) are shown with no sample points'
        ].join(' ')
    },
    boxmean: {
        valType: 'enumerated',
        values: [true, 'sd', false],
        dflt: false,
        role: 'style',
        editType: 'calcIfAutorange',
        description: [
            'If *true*, the mean of the box(es)\' underlying distribution is',
            'drawn as a dashed line inside the box(es).',
            'If *sd* the standard deviation is also drawn.'
        ].join(' ')
    },
    jitter: {
        valType: 'number',
        min: 0,
        max: 1,
        role: 'style',
        editType: 'calcIfAutorange',
        description: [
            'Sets the amount of jitter in the sample points drawn.',
            'If *0*, the sample points align along the distribution axis.',
            'If *1*, the sample points are drawn in a random jitter of width',
            'equal to the width of the box(es).'
        ].join(' ')
    },
    pointpos: {
        valType: 'number',
        min: -2,
        max: 2,
        role: 'style',
        editType: 'calcIfAutorange',
        description: [
            'Sets the position of the sample points in relation to the box(es).',
            'If *0*, the sample points are places over the center of the box(es).',
            'Positive (negative) values correspond to positions to the',
            'right (left) for vertical boxes and above (below) for horizontal boxes'
        ].join(' ')
    },
    orientation: {
        valType: 'enumerated',
        values: ['v', 'h'],
        role: 'style',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the orientation of the box(es).',
            'If *v* (*h*), the distribution is visualized along',
            'the vertical (horizontal).'
        ].join(' ')
    },
    marker: {
        outliercolor: {
            valType: 'color',
            dflt: 'rgba(0, 0, 0, 0)',
            role: 'style',
            editType: 'style',
            description: 'Sets the color of the outlier sample points.'
        },
        symbol: extendFlat({}, scatterMarkerAttrs.symbol,
            {arrayOk: false, editType: 'plot'}),
        opacity: extendFlat({}, scatterMarkerAttrs.opacity,
            {arrayOk: false, dflt: 1, editType: 'style'}),
        size: extendFlat({}, scatterMarkerAttrs.size,
            {arrayOk: false, editType: 'calcIfAutorange'}),
        color: extendFlat({}, scatterMarkerAttrs.color,
            {arrayOk: false, editType: 'style'}),
        line: {
            color: extendFlat({}, scatterMarkerLineAttrs.color,
                {arrayOk: false, dflt: colorAttrs.defaultLine, editType: 'style'}
            ),
            width: extendFlat({}, scatterMarkerLineAttrs.width,
                {arrayOk: false, dflt: 0, editType: 'style'}
            ),
            outliercolor: {
                valType: 'color',
                role: 'style',
                editType: 'style',
                description: [
                    'Sets the border line color of the outlier sample points.',
                    'Defaults to marker.color'
                ].join(' ')
            },
            outlierwidth: {
                valType: 'number',
                min: 0,
                dflt: 1,
                role: 'style',
                editType: 'style',
                description: [
                    'Sets the border line width (in px) of the outlier sample points.'
                ].join(' ')
            },
            editType: 'style'
        },
        editType: 'plot'
    },
    line: {
        color: {
            valType: 'color',
            role: 'style',
            editType: 'style',
            description: 'Sets the color of line bounding the box(es).'
        },
        width: {
            valType: 'number',
            role: 'style',
            min: 0,
            dflt: 2,
            editType: 'style',
            description: 'Sets the width (in px) of line bounding the box(es).'
        },
        editType: 'plot'
    },
    fillcolor: scatterAttrs.fillcolor,
    hoveron: {
        valType: 'flaglist',
        flags: ['boxes', 'points'],
        dflt: 'boxes',
        role: 'info',
        editType: 'style',
        description: [
            'Do the hover effects highlight individual boxes ',
            'or jitter points or both?'
        ].join(' ')
    }
};
