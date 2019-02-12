/*
Created by Ralf Becher - ralf.becher@web.de - (c) 2015 irregular.bi, Leipzig, Germany
Tested on Qlik Sense 2.2.4
Modified by Loïc Formont and Xavier Le Pitre
Tested on Qlik Sense 2.0.1

Based on: d3 day/hour heatmap for Qlik Sense
Source  : http://branch.qlik.com/projects/showthread.php?348-d3-day-hour-heatmap-for-Qlik-Sense
GitHub  : https://github.com/borodri/Sense_d3calendarheatmap
Author  : https://github.com/borodri

irregular.bi takes no responsibility for any code.
Use at your own risk.
*/

const global = window;
const defined = global.requirejs && global.requirejs.defined;
const define = (global && global.define) || define;

import definition from './definition';
import paintSetup from './paint';
import './styles/qlik-heatmap-chart.less';

// Cover all standardized ES6 APIs.
// import "core-js/es6";


// NOT WORKING
// import 'core-js/modules/es6.object.to-string';

import 'core-js/modules/es6.promise';
import 'core-js/modules/es6.symbol';
import 'core-js/modules/es6.object.create';
import 'core-js/modules/es6.object.define-property';
import 'core-js/modules/es6.object.define-properties';
import 'core-js/modules/es6.object.get-own-property-descriptor';
import 'core-js/modules/es6.object.get-prototype-of';
import 'core-js/modules/es6.object.keys';
import 'core-js/modules/es6.object.get-own-property-names';
import 'core-js/modules/es6.object.freeze';
import 'core-js/modules/es6.object.seal';
import 'core-js/modules/es6.object.prevent-extensions';
import 'core-js/modules/es6.object.is-frozen';
import 'core-js/modules/es6.object.is-sealed';
import 'core-js/modules/es6.object.is-extensible';
import 'core-js/modules/es6.object.assign';
import 'core-js/modules/es6.object.is';
import 'core-js/modules/es6.object.set-prototype-of';
import 'core-js/modules/es6.function.bind';
import 'core-js/modules/es6.function.name';
import 'core-js/modules/es6.function.has-instance';
import 'core-js/modules/es6.parse-int';
import 'core-js/modules/es6.parse-float';
import 'core-js/modules/es6.number.constructor';
import 'core-js/modules/es6.number.to-fixed';
import 'core-js/modules/es6.number.to-precision';
import 'core-js/modules/es6.number.epsilon';
import 'core-js/modules/es6.number.is-finite';
import 'core-js/modules/es6.number.is-integer';
import 'core-js/modules/es6.number.is-nan';
import 'core-js/modules/es6.number.is-safe-integer';
import 'core-js/modules/es6.number.max-safe-integer';
import 'core-js/modules/es6.number.min-safe-integer';
import 'core-js/modules/es6.number.parse-float';
import 'core-js/modules/es6.number.parse-int';
import 'core-js/modules/es6.math.acosh';
import 'core-js/modules/es6.math.asinh';
import 'core-js/modules/es6.math.atanh';
import 'core-js/modules/es6.math.cbrt';
import 'core-js/modules/es6.math.clz32';
import 'core-js/modules/es6.math.cosh';
import 'core-js/modules/es6.math.expm1';
import 'core-js/modules/es6.math.fround';
import 'core-js/modules/es6.math.hypot';
import 'core-js/modules/es6.math.imul';
import 'core-js/modules/es6.math.log10';
import 'core-js/modules/es6.math.log1p';
import 'core-js/modules/es6.math.log2';
import 'core-js/modules/es6.math.sign';
import 'core-js/modules/es6.math.sinh';
import 'core-js/modules/es6.math.tanh';
import 'core-js/modules/es6.math.trunc';
import 'core-js/modules/es6.string.from-code-point';
import 'core-js/modules/es6.string.raw';
import 'core-js/modules/es6.string.trim';
import 'core-js/modules/es6.string.iterator';
import 'core-js/modules/es6.string.code-point-at';
import 'core-js/modules/es6.string.ends-with';
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es6.string.repeat';
import 'core-js/modules/es6.string.starts-with';
import 'core-js/modules/es6.string.anchor';
import 'core-js/modules/es6.string.big';
import 'core-js/modules/es6.string.blink';
import 'core-js/modules/es6.string.bold';
import 'core-js/modules/es6.string.fixed';
import 'core-js/modules/es6.string.fontcolor';
import 'core-js/modules/es6.string.fontsize';
import 'core-js/modules/es6.string.italics';
import 'core-js/modules/es6.string.link';
import 'core-js/modules/es6.string.small';
import 'core-js/modules/es6.string.strike';
import 'core-js/modules/es6.string.sub';
import 'core-js/modules/es6.string.sup';
import 'core-js/modules/es6.date.now';
import 'core-js/modules/es6.date.to-json';
import 'core-js/modules/es6.date.to-iso-string';
import 'core-js/modules/es6.date.to-string';
import 'core-js/modules/es6.date.to-primitive';
import 'core-js/modules/es6.array.is-array';
import 'core-js/modules/es6.array.from';
import 'core-js/modules/es6.array.of';
import 'core-js/modules/es6.array.join';
import 'core-js/modules/es6.array.slice';
import 'core-js/modules/es6.array.sort';
import 'core-js/modules/es6.array.for-each';
import 'core-js/modules/es6.array.map';
import 'core-js/modules/es6.array.filter';
import 'core-js/modules/es6.array.some';
import 'core-js/modules/es6.array.every';
import 'core-js/modules/es6.array.reduce';
import 'core-js/modules/es6.array.reduce-right';
import 'core-js/modules/es6.array.index-of';
import 'core-js/modules/es6.array.last-index-of';
import 'core-js/modules/es6.array.copy-within';
import 'core-js/modules/es6.array.fill';
import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es6.array.species';
import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.regexp.constructor';
import 'core-js/modules/es6.regexp.to-string';
import 'core-js/modules/es6.regexp.flags';
import 'core-js/modules/es6.regexp.match';
import 'core-js/modules/es6.regexp.replace';
import 'core-js/modules/es6.regexp.search';
import 'core-js/modules/es6.regexp.split';
import 'core-js/modules/es6.map';
import 'core-js/modules/es6.set';
import 'core-js/modules/es6.weak-map';
import 'core-js/modules/es6.weak-set';
import 'core-js/modules/es6.typed.array-buffer';
import 'core-js/modules/es6.typed.data-view';
import 'core-js/modules/es6.typed.int8-array';
import 'core-js/modules/es6.typed.uint8-array';
import 'core-js/modules/es6.typed.uint8-clamped-array';
import 'core-js/modules/es6.typed.int16-array';
import 'core-js/modules/es6.typed.uint16-array';
import 'core-js/modules/es6.typed.int32-array';
import 'core-js/modules/es6.typed.uint32-array';
import 'core-js/modules/es6.typed.float32-array';
import 'core-js/modules/es6.typed.float64-array';
import 'core-js/modules/es6.reflect.apply';
import 'core-js/modules/es6.reflect.construct';
import 'core-js/modules/es6.reflect.define-property';
import 'core-js/modules/es6.reflect.delete-property';
import 'core-js/modules/es6.reflect.enumerate';
import 'core-js/modules/es6.reflect.get';
import 'core-js/modules/es6.reflect.get-own-property-descriptor';
import 'core-js/modules/es6.reflect.get-prototype-of';
import 'core-js/modules/es6.reflect.has';
import 'core-js/modules/es6.reflect.is-extensible';
import 'core-js/modules/es6.reflect.own-keys';
import 'core-js/modules/es6.reflect.prevent-extensions';
import 'core-js/modules/es6.reflect.set';
import 'core-js/modules/es6.reflect.set-prototype-of';



