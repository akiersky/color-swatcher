var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/color-swatcher.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/color-swatcher.js":
/*!*******************************!*\
  !*** ./src/color-swatcher.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var page = doc.selectedPage;
var artboard = doc.selectedPage;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var selectedLayers = doc.selectedLayers;
  var selectedCount = selectedLayers.length;

  if (selectedCount == 0) {
    createStylesheet(doc);
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Swatch stylesheet generated 🙌");
  } else {
    for (var i = 0; i < selectedCount; i++) {
      var fillcolor = doc.selectedLayers.layers[i].style.fills[0].color.slice(0, 7);
      var position = parentOffsetInArtboard(doc.selectedLayers.layers[i]);
      log("position: " + position.x + " : " + position.y);
      createSwatch(fillcolor, 0, artboard, position);
    }

    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Swatch generated 🙌");
  }
});

function createStylesheet(doc) {
  var styles = doc.sharedLayerStyles; //log(styles)

  var group = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Group({
    parent: page,
    name: "Styles"
  });

  for (var s in styles) {
    if (styles.hasOwnProperty(s)) {
      //log(styles[s].name)
      var stylecolor = styles[s].style.fills[0].color.slice(0, 7);
      createSwatch(stylecolor, s, group);
    }
  }
} //find layer position relative to artboard


function parentOffsetInArtboard(layer) {
  var offset = {
    x: 0,
    y: 0
  };
  var parent = layer.parent;
  var layerOffset = {
    x: layer.frame.x + layer.frame.width,
    y: layer.frame.y
  };
  log('layerOffset' + layerOffset.x + ' : ' + layerOffset.y);

  while (parent.type !== 'Artboard') {
    offset.x += parent.frame.x;
    offset.y += parent.frame.y;
    parent = parent.parent;
  }

  artboard = parent;
  offset.x += layerOffset.x;
  offset.y += layerOffset.y;
  return offset;
}

function createSwatch(color, offset, artboard, parentRect) {
  var pos = parentRect ? {
    x: parentRect.x + 10,
    y: parentRect.y
  } : {
    x: 110 * offset,
    y: 0
  };
  log("pos: " + pos.x + " : " + pos.y); // group for the created swatch

  var swatch = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Group({
    parent: artboard,
    name: color + " swatch",
    frame: new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Rectangle(pos.x, pos.y, 100, 100)
  }); // rectangle background same color as the swatch

  var rectcolor = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Shape({
    parent: swatch,
    frame: new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Rectangle(0, 0, 100, 40),
    style: {
      fills: [{
        color: color
      }],
      borders: [{
        enabled: false
      }]
    }
  }); // rectangle background same color as the swatch

  var rectwhite = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Shape({
    parent: swatch,
    frame: new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Rectangle(0, 40, 100, 40),
    style: {
      fills: [{
        color: '#ffffff'
      }],
      borders: [{
        enabled: false
      }]
    }
  }); // rectangle background same color as the swatch

  var rectblack = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Shape({
    parent: swatch,
    frame: new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Rectangle(0, 80, 100, 40),
    style: {
      fills: [{
        color: '#000000'
      }],
      borders: [{
        enabled: false
      }]
    }
  }); //text showing contrast against white

  var whitecontrast = contrast([255, 255, 255], hexToRgb(color)).toFixed(1);
  var whiteratio = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Text({
    parent: swatch,
    text: whitecontrast + ":1 " + checkWCAG(whitecontrast),
    frame: new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Rectangle(8, 55, 92, 40),
    style: {
      fills: [{
        color: '#000000'
      }],
      borders: [{
        enabled: false
      }]
    }
  }); //text showing contrast against black

  var blackcontrast = contrast([0, 0, 0], hexToRgb(color)).toFixed(1);
  var blackratio = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Text({
    parent: swatch,
    text: blackcontrast + ":1 " + checkWCAG(blackcontrast),
    frame: new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Rectangle(8, 95, 92, 40),
    style: {
      fills: [{
        color: '#ffffff'
      }],
      borders: [{
        enabled: false
      }]
    }
  });
  var contrastColor = whitecontrast / blackcontrast > 1 ? '#ffffff' : '#000000'; // text showing the color of the swatch

  var textcolor = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Text({
    parent: swatch,
    text: color,
    fixedWidth: true,
    frame: new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Rectangle(8, 15, 92, 40),
    style: {
      fills: [{
        color: contrastColor
      }],
      borders: [{
        enabled: false
      }]
    }
  }); // log(whitecontrast)
  // log(blackcontrast)
} ////////////////////////////////// HELPER FUNCTIONS/////////////////////////////////
// from: https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
// calculate luminanace of a color


function luminanace(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
} //calculate contrast between two rgb colors


function contrast(rgb1, rgb2) {
  var result = (luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05) / (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05);
  if (result < 1) result = 1 / result;
  return result;
} // WCAG 2 level AA requires a contrast ratio of at least 4.5:1 for normal text 
//and 3:1 for large text, and a contrast ratio of at least 3:1 for graphics 
//and user interface components (such as form input borders). 
//Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.
//Large text is defined as 14 point (typically 18.66px) and bold or larger, 
//or 18 point (typically 24px) or larger.


function checkWCAG(ratio) {
  if (ratio >= 7) {
    return '✔︎';
  } else if (ratio >= 4.5) {
    return 'Large AAA';
  } else if (ratio >= 3) {
    return 'Large AA';
  } else {
    return '✘';
  }
} // from: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
//convert from hex to rgb


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=color-swatcher.js.map