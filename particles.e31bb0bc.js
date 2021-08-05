// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"draw-force.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawForceController = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrawForceController = /*#__PURE__*/function () {
  function DrawForceController(canvasContext) {
    var _this = this;

    _classCallCheck(this, DrawForceController);

    _defineProperty(this, "onChange", function (func) {
      _this._onChange = func;
    });

    _defineProperty(this, "onMouseDown", function (e) {
      _this.startPoint = {
        x: e.offsetX,
        y: e.offsetY
      };
      _this.endPoint = {
        x: e.offsetX,
        y: e.offsetY
      };
      _this.state.down = true;
    });

    _defineProperty(this, "onMouseUp", function (e) {
      if (!_this.state.down) return;
      _this.state.down = false;
      _this.endPoint = {
        x: e.offsetX,
        y: e.offsetY
      };

      _this._onChange(_this.endPoint.x - _this.startPoint.x, _this.endPoint.y - _this.startPoint.y);
    });

    _defineProperty(this, "onMouseMove", function (e) {
      if (_this.state.down) {
        _this.endPoint = {
          x: e.offsetX,
          y: e.offsetY
        };
      }
    });

    this.canvasContext = canvasContext;
    this.canvasContext.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvasContext.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvasContext.canvas.addEventListener('mousemove', this.onMouseMove);
    this.state = {
      down: false
    };

    this._onChange = function () {};
  }

  _createClass(DrawForceController, [{
    key: "update",
    value: function update() {
      if (this.state.down) {
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.startPoint.x, this.startPoint.y);
        this.canvasContext.lineTo(this.endPoint.x, this.endPoint.y);
        this.canvasContext.stroke();
      }
    }
  }]);

  return DrawForceController;
}();

exports.DrawForceController = DrawForceController;
},{}],"Particle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particle = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Particle = /*#__PURE__*/function () {
  function Particle(_ref) {
    var _this = this;

    var startPosition = _ref.startPosition;

    _classCallCheck(this, Particle);

    _defineProperty(this, "onDelete", function (func) {
      _this._onDelete = func;
    });

    this.position = _objectSpread({}, startPosition);
    this.force = {
      x: 0,
      y: 0
    };
    this.acceleration = {
      x: 0,
      y: 0
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.mass = 0.1;
    this.seeds = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    this.config = {
      lifespan: 500,
      autonomy: 1,
      size: 5
    };
    this.life = 0;

    this._onDelete = function () {};
  }

  _createClass(Particle, [{
    key: "setContext",
    value: function setContext(context) {
      this.context = context;
    }
  }, {
    key: "setGravity",
    value: function setGravity(gravity) {
      this.force.y = gravity;
    }
  }, {
    key: "setWind",
    value: function setWind(wind) {
      this.force.x = wind;
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      this.config = config;
    }
  }, {
    key: "getWobble",
    value: function getWobble() {
      var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // wobbles
      var radian = Math.PI / 180;
      var lifeRadians = this.life * radian * this.seeds[seed]; // add random so it appears at a random place in the sine curve

      var horizontalMult = 0.5 * this.seeds[seed];
      var sinMult = 10 * this.seeds[seed];
      return horizontalMult * Math.sin(lifeRadians * sinMult);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._onDelete(this);

      delete this;
    }
  }, {
    key: "update",
    value: function update(timestamp) {
      this.life += 1;
      this.lastTime = timestamp; // todo: only update this if changed from last tick

      this.acceleration = {
        x: this.force.x * this.mass,
        y: this.force.y * this.mass
      };

      for (var i = 0; i < this.config.autonomy; i++) {
        var dimension = i % 2 === 0 ? 'x' : 'y';
        this.position[dimension] += this.getWobble(i) * (this.config.autonomy + 1);
      } // this.acceleration.x += this.getWob
      // gravity-based


      this.velocity = {
        x: this.life * this.acceleration.x,
        y: this.life * this.acceleration.y
      };
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y; // draw
      // this.context.fillStyle = 'black'

      if (this.config.lifespan < Infinity) {
        var opacity = Math.max((this.config.lifespan - this.life) / this.config.lifespan, 0);
        this.context.fillStyle = "rgba(0, 0, 0, ".concat(opacity, ")");
      } else {
        this.context.fillStyle = "rgba(0, 0, 0, 1)";
      }

      var width = this.config.size * this.seeds[0];
      this.context.fillRect(this.position.x, -this.position.y, width, width);
      var canvas = this.context.canvas; // reset when OOB

      if (this.life >= this.config.lifespan) {
        this.destroy();
      }

      if (this.force.y < 0) {
        if (this.position.y <= -canvas.height * 2) {
          this.destroy();
        }
      } else if (this.force.y > 0) {
        if (this.position.y >= canvas.height) {
          this.destroy();
        }
      }

      if (this.force.x >= 0) {
        if (this.position.x >= canvas.width) {
          this.position.x = 0;
        }
      }

      if (this.force.x < 0) {
        if (this.position.x <= 0) {
          this.position.x = canvas.width;
        }
      }
    }
  }]);

  return Particle;
}();