// Standard now
import "core-js/fn/array/includes";
import "core-js/fn/string/pad-start";
import "core-js/fn/string/pad-end";
import "core-js/fn/symbol/async-iterator";
import "core-js/fn/object/get-own-property-descriptors";
import "core-js/fn/object/values";
import "core-js/fn/object/entries";
import "core-js/fn/promise/finally";

// Ensure that we polyfill ES6 compat for anything web-related, if it exists.
import "core-js/web";

import "regenerator-runtime/runtime";


const dependencies = [
  'module',
  'qlik',
  'jquery'
].map(dependency => {
  const isDefined = defined(dependency) || dependency === 'module';
  if (isDefined) {
    return dependency;
  } else {
    if(dependency === 'qlik' && defined('js/qlik')) {
      return 'js/qlik';
    } else {
      return null;
    }
  }
});

define(dependencies, function (module, qlik, $) {
  'use strict';

  const paint = paintSetup({ $, qlik });

  return {
    initialProperties: {
      version: 1.0,
      qHyperCubeDef: {
        qDimensions: [],
        qMeasures: [],
        qInitialDataFetch: [{
          qWidth: 4,
          qHeight: 2500
        }]
      }
    },
    data:{
      dimensions: {
        uses: "dimensions",
        min: 2,
        max: 2
      },
      measures: {
        uses: "measures",
        min: 1,
        max: 2
      }
    },
    definition: definition,
    support: {
      export: true
    },
    snapshot: {
      canTakeSnapshot: true
    },
    paint: paint
  };
});