exports.Particle = Particle;
},{}],"Knob.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
  https://raw.githubusercontent.com/nickells/knob/master/script.js
*/
var HAS_TOUCH = ('ontouchstart' in window);

function applyStyles(elem, styles) {
  for (var _i = 0, _Object$entries = Object.entries(styles); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        val = _Object$entries$_i[1];

    elem.style[key] = val;
  }
}

var notchStyles = {
  position: 'absolute',
  width: '6px',
  height: '1px',
  display: 'inline-block',
  backgroundColor: 'grey',
  transition: "transform 500ms"
};

var toDegrees = function toDegrees(radian) {
  return radian * (180 / Math.PI);
};

var toRadians = function toRadians(degree) {
  return degree * (Math.PI / 180);
};

function getCoord(evt) {
  return function (val) {
    var coord = val === 'X' ? 'clientX' : 'clientY';
    return HAS_TOUCH ? evt.touches[0][coord] : evt[coord];
  }; // switch to screen if parent has unknown width?
}

function within(val, min, max) {
  return val >= min && val <= max;
}

function nearestFromSet(num, set) {
  var lastItem;

  var _iterator = _createForOfIteratorHelper(set.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          item = _step$value[1];

      if (num === item) return item;else if (lastItem === undefined && num < item) {
        return item;
      } else if (num > lastItem && num < item) {
        return Math.abs(num - lastItem) > Math.abs(num - item) ? item : lastItem;
      } else if (index === set.length - 1) {
        return item;
      }
      lastItem = item;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function createNotches(spinner, degrees) {
  var radius = 25;
  var notch_offset = 15;
  degrees.forEach(function (degree, index) {
    degree -= 180;
    var notchPosition = {
      x: (radius + notch_offset) * Math.cos(toRadians(degree)) + radius - 3,
      y: (radius + notch_offset) * Math.sin(toRadians(degree)) + radius - 0
    };
    var notchElem = document.createElement('div');
    notchElem.classList.add('notchElem');
    applyStyles(notchElem, _objectSpread(_objectSpread({}, notchStyles), {}, {
      left: "".concat(notchPosition.x, "px"),
      top: "".concat(notchPosition.y, "px"),
      transform: "rotate(".concat(degree, "deg) scale(0)")
    }));
    spinner.appendChild(notchElem);
    setTimeout(function () {
      applyStyles(notchElem, {
        transform: "rotate(".concat(degree, "deg) scale(1)")
      });
    }, index * 50);
  });
}

function roundTo(num, to) {
  return Math.round(num / to) * to;
}

function degreeToValue(deg, DEGREES_DEAD_AREA, min, max) {
  // calc offset
  var offset = DEGREES_DEAD_AREA / 2;
  var newDeg = 360 - deg;
  if (newDeg < 90) newDeg += 360;
  newDeg = newDeg - 90 - offset;
  newDeg = newDeg / (360 - DEGREES_DEAD_AREA);
  newDeg = min + newDeg * (max - min);
  return newDeg;
}

function valueToDegree(val, DEGREES_DEAD_AREA, min, max) {
  // calc offset
  var offset = DEGREES_DEAD_AREA / 2; // get degrees out of 360 (minus offset)

  var deg = (val - min) / (max - min) * (360 - DEGREES_DEAD_AREA); // flip directions (and orientation)

  deg = 270 - deg; // account for dead-area offset

  deg -= offset;
  return deg;
}

function Knob(_ref) {
  var elem = _ref.selector,
      notchesCount = _ref.notches,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 100 : _ref$max,
      _ref$deadArea = _ref.deadArea,
      DEGREES_DEAD_AREA = _ref$deadArea === void 0 ? 90 : _ref$deadArea;
  var spinner = elem;
  var inner = elem.firstChild;

  var _onChange = function _onChange() {}; // if there is a dead zone, add 1 to notchescount to spread evenly. otherwise it will overlap at the 360 mark


  var degreeInterval = (360 - DEGREES_DEAD_AREA) / (DEGREES_DEAD_AREA ? notchesCount - 1 : notchesCount) || 1; // create degrees to map to, and notches

  var degreesSet = [];
  var degreesStart = 270 - DEGREES_DEAD_AREA / 2; // assume 360 degrees, and 0 is at 3:00 position (CCW), then move it to this new starting point

  for (var notch = 0; notch < notchesCount; notch++) {
    var val = degreesStart - notch * degreeInterval;
    val = (val + 360) % 360;
    degreesSet.push(val);
  } // reverse the degree set so animation works


  createNotches(spinner, degreesSet.reverse()); // sort the degree set so we can properly get the closest match algorithmically

  degreesSet.sort(function (a, b) {
    return a - b;
  });
  var lastDeg = 0,
      active = false;

  function onRelease(e) {
    if (active) {
      spinner.classList.remove('is-active');
      document.body.classList.remove('is-grabbing');
      active = false;
    }
  }

  function rotate(deg) {
    lastDeg = deg; // change degree to match CSS's interpretation of geometry
    // and because the notch is vertical upon start

    inner.style.transform = "rotate(".concat(90 - deg, "deg)");
  }

  function onMove(e) {
    var getCoordForElement = getCoord(e);
    e.preventDefault();

    if (active) {
      var center = {
        x: spinner.offsetLeft + spinner.offsetWidth / 2,
        y: spinner.offsetTop + spinner.offsetHeight / 2
      };
      var diffX = getCoordForElement('X') - center.x;
      var diffY = center.y - getCoordForElement('Y'); // because Y is upside down from regular math

      var arctan = Math.atan2(diffY, diffX);
      var deg = (toDegrees(arctan) + 360) % 360;
      var roundDeg = nearestFromSet(deg, degreesSet);
      if (Math.abs(roundDeg) === Math.abs(lastDeg)) return;else {
        rotate(roundDeg);
        navigator.vibrate && navigator.vibrate([50]);

        _onChange(degreeToValue(roundDeg, DEGREES_DEAD_AREA, min, max));
      }
    }
  }

  function onGrab(e) {
    if (!active) {
      active = true;
      spinner.classList.add('is-active');
      document.body.classList.add('is-grabbing');
      onMove(e);
    }
  }

  spinner.addEventListener('mousedown', onGrab, false);
  spinner.addEventListener('mousedown', onGrab, false);
  spinner.addEventListener('touchstart', onGrab, false);
  window.addEventListener('mouseup', onRelease, false);
  window.addEventListener('touchend', onRelease, false);
  window.addEventListener('mousemove', onMove, false);
  window.addEventListener('touchmove', onMove, false);
  return {
    setValue: function setValue(val) {
      rotate(valueToDegree(val, DEGREES_DEAD_AREA, min, max));
      return this;
    },
    onChange: function onChange(func) {
      _onChange = func;
      return this;
    }
  };
}

var _default = Knob;
exports.default = _default;
},{}],"UI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.INITIAL_VALUES = void 0;

var _Knob = _interopRequireDefault(require("./Knob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_VALUES = {
  lifespan: 1620,
  autonomy: 1,
  size: 5,
  intensity: 100,
  gravity: -0.1,
  wind: 0
};
exports.INITIAL_VALUES = INITIAL_VALUES;

var init = function init(fieldInstance) {
  var lifespan = new _Knob.default({
    notches: 16,
    min: 100,
    max: 2000,
    selector: document.getElementById('knob-1')
  }).setValue(INITIAL_VALUES.lifespan).onChange(function (val) {
    var _val = Math.round(val);

    fieldInstance.setConfig({
      lifespan: _val === 2000 ? Infinity : _val
    });
  });
  var autonomy = new _Knob.default({
    notches: 6,
    min: 0,
    max: 5,
    selector: document.getElementById('knob-2')
  }).setValue(INITIAL_VALUES.autonomy).onChange(function (val) {
    fieldInstance.setConfig({
      autonomy: Math.round(val)
    });
  });
  var size = new _Knob.default({
    notches: 8,
    min: 2,
    max: 9,
    selector: document.getElementById('knob-3')
  }).setValue(INITIAL_VALUES.size).onChange(function (val) {
    fieldInstance.setConfig({
      size: Math.round(val)
    });
  });
  var intensity = new _Knob.default({
    notches: 16,
    min: 0,
    max: 100,
    selector: document.getElementById('knob-4')
  }).setValue(INITIAL_VALUES.intensity).onChange(function (val) {
    fieldInstance.setConfig({
      intensity: Math.round(val)
    });
  });
};

exports.init = init;
},{"./Knob":"Knob.js"}],"Field.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = void 0;

var _Particle = require("./Particle");

var _UI = require("./UI");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Field = /*#__PURE__*/function () {
  function Field() {
    var _this = this;

    _classCallCheck(this, Field);

    _defineProperty(this, "setConfig", function (keyVal) {
      _this.particleConfig = _objectSpread(_objectSpread({}, _this.particleConfig), keyVal);

      _this.particles.forEach(function (particle) {
        return particle.setConfig(_this.particleConfig);
      });
    });

    _defineProperty(this, "onResize", function () {
      _this.canvas.width = window.innerWidth;
      _this.canvas.height = window.innerHeight - document.getElementById('hud').getBoundingClientRect().height;
    });

    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - document.getElementById('hud').getBoundingClientRect().height;
    this.context = this.canvas.getContext('2d');
    this.particles = new Set();
    document.body.appendChild(this.canvas);
    this.gravity = -0.1;
    this.wind = 0;
    this.particleConfig = _objectSpread({}, _UI.INITIAL_VALUES);
  }

  _createClass(Field, [{
    key: "update",
    value: function update(timestamp) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles.forEach(function (particle) {
        return particle.update(timestamp);
      });
    }
  }, {
    key: "updateForces",
    value: function updateForces(x, y) {
      var _this2 = this;

      var divisor = 1000;
      this.gravity = -y / divisor;
      this.wind = x / divisor;
      this.particles.forEach(function (particle) {
        particle.setGravity(_this2.gravity);
        particle.setWind(_this2.wind);
      });
    }
  }, {
    key: "addParticle",
    value: function addParticle(particle) {
      var _this3 = this;

      particle.setContext(this.context);
      particle.setGravity(this.gravity);
      particle.setWind(this.wind);
      particle.setConfig(this.particleConfig);
      this.particles.add(particle);
      particle.onDelete(function (particle) {
        _this3.particles.delete(particle);
      });
    }
  }, {
    key: "start",
    value: function start() {
      var _this4 = this;

      var startParticles = function startParticles() {
        _this4.addParticle(new _Particle.Particle({
          startPosition: {
            x: Math.random() * _this4.canvas.width,
            y: _this4.gravity < 0 ? 1 : -(_this4.canvas.height - _this4.particleConfig.size)
          }
        }));

        var interval = 100 - _this4.particleConfig.intensity;
        _this4.timeout = setTimeout(startParticles, interval);
      };

      startParticles();
    }
  }, {
    key: "stop",
    value: function stop() {
      clearTimeout(this.timeout);
    }
  }]);

  return Field;
}();

exports.Field = Field;
},{"./Particle":"Particle.js","./UI":"UI.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _drawForce = require("./draw-force");

var _Field = require("./Field");

var _UI = require("./UI");

/*
  get gravity/wind into one config called forces
  lifespan 100 pauses spawning
  color?
  blur?
*/
var field = new _Field.Field();
var drawController = new _drawForce.DrawForceController(field.context);
drawController.onChange(function (x, y) {
  field.updateForces(x, y);
});
field.start();

var debounce = function debounce(func) {
  var timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = setTimeout(function () {
      return func.apply(void 0, args);
    }, 300);
  };
};

window.addEventListener('resize', debounce(field.onResize));

var loop = function loop(timestamp) {
  field.update(timestamp);
  drawController.update();
  requestAnimationFrame(loop);
};

(0, _UI.init)(field);
loop();
},{"./draw-force":"draw-force.js","./Field":"Field.js","./UI":"UI.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52345" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/particles.e31bb0bc.js.map