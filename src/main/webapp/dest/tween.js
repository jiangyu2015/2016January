/*
 * CSSPlugin
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module TweenJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {
    "use strict";

    /**
     * A TweenJS plugin for working with numeric CSS string properties (ex. top, left). To use simply install after
     * TweenJS has loaded:
     *
     *      createjs.CSSPlugin.install();
     *
     * You can adjust the CSS properties it will work with by modifying the <code>cssSuffixMap</code> property. Currently,
     * the top, left, bottom, right, width, height have a "px" suffix appended.
     *
     * Please note that the CSS Plugin is not included in the TweenJS minified file.
     * @class CSSPlugin
     * @constructor
     **/
    function CSSPlugin() {
        throw("CSSPlugin cannot be instantiated.")
    }


// static properties
    /**
     * Defines the default suffix map for CSS tweens. This can be overridden on a per tween basis by specifying a
     * cssSuffixMap value for the individual tween. The object maps CSS property names to the suffix to use when
     * reading or setting those properties. For example a map in the form {top:"px"} specifies that when tweening
     * the "top" CSS property, it should use the "px" suffix (ex. target.style.top = "20.5px"). This only applies
     * to tweens with the "css" config property set to true.
     * @property cssSuffixMap
     * @type Object
     * @static
     **/
    CSSPlugin.cssSuffixMap = {top: "px", left: "px", bottom: "px", right: "px", width: "px", height: "px", opacity: ""};

    /**
     * @property priority
     * @protected
     * @static
     **/
    CSSPlugin.priority = -100; // very low priority, should run last


// static methods
    /**
     * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
     * @method install
     * @static
     **/
    CSSPlugin.install = function () {
        var arr = [], map = CSSPlugin.cssSuffixMap;
        for (var n in map) {
            arr.push(n);
        }
        createjs.Tween.installPlugin(CSSPlugin, arr);
    }

    /**
     * @method init
     * @protected
     * @static
     **/
    CSSPlugin.init = function (tween, prop, value) {
        var sfx0, sfx1, style, map = CSSPlugin.cssSuffixMap;
        if ((sfx0 = map[prop]) == null || !(style = tween.target.style)) {
            return value;
        }
        var str = style[prop];
        if (!str) {
            return 0;
        } // no style set.
        var i = str.length - sfx0.length;
        if ((sfx1 = str.substr(i)) != sfx0) {
            throw("CSSPlugin Error: Suffixes do not match. (" + sfx0 + ":" + sfx1 + ")");
        } else {
            return parseInt(str.substr(0, i));
        }
    }

    /**
     * @method step
     * @protected
     * @static
     **/
    CSSPlugin.step = function (tween, prop, startValue, endValue, injectProps) {
        // unused
    }

    /**
     * @method tween
     * @protected
     * @static
     **/
    CSSPlugin.tween = function (tween, prop, value, startValues, endValues, ratio, wait, end) {
        var style, map = CSSPlugin.cssSuffixMap;
        if (map[prop] == null || !(style = tween.target.style)) {
            return value;
        }
        style[prop] = value + map[prop];
        return createjs.Tween.IGNORE;
    }

    createjs.CSSPlugin = CSSPlugin;

}());

/*
 * Ease
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module TweenJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {
    "use strict";

    /**
     * The Ease class provides a collection of easing functions for use with TweenJS. It does not use the standard 4 param
     * easing signature. Instead it uses a single param which indicates the current linear ratio (0 to 1) of the tween.
     *
     * Most methods on Ease can be passed directly as easing functions:
     *
     *      Tween.get(target).to({x:100}, 500, Ease.linear);
     *
     * However, methods beginning with "get" will return an easing function based on parameter values:
     *
     *      Tween.get(target).to({y:200}, 500, Ease.getPowIn(2.2));
     *
     * Please see the <a href="http://www.createjs.com/Demos/TweenJS/Tween_SparkTable">spark table demo</a> for an
     * overview of the different ease types on <a href="http://tweenjs.com">TweenJS.com</a>.
     *
     * <em>Equations derived from work by Robert Penner.</em>
     * @class Ease
     * @static
     **/
    function Ease() {
        throw "Ease cannot be instantiated.";
    }


// static methods and properties
    /**
     * @method linear
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.linear = function (t) {
        return t;
    };

    /**
     * Identical to linear.
     * @method none
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.none = Ease.linear;

    /**
     * Mimics the simple -100 to 100 easing in Flash Pro.
     * @method get
     * @param {Number} amount A value from -1 (ease in) to 1 (ease out) indicating the strength and direction of the ease.
     * @static
     * @return {Function}
     **/
    Ease.get = function (amount) {
        if (amount < -1) {
            amount = -1;
        }
        if (amount > 1) {
            amount = 1;
        }
        return function (t) {
            if (amount == 0) {
                return t;
            }
            if (amount < 0) {
                return t * (t * -amount + 1 + amount);
            }
            return t * ((2 - t) * amount + (1 - amount));
        };
    };

    /**
     * Configurable exponential ease.
     * @method getPowIn
     * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
     * @static
     * @return {Function}
     **/
    Ease.getPowIn = function (pow) {
        return function (t) {
            return Math.pow(t, pow);
        };
    };

    /**
     * Configurable exponential ease.
     * @method getPowOut
     * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
     * @static
     * @return {Function}
     **/
    Ease.getPowOut = function (pow) {
        return function (t) {
            return 1 - Math.pow(1 - t, pow);
        };
    };

    /**
     * Configurable exponential ease.
     * @method getPowInOut
     * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
     * @static
     * @return {Function}
     **/
    Ease.getPowInOut = function (pow) {
        return function (t) {
            if ((t *= 2) < 1) return 0.5 * Math.pow(t, pow);
            return 1 - 0.5 * Math.abs(Math.pow(2 - t, pow));
        };
    };

    /**
     * @method quadIn
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.quadIn = Ease.getPowIn(2);
    /**
     * @method quadOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.quadOut = Ease.getPowOut(2);
    /**
     * @method quadInOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.quadInOut = Ease.getPowInOut(2);

    /**
     * @method cubicIn
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.cubicIn = Ease.getPowIn(3);
    /**
     * @method cubicOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.cubicOut = Ease.getPowOut(3);
    /**
     * @method cubicInOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.cubicInOut = Ease.getPowInOut(3);

    /**
     * @method quartIn
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.quartIn = Ease.getPowIn(4);
    /**
     * @method quartOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.quartOut = Ease.getPowOut(4);
    /**
     * @method quartInOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.quartInOut = Ease.getPowInOut(4);

    /**
     * @method quintIn
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.quintIn = Ease.getPowIn(5);
    /**
     * @method quintOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.quintOut = Ease.getPowOut(5);
    /**
     * @method quintInOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.quintInOut = Ease.getPowInOut(5);

    /**
     * @method sineIn
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.sineIn = function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
    };

    /**
     * @method sineOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.sineOut = function (t) {
        return Math.sin(t * Math.PI / 2);
    };

    /**
     * @method sineInOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.sineInOut = function (t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
    };

    /**
     * Configurable "back in" ease.
     * @method getBackIn
     * @param {Number} amount The strength of the ease.
     * @static
     * @return {Function}
     **/
    Ease.getBackIn = function (amount) {
        return function (t) {
            return t * t * ((amount + 1) * t - amount);
        };
    };
    /**
     * @method backIn
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.backIn = Ease.getBackIn(1.7);

    /**
     * Configurable "back out" ease.
     * @method getBackOut
     * @param {Number} amount The strength of the ease.
     * @static
     * @return {Function}
     **/
    Ease.getBackOut = function (amount) {
        return function (t) {
            return (--t * t * ((amount + 1) * t + amount) + 1);
        };
    };
    /**
     * @method backOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.backOut = Ease.getBackOut(1.7);

    /**
     * Configurable "back in out" ease.
     * @method getBackInOut
     * @param {Number} amount The strength of the ease.
     * @static
     * @return {Function}
     **/
    Ease.getBackInOut = function (amount) {
        amount *= 1.525;
        return function (t) {
            if ((t *= 2) < 1) return 0.5 * (t * t * ((amount + 1) * t - amount));
            return 0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2);
        };
    };
    /**
     * @method backInOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.backInOut = Ease.getBackInOut(1.7);

    /**
     * @method circIn
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.circIn = function (t) {
        return -(Math.sqrt(1 - t * t) - 1);
    };

    /**
     * @method circOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.circOut = function (t) {
        return Math.sqrt(1 - (--t) * t);
    };

    /**
     * @method circInOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.circInOut = function (t) {
        if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    };

    /**
     * @method bounceIn
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.bounceIn = function (t) {
        return 1 - Ease.bounceOut(1 - t);
    };

    /**
     * @method bounceOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.bounceOut = function (t) {
        if (t < 1 / 2.75) {
            return (7.5625 * t * t);
        } else if (t < 2 / 2.75) {
            return (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
        } else if (t < 2.5 / 2.75) {
            return (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
        } else {
            return (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
        }
    };

    /**
     * @method bounceInOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.bounceInOut = function (t) {
        if (t < 0.5) return Ease.bounceIn(t * 2) * .5;
        return Ease.bounceOut(t * 2 - 1) * 0.5 + 0.5;
    };

    /**
     * Configurable elastic ease.
     * @method getElasticIn
     * @param {Number} amplitude
     * @param {Number} period
     * @static
     * @return {Function}
     **/
    Ease.getElasticIn = function (amplitude, period) {
        var pi2 = Math.PI * 2;
        return function (t) {
            if (t == 0 || t == 1) return t;
            var s = period / pi2 * Math.asin(1 / amplitude);
            return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
        };
    };
    /**
     * @method elasticIn
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.elasticIn = Ease.getElasticIn(1, 0.3);

    /**
     * Configurable elastic ease.
     * @method getElasticOut
     * @param {Number} amplitude
     * @param {Number} period
     * @static
     * @return {Function}
     **/
    Ease.getElasticOut = function (amplitude, period) {
        var pi2 = Math.PI * 2;
        return function (t) {
            if (t == 0 || t == 1) return t;
            var s = period / pi2 * Math.asin(1 / amplitude);
            return (amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1);
        };
    };
    /**
     * @method elasticOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.elasticOut = Ease.getElasticOut(1, 0.3);

    /**
     * Configurable elastic ease.
     * @method getElasticInOut
     * @param {Number} amplitude
     * @param {Number} period
     * @static
     * @return {Function}
     **/
    Ease.getElasticInOut = function (amplitude, period) {
        var pi2 = Math.PI * 2;
        return function (t) {
            var s = period / pi2 * Math.asin(1 / amplitude);
            if ((t *= 2) < 1) return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
            return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1;
        };
    };
    /**
     * @method elasticInOut
     * @param {Number} t
     * @static
     * @return {Number}
     **/
    Ease.elasticInOut = Ease.getElasticInOut(1, 0.3 * 1.5);

    createjs.Ease = Ease;

}());

/*
 * MotionGuidePlugin
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module TweenJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {
    "use strict";

    /**
     * A TweenJS plugin for working with motion guides.
     *
     * To use, install the plugin after TweenJS has loaded. Next tween the 'guide' property with an object as detailed below.
     *
     *       createjs.MotionGuidePlugin.install();
     *
     * <h4>Example</h4>
     *
     *      // Using a Motion Guide
     *        createjs.Tween.get(target).to({guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},7000);
     *        // Visualizing the line
     *        graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
     *
     * Each path needs pre-computation to ensure there's fast performance. Because of the pre-computation there's no
     * built in support for path changes mid tween. These are the Guide Object's properties:<UL>
     *      <LI> path: Required, Array : The x/y points used to draw the path with a moveTo and 1 to n curveTo calls.</LI>
     *      <LI> start: Optional, 0-1 : Initial position, default 0 except for when continuing along the same path.</LI>
     *      <LI> end: Optional, 0-1 : Final position, default 1 if not specified.</LI>
     *      <LI> orient: Optional, string : "fixed"/"auto"/"cw"/"ccw"<UL>
     *                <LI>"fixed" forces the object to face down the path all movement (relative to start rotation),</LI>
     *            <LI>"auto" rotates the object along the path relative to the line.</LI>
     *            <LI>"cw"/"ccw" force clockwise or counter clockwise rotations including flash like behaviour</LI>
     *        </UL></LI>
     * </UL>
     * Guide objects should not be shared between tweens even if all properties are identical, the library stores
     * information on these objects in the background and sharing them can cause unexpected behaviour. Values
     * outside 0-1 range of tweens will be a "best guess" from the appropriate part of the defined curve.
     *
     * @class MotionGuidePlugin
     * @constructor
     **/
    function MotionGuidePlugin() {
        throw("MotionGuidePlugin cannot be instantiated.")
    };


// static properties:
    /**
     * @property priority
     * @protected
     * @static
     **/
    MotionGuidePlugin.priority = 0; // high priority, should run sooner

    /**
     * @property temporary variable storage
     * @private
     * @static
     */
    MotionGuidePlugin._rotOffS;
    /**
     * @property temporary variable storage
     * @private
     * @static
     */
    MotionGuidePlugin._rotOffE;
    /**
     * @property temporary variable storage
     * @private
     * @static
     */
    MotionGuidePlugin._rotNormS;
    /**
     * @property temporary variable storage
     * @private
     * @static
     */
    MotionGuidePlugin._rotNormE;


// static methods
    /**
     * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
     * @method install
     * @static
     **/
    MotionGuidePlugin.install = function () {
        createjs.Tween.installPlugin(MotionGuidePlugin, ["guide", "x", "y", "rotation"]);
        return createjs.Tween.IGNORE;
    };

    /**
     * @method init
     * @protected
     * @static
     **/
    MotionGuidePlugin.init = function (tween, prop, value) {
        var target = tween.target;
        if (!target.hasOwnProperty("x")) {
            target.x = 0;
        }
        if (!target.hasOwnProperty("y")) {
            target.y = 0;
        }
        if (!target.hasOwnProperty("rotation")) {
            target.rotation = 0;
        }

        if (prop == "rotation") {
            tween.__needsRot = true;
        }
        return prop == "guide" ? null : value;
    };

    /**
     * @method step
     * @protected
     * @static
     **/
    MotionGuidePlugin.step = function (tween, prop, startValue, endValue, injectProps) {
        // other props
        if (prop == "rotation") {
            tween.__rotGlobalS = startValue;
            tween.__rotGlobalE = endValue;
            MotionGuidePlugin.testRotData(tween, injectProps);
        }
        if (prop != "guide") {
            return endValue;
        }

        // guide only information - Start -
        var temp, data = endValue;
        if (!data.hasOwnProperty("path")) {
            data.path = [];
        }
        var path = data.path;
        if (!data.hasOwnProperty("end")) {
            data.end = 1;
        }
        if (!data.hasOwnProperty("start")) {
            data.start = (startValue && startValue.hasOwnProperty("end") && startValue.path === path) ? startValue.end : 0;
        }

        // Figure out subline information
        if (data.hasOwnProperty("_segments") && data._length) {
            return endValue;
        }
        var l = path.length;
        var accuracy = 10;		// Adjust to improve line following precision but sacrifice performance (# of seg)
        if (l >= 6 && (l - 2) % 4 == 0) {	// Enough points && contains correct number per entry ignoring start
            data._segments = [];
            data._length = 0;
            for (var i = 2; i < l; i += 4) {
                var sx = path[i - 2], sy = path[i - 1];
                var cx = path[i + 0], cy = path[i + 1];
                var ex = path[i + 2], ey = path[i + 3];
                var oldX = sx, oldY = sy;
                var tempX, tempY, total = 0;
                var sublines = [];
                for (var j = 1; j <= accuracy; j++) {
                    var t = j / accuracy;
                    var inv = 1 - t;
                    tempX = inv * inv * sx + 2 * inv * t * cx + t * t * ex;
                    tempY = inv * inv * sy + 2 * inv * t * cy + t * t * ey;
                    total += sublines[sublines.push(Math.sqrt((temp = tempX - oldX) * temp + (temp = tempY - oldY) * temp)) - 1];
                    oldX = tempX;
                    oldY = tempY;
                }
                data._segments.push(total);
                data._segments.push(sublines);
                data._length += total;
            }
        } else {
            throw("invalid 'path' data, please see documentation for valid paths");
        }

        // Setup x/y tweens
        temp = data.orient;
        data.orient = true;
        var o = {};
        MotionGuidePlugin.calc(data, data.start, o);
        tween.__rotPathS = Number(o.rotation.toFixed(5));
        MotionGuidePlugin.calc(data, data.end, o);
        tween.__rotPathE = Number(o.rotation.toFixed(5));
        data.orient = false;	//here and now we don't know if we need to
        MotionGuidePlugin.calc(data, data.end, injectProps);
        data.orient = temp;

        // Setup rotation properties
        if (!data.orient) {
            return endValue;
        }
        tween.__guideData = data;
        MotionGuidePlugin.testRotData(tween, injectProps);
        return endValue;
    };

    /**
     * @method testRotData
     * @protected
     * @static
     **/
    MotionGuidePlugin.testRotData = function (tween, injectProps) {

        // no rotation informat? if we need it come back, if we don't use 0 & ensure we have guide data
        if (tween.__rotGlobalS === undefined || tween.__rotGlobalE === undefined) {
            if (tween.__needsRot) {
                return;
            }
            if (tween._curQueueProps.rotation !== undefined) {
                tween.__rotGlobalS = tween.__rotGlobalE = tween._curQueueProps.rotation;
            } else {
                tween.__rotGlobalS = tween.__rotGlobalE = injectProps.rotation = tween.target.rotation || 0;
            }
        }
        if (tween.__guideData === undefined) {
            return;
        }

        // Process rotation properties
        var data = tween.__guideData;
        var rotGlobalD = tween.__rotGlobalE - tween.__rotGlobalS;
        var rotPathD = tween.__rotPathE - tween.__rotPathS;
        var rot = rotGlobalD - rotPathD;

        if (data.orient == "auto") {
            if (rot > 180) {
                rot -= 360;
            }
            else if (rot < -180) {
                rot += 360;
            }

        } else if (data.orient == "cw") {
            while (rot < 0) {
                rot += 360;
            }
            if (rot == 0 && rotGlobalD > 0 && rotGlobalD != 180) {
                rot += 360;
            }

        } else if (data.orient == "ccw") {
            rot = rotGlobalD - ((rotPathD > 180) ? (360 - rotPathD) : (rotPathD));	// sign flipping on path
            while (rot > 0) {
                rot -= 360;
            }
            if (rot == 0 && rotGlobalD < 0 && rotGlobalD != -180) {
                rot -= 360;
            }
        }

        data.rotDelta = rot;
        data.rotOffS = tween.__rotGlobalS - tween.__rotPathS;

        // reset
        tween.__rotGlobalS = tween.__rotGlobalE = tween.__guideData = tween.__needsRot = undefined;
    };

    /**
     * @method tween
     * @protected
     * @static
     **/
    MotionGuidePlugin.tween = function (tween, prop, value, startValues, endValues, ratio, wait, end) {
        var data = endValues.guide;
        if (data == undefined || data === startValues.guide) {
            return value;
        }
        if (data.lastRatio != ratio) {
            // first time through so calculate what I need to
            var t = ((data.end - data.start) * (wait ? data.end : ratio) + data.start);
            MotionGuidePlugin.calc(data, t, tween.target);
            switch (data.orient) {
                case "cw":		// mix in the original rotation
                case "ccw":
                case "auto":
                    tween.target.rotation += data.rotOffS + data.rotDelta * ratio;
                    break;
                case "fixed":	// follow fixed behaviour to solve potential issues
                default:
                    tween.target.rotation += data.rotOffS;
                    break;
            }
            data.lastRatio = ratio;
        }
        if (prop == "rotation" && ((!data.orient) || data.orient == "false")) {
            return value;
        }
        return tween.target[prop];
    };

    /**
     * Determine the appropriate x/y/rotation information about a path for a given ratio along the path.
     * Assumes a path object with all optional parameters specified.
     * @param data Data object you would pass to the "guide:" property in a Tween
     * @param ratio 0-1 Distance along path, values outside 0-1 are "best guess"
     * @param target Object to copy the results onto, will use a new object if not supplied.
     * @return {Object} The target object or a new object w/ the tweened properties
     * @static
     */
    MotionGuidePlugin.calc = function (data, ratio, target) {
        if (data._segments == undefined) {
            throw("Missing critical pre-calculated information, please file a bug");
        }
        if (target == undefined) {
            target = {x: 0, y: 0, rotation: 0};
        }
        var seg = data._segments;
        var path = data.path;

        // find segment
        var pos = data._length * ratio;
        var cap = seg.length - 2;
        var n = 0;
        while (pos > seg[n] && n < cap) {
            pos -= seg[n];
            n += 2;
        }

        // find subline
        var sublines = seg[n + 1];
        var i = 0;
        cap = sublines.length - 1;
        while (pos > sublines[i] && i < cap) {
            pos -= sublines[i];
            i++;
        }
        var t = (i / ++cap) + (pos / (cap * sublines[i]));

        // find x/y
        n = (n * 2) + 2;
        var inv = 1 - t;
        target.x = inv * inv * path[n - 2] + 2 * inv * t * path[n + 0] + t * t * path[n + 2];
        target.y = inv * inv * path[n - 1] + 2 * inv * t * path[n + 1] + t * t * path[n + 3];

        // orientation
        if (data.orient) {
            target.rotation = 57.2957795 * Math.atan2(
                    (path[n + 1] - path[n - 1]) * inv + (path[n + 3] - path[n + 1]) * t,
                    (path[n + 0] - path[n - 2]) * inv + (path[n + 2] - path[n + 0]) * t);
        }

        return target;
    };

    createjs.MotionGuidePlugin = MotionGuidePlugin;

}());

/*
 * SamplePlugin
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module TweenJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {
    "use strict";

    /**
     * A sample TweenJS plugin. This plugin does not actually affect tweens in any way, it's merely intended to document
     * how to build TweenJS plugins. Please look at the code for inline comments.
     *
     * A TweenJS plugin is simply an object that exposes one property (priority), and three methods (init, step, and tween).
     * Generally a plugin will also expose an <code>install</code> method as well, though this is not strictly necessary.
     * @class SamplePlugin
     * @constructor
     **/
    function SamplePlugin() {
        throw("SamplePlugin cannot be instantiated.")
    };

// static interface:
    /**
     * Used by TweenJS to determine when to call this plugin. Plugins with higher priority have their methods called
     * before plugins with lower priority. The priority value can be any positive or negative number.
     * @property priority
     * @static
     **/
    SamplePlugin.priority = 0;

    /**
     * Installs this plugin for use with TweenJS, and registers for a list of properties that this plugin will operate
     * with. Call this once after TweenJS is loaded to enable this plugin.
     * @method install
     * @static
     **/
    SamplePlugin.install = function () {
        // this registers this plugin to work with the "test" property.
        createjs.Tween.installPlugin(SamplePlugin, ["test"]);
    };

    /**
     * Called by TweenJS when a new tween property initializes that this plugin is registered for. Generally, the call
     * to <code>Plugin.init</code> will be immediately followed by a call to <code>Plugin.step</code>.
     * @method init
     * @param {Tween} tween The related tween instance.
     * @param {String} prop The name of the property that is being initialized.
     * @param {any} value The current value of the property on the tween's target.
     * @return {any} The starting tween value for the property. In most cases, you would simply
     * return the value parameter, but some plugins may need to modify the starting value.
     * @static
     **/
    SamplePlugin.init = function (tween, prop, value) {
        console.log("init", prop, value);

        // return the unmodified property value:
        return value;
    };

    /**
     * Called by TweenJS when a new step is added to a tween that includes a property the plugin is registered for (ie.
     * a new "to" action is added to a tween).
     * @method init
     * @param {Tween} tween The related tween instance.
     * @param {String} prop The name of the property being tweened.
     * @param {any} startValue The value of the property at the beginning of the step. This will
     * be the same as the init value if this is the first step, or the same as the
     * endValue of the previous step if not.
     * @param {Object} injectProps A generic object to which the plugin can append other properties which should be updated on this step.
     * @param {any} endValue The value of the property at the end of the step.
     * @static
     **/
    SamplePlugin.step = function (tween, prop, startValue, endValue, injectProps) {
        console.log("to: ", prop, startValue, endValue);
    };

    /**
     * Called when a tween property advances that this plugin is registered for.
     * @method tween
     * @param {Tween} tween The related tween instance.
     * @param {String} prop The name of the property being tweened.
     * @param {any} value The current tweened value of the property, as calculated by TweenJS.
     * @param {Object} startValues A hash of all of the property values at the start of the current
     * step. You could access the start value of the current property using
     * startValues[prop].
     * @param {Object} endValues A hash of all of the property values at the end of the current
     * step.
     * @param {Number} ratio A value indicating the eased progress through the current step. This
     * number is generally between 0 and 1, though some eases will generate values outside
     * this range.
     * @param {Boolean} wait Indicates whether the current step is a "wait" step.
     * @param {Boolean} end Indicates that the tween has reached the end.
     * @return {any} Return the value that should be assigned to the target property. For example
     * returning <code>Math.round(value)</code> would assign the default calculated value
     * as an integer. Returning Tween.IGNORE will prevent Tween from assigning a value to
     * the target property.
     * @static
     **/
    SamplePlugin.tween = function (tween, prop, value, startValues, endValues, ratio, wait, end) {
        // ratio is the eased ratio
        console.log("tween", prop, value, ratio, wait, end);

        // return the unmodified calculated tween value (use the default tweening behaviour):
        return value;
    };


    createjs.SamplePlugin = SamplePlugin;

}());

/*
 * Timeline
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module TweenJS
 */

// namespace:
this.createjs = this.createjs || {};


(function () {
    "use strict";


// constructor
    /**
     * The Timeline class synchronizes multiple tweens and allows them to be controlled as a group. Please note that if a
     * timeline is looping, the tweens on it may appear to loop even if the "loop" property of the tween is false.
     * @class Timeline
     * @param {Array} tweens An array of Tweens to add to this timeline. See {{#crossLink "Timeline/addTween"}}{{/crossLink}}
     * for more info.
     * @param {Object} labels An object defining labels for using {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}.
     * See {{#crossLink "Timeline/setLabels"}}{{/crossLink}}
     * for details.
     * @param {Object} props The configuration properties to apply to this tween instance (ex. `{loop:true}`). All properties
     * default to false. Supported props are:<UL>
     *    <LI> loop: sets the loop property on this tween.</LI>
     *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
     *    <LI> ignoreGlobalPause: sets the ignoreGlobalPause property on this tween.</LI>
     *    <LI> paused: indicates whether to start the tween paused.</LI>
     *    <LI> position: indicates the initial position for this timeline.</LI>
     *    <LI> onChange: specifies a listener to add for the {{#crossLink "Timeline/change:event"}}{{/crossLink}} event.</LI>
     * </UL>
     * @extends EventDispatcher
     * @constructor
     **/
    function Timeline(tweens, labels, props) {
        this.EventDispatcher_constructor();

        // public properties:
        /**
         * Causes this timeline to continue playing when a global pause is active.
         * @property ignoreGlobalPause
         * @type Boolean
         **/
        this.ignoreGlobalPause = false;

        /**
         * The total duration of this timeline in milliseconds (or ticks if `useTicks `is `true`). This value is usually
         * automatically updated as you modify the timeline. See {{#crossLink "Timeline/updateDuration"}}{{/crossLink}}
         * for more information.
         * @property duration
         * @type Number
         * @default 0
         * @readonly
         **/
        this.duration = 0;

        /**
         * If true, the timeline will loop when it reaches the end. Can be set via the props param.
         * @property loop
         * @type Boolean
         **/
        this.loop = false;

        /**
         * The current normalized position of the timeline. This will always be a value between 0 and
         * {{#crossLink "Timeline/duration:property"}}{{/crossLink}}.
         * Changing this property directly will have no effect.
         * @property position
         * @type Object
         * @readonly
         **/
        this.position = null;

        // private properties:
        /**
         * @property _paused
         * @type Boolean
         * @protected
         **/
        this._paused = false;

        /**
         * @property _tweens
         * @type Array[Tween]
         * @protected
         **/
        this._tweens = [];

        /**
         * @property _labels
         * @type Object
         * @protected
         **/
        this._labels = null;

        /**
         * @property _labelList
         * @type Array[Object]
         * @protected
         **/
        this._labelList = null;

        /**
         * @property _prevPosition
         * @type Number
         * @default 0
         * @protected
         **/
        this._prevPosition = 0;

        /**
         * @property _prevPos
         * @type Number
         * @default -1
         * @protected
         **/
        this._prevPos = -1;

        /**
         * @property _useTicks
         * @type Boolean
         * @default false
         * @protected
         **/
        this._useTicks = false;

        /**
         * Indicates whether the timeline is currently registered with Tween.
         * @property _registered
         * @type {boolean}
         * @default false
         * @protected
         */
        this._registered = false;


        if (props) {
            this._useTicks = props.useTicks;
            this.loop = props.loop;
            this.ignoreGlobalPause = props.ignoreGlobalPause;
            props.onChange && this.addEventListener("change", props.onChange);
        }
        if (tweens) {
            this.addTween.apply(this, tweens);
        }
        this.setLabels(labels);
        if (props && props.paused) {
            this._paused = true;
        }
        else {
            createjs.Tween._register(this, true);
        }
        if (props && props.position != null) {
            this.setPosition(props.position, createjs.Tween.NONE);
        }

    };

    var p = createjs.extend(Timeline, createjs.EventDispatcher);

    // TODO: deprecated
    // p.initialize = function() {}; // searchable for devs wondering where it is. REMOVED. See docs for details.


// events:
    /**
     * Called whenever the timeline's position changes.
     * @event change
     * @since 0.5.0
     **/


// public methods:
    /**
     * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the
     * normal ticking system) and managed by this timeline. Adding a tween to multiple timelines will result in
     * unexpected behaviour.
     * @method addTween
     * @param {Tween} ...tween The tween(s) to add. Accepts multiple arguments.
     * @return {Tween} The first tween that was passed in.
     **/
    p.addTween = function (tween) {
        var l = arguments.length;
        if (l > 1) {
            for (var i = 0; i < l; i++) {
                this.addTween(arguments[i]);
            }
            return arguments[0];
        } else if (l == 0) {
            return null;
        }
        this.removeTween(tween);
        this._tweens.push(tween);
        tween.setPaused(true);
        tween._paused = false;
        tween._useTicks = this._useTicks;
        if (tween.duration > this.duration) {
            this.duration = tween.duration;
        }
        if (this._prevPos >= 0) {
            tween.setPosition(this._prevPos, createjs.Tween.NONE);
        }
        return tween;
    };

    /**
     * Removes one or more tweens from this timeline.
     * @method removeTween
     * @param {Tween} ...tween The tween(s) to remove. Accepts multiple arguments.
     * @return Boolean Returns `true` if all of the tweens were successfully removed.
     **/
    p.removeTween = function (tween) {
        var l = arguments.length;
        if (l > 1) {
            var good = true;
            for (var i = 0; i < l; i++) {
                good = good && this.removeTween(arguments[i]);
            }
            return good;
        } else if (l == 0) {
            return false;
        }

        var tweens = this._tweens;
        var i = tweens.length;
        while (i--) {
            if (tweens[i] == tween) {
                tweens.splice(i, 1);
                if (tween.duration >= this.duration) {
                    this.updateDuration();
                }
                return true;
            }
        }
        return false;
    };

    /**
     * Adds a label that can be used with {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}.
     * @method addLabel
     * @param {String} label The label name.
     * @param {Number} position The position this label represents.
     **/
    p.addLabel = function (label, position) {
        this._labels[label] = position;
        var list = this._labelList;
        if (list) {
            for (var i = 0, l = list.length; i < l; i++) {
                if (position < list[i].position) {
                    break;
                }
            }
            list.splice(i, 0, {label: label, position: position});
        }
    };

    /**
     * Defines labels for use with gotoAndPlay/Stop. Overwrites any previously set labels.
     * @method setLabels
     * @param {Object} o An object defining labels for using {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}
     * in the form `{labelName:time}` where time is in milliseconds (or ticks if `useTicks` is `true`).
     **/
    p.setLabels = function (o) {
        this._labels = o ? o : {};
    };

    /**
     * Returns a sorted list of the labels defined on this timeline.
     * @method getLabels
     * @return {Array[Object]} A sorted array of objects with label and position properties.
     **/
    p.getLabels = function () {
        var list = this._labelList;
        if (!list) {
            list = this._labelList = [];
            var labels = this._labels;
            for (var n in labels) {
                list.push({label: n, position: labels[n]});
            }
            list.sort(function (a, b) {
                return a.position - b.position;
            });
        }
        return list;
    };

    /**
     * Returns the name of the label on or immediately before the current position. For example, given a timeline with
     * two labels, "first" on frame index 4, and "second" on frame 8, getCurrentLabel would return:
     * <UL>
     *        <LI>null if the current position is 2.</LI>
     *        <LI>"first" if the current position is 4.</LI>
     *        <LI>"first" if the current position is 7.</LI>
     *        <LI>"second" if the current position is 15.</LI>
     * </UL>
     * @method getCurrentLabel
     * @return {String} The name of the current label or null if there is no label
     **/
    p.getCurrentLabel = function () {
        var labels = this.getLabels();
        var pos = this.position;
        var l = labels.length;
        if (l) {
            for (var i = 0; i < l; i++) {
                if (pos < labels[i].position) {
                    break;
                }
            }
            return (i == 0) ? null : labels[i - 1].label;
        }
        return null;
    };

    /**
     * Unpauses this timeline and jumps to the specified position or label.
     * @method gotoAndPlay
     * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`)
     * or label to jump to.
     **/
    p.gotoAndPlay = function (positionOrLabel) {
        this.setPaused(false);
        this._goto(positionOrLabel);
    };

    /**
     * Pauses this timeline and jumps to the specified position or label.
     * @method gotoAndStop
     * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`) or label
     * to jump to.
     **/
    p.gotoAndStop = function (positionOrLabel) {
        this.setPaused(true);
        this._goto(positionOrLabel);
    };

    /**
     * Advances the timeline to the specified position.
     * @method setPosition
     * @param {Number} value The position to seek to in milliseconds (or ticks if `useTicks` is `true`).
     * @param {Number} [actionsMode] parameter specifying how actions are handled. See the Tween {{#crossLink "Tween/setPosition"}}{{/crossLink}}
     * method for more details.
     * @return {Boolean} Returns `true` if the timeline is complete (ie. the full timeline has run & {{#crossLink "Timeline/loop:property"}}{{/crossLink}}
     * is `false`).
     **/
    p.setPosition = function (value, actionsMode) {
        var t = this._calcPosition(value);
        var end = !this.loop && value >= this.duration;
        if (t == this._prevPos) {
            return end;
        }
        this._prevPosition = value;
        this.position = this._prevPos = t; // in case an action changes the current frame.
        for (var i = 0, l = this._tweens.length; i < l; i++) {
            this._tweens[i].setPosition(t, actionsMode);
            if (t != this._prevPos) {
                return false;
            } // an action changed this timeline's position.
        }
        if (end) {
            this.setPaused(true);
        }
        this.dispatchEvent("change");
        return end;
    };

    /**
     * Pauses or plays this timeline.
     * @method setPaused
     * @param {Boolean} value Indicates whether the tween should be paused (`true`) or played (`false`).
     **/
    p.setPaused = function (value) {
        this._paused = !!value;
        createjs.Tween._register(this, !value);
    };

    /**
     * Recalculates the duration of the timeline. The duration is automatically updated when tweens are added or removed,
     * but this method is useful if you modify a tween after it was added to the timeline.
     * @method updateDuration
     **/
    p.updateDuration = function () {
        this.duration = 0;
        for (var i = 0, l = this._tweens.length; i < l; i++) {
            var tween = this._tweens[i];
            if (tween.duration > this.duration) {
                this.duration = tween.duration;
            }
        }
    };

    /**
     * Advances this timeline by the specified amount of time in milliseconds (or ticks if `useTicks` is `true`).
     * This is normally called automatically by the Tween engine (via the {{#crossLink "Tween/tick:event"}}{{/crossLink}}
     * event), but is exposed for advanced uses.
     * @method tick
     * @param {Number} delta The time to advance in milliseconds (or ticks if useTicks is true).
     **/
    p.tick = function (delta) {
        this.setPosition(this._prevPosition + delta);
    };

    /**
     * If a numeric position is passed, it is returned unchanged. If a string is passed, the position of the
     * corresponding frame label will be returned, or `null` if a matching label is not defined.
     * @method resolve
     * @param {String|Number} positionOrLabel A numeric position value or label string.
     **/
    p.resolve = function (positionOrLabel) {
        var pos = Number(positionOrLabel);
        if (isNaN(pos)) {
            pos = this._labels[positionOrLabel];
        }
        return pos;
    };

    /**
     * Returns a string representation of this object.
     * @method toString
     * @return {String} a string representation of the instance.
     **/
    p.toString = function () {
        return "[Timeline]";
    };

    /**
     * @method clone
     * @protected
     **/
    p.clone = function () {
        throw("Timeline can not be cloned.")
    };

// private methods:
    /**
     * @method _goto
     * @param {String | Number} positionOrLabel
     * @protected
     **/
    p._goto = function (positionOrLabel) {
        var pos = this.resolve(positionOrLabel);
        if (pos != null) {
            this.setPosition(pos);
        }
    };

    /**
     * @method _calcPosition
     * @param {Number} value
     * @return {Number}
     * @protected
     **/
    p._calcPosition = function (value) {
        if (value < 0) {
            return 0;
        }
        if (value < this.duration) {
            return value;
        }
        return this.loop ? value % this.duration : this.duration;
    };

    createjs.Timeline = createjs.promote(Timeline, "EventDispatcher");

}());

/*
 * Tween
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * The TweenJS Javascript library provides a simple but powerful tweening interface. It supports tweening of both
 * numeric object properties & CSS style properties, and allows you to chain tweens and actions together to create
 * complex sequences.
 *
 * <h4>Simple Tween</h4>
 * This tween will tween the target's alpha property from 0 to 1 for 1s then call the <code>handleComplete</code> function.
 *
 *        target.alpha = 0;
 *        createjs.Tween.get(target).to({alpha:1}, 1000).call(handleComplete);
 *        function handleComplete() {
 *	    	//Tween complete
 *	    }
 *
 * <strong>Arguments and Scope</strong>
 * Tween also supports a `call()` with arguments and/or a scope. If no scope is passed, then the function is called
 * anonymously (normal JavaScript behaviour). The scope is useful for maintaining scope when doing object-oriented
 * style development.
 *
 *      createjs.Tween.get(target).to({alpha:0})
 *          .call(handleComplete, [argument1, argument2], this);
 *
 * <h4>Chainable Tween</h4>
 * This tween will wait 0.5s, tween the target's alpha property to 0 over 1s, set it's visible to false, then call the
 * <code>handleComplete</code> function.
 *
 *        target.alpha = 1;
 *        createjs.Tween.get(target).wait(500).to({alpha:0, visible:false}, 1000).call(handleComplete);
 *        function handleComplete() {
 *	    	//Tween complete
 *	    }
 *
 * <h4>Browser Support</h4>
 * TweenJS will work in modern browsers. To use TweenJS with IE8 and earlier, use an older version of PreloadJS
 * (version 0.4.1 and earlier).
 *
 * @module TweenJS
 * @main TweenJS
 */

// TODO: possibly add a END actionsMode (only runs actions that == position)?
// TODO: evaluate a way to decouple paused from tick registration.

// namespace:
this.createjs = this.createjs || {};

(function () {
    "use strict";


// constructor
    /**
     * A Tween instance tweens properties for a single target. Instance methods can be chained for easy construction and sequencing:
     *
     * <h4>Example</h4>
     *
     *      target.alpha = 1;
     *        createjs.Tween.get(target)
     *             .wait(500)
     *             .to({alpha:0, visible:false}, 1000)
     *             .call(handleComplete);
     *        function handleComplete() {
	 *	    	//Tween complete
	 *	    }
     *
     * Multiple tweens can point to the same instance, however if they affect the same properties there could be unexpected
     * behaviour. To stop all tweens on an object, use {{#crossLink "Tween/removeTweens"}}{{/crossLink}} or pass `override:true`
     * in the props argument.
     *
     *      createjs.Tween.get(target, {override:true}).to({x:100});
     *
     * Subscribe to the {{#crossLink "Tween/change:event"}}{{/crossLink}} event to get notified when a property of the
     * target is changed.
     *
     *      createjs.Tween.get(target, {override:true}).to({x:100}).addEventListener("change", handleChange);
     *      function handleChange(event) {
	 *          // The tween changed.
	 *      }
     *
     * See the Tween {{#crossLink "Tween/get"}}{{/crossLink}} method for additional param documentation.
     * @class Tween
     * @param {Object} target The target object that will have its properties tweened.
     * @param {Object} [props] The configuration properties to apply to this tween instance (ex. `{loop:true, paused:true}`.
     * All properties default to false. Supported props are:<UL>
     *    <LI> loop: sets the loop property on this tween.</LI>
     *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
     *    <LI> ignoreGlobalPause: sets the {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}} property on this tween.</LI>
     *    <LI> override: if true, `Tween.removeTweens(target)` will be called to remove any other tweens with the same target.
     *    <LI> paused: indicates whether to start the tween paused.</LI>
     *    <LI> position: indicates the initial position for this tween.</LI>
     *    <LI> onChange: specifies a listener for the "change" event.</LI>
     * </UL>
     * @param {Object} [pluginData] An object containing data for use by installed plugins. See individual
     * plugins' documentation for details.
     * @extends EventDispatcher
     * @constructor
     */
    function Tween(target, props, pluginData) {

        // public properties:
        /**
         * Causes this tween to continue playing when a global pause is active. For example, if TweenJS is using {{#crossLink "Ticker"}}{{/crossLink}},
         * then setting this to true (the default) will cause this tween to be paused when <code>Ticker.setPaused(true)</code>
         * is called. See the Tween {{#crossLink "Tween/tick"}}{{/crossLink}} method for more info. Can be set via the props
         * parameter.
         * @property ignoreGlobalPause
         * @type Boolean
         * @default false
         */
        this.ignoreGlobalPause = false;

        /**
         * If true, the tween will loop when it reaches the end. Can be set via the props param.
         * @property loop
         * @type {Boolean}
         * @default false
         */
        this.loop = false;

        /**
         * Specifies the total duration of this tween in milliseconds (or ticks if useTicks is true).
         * This value is automatically updated as you modify the tween. Changing it directly could result in unexpected
         * behaviour.
         * @property duration
         * @type {Number}
         * @default 0
         * @readonly
         */
        this.duration = 0;

        /**
         * Allows you to specify data that will be used by installed plugins. Each plugin uses this differently, but in general
         * you specify data by setting it to a property of pluginData with the same name as the plugin class.
         * @example
         *    myTween.pluginData.PluginClassName = data;
         * <br/>
         * Also, most plugins support a property to enable or disable them. This is typically the plugin class name followed by "_enabled".<br/>
         * @example
         *    myTween.pluginData.PluginClassName_enabled = false;<br/>
         * <br/>
         * Some plugins also store instance data in this object, usually in a property named _PluginClassName.
         * See the documentation for individual plugins for more details.
         * @property pluginData
         * @type {Object}
         */
        this.pluginData = pluginData || {};

        /**
         * The target of this tween. This is the object on which the tweened properties will be changed. Changing
         * this property after the tween is created will not have any effect.
         * @property target
         * @type {Object}
         * @readonly
         */
        this.target = target;

        /**
         * The current normalized position of the tween. This will always be a value between 0 and duration.
         * Changing this property directly will have no effect.
         * @property position
         * @type {Object}
         * @readonly
         */
        this.position = null;

        /**
         * Indicates the tween's current position is within a passive wait.
         * @property passive
         * @type {Boolean}
         * @default false
         * @readonly
         **/
        this.passive = false;

        // private properties:
        /**
         * @property _paused
         * @type {Boolean}
         * @default false
         * @protected
         */
        this._paused = false;

        /**
         * @property _curQueueProps
         * @type {Object}
         * @protected
         */
        this._curQueueProps = {};

        /**
         * @property _initQueueProps
         * @type {Object}
         * @protected
         */
        this._initQueueProps = {};

        /**
         * @property _steps
         * @type {Array}
         * @protected
         */
        this._steps = [];

        /**
         * @property _actions
         * @type {Array}
         * @protected
         */
        this._actions = [];

        /**
         * Raw position.
         * @property _prevPosition
         * @type {Number}
         * @default 0
         * @protected
         */
        this._prevPosition = 0;

        /**
         * The position within the current step.
         * @property _stepPosition
         * @type {Number}
         * @default 0
         * @protected
         */
        this._stepPosition = 0; // this is needed by MovieClip.

        /**
         * Normalized position.
         * @property _prevPos
         * @type {Number}
         * @default -1
         * @protected
         */
        this._prevPos = -1;

        /**
         * @property _target
         * @type {Object}
         * @protected
         */
        this._target = target;

        /**
         * @property _useTicks
         * @type {Boolean}
         * @default false
         * @protected
         */
        this._useTicks = false;

        /**
         * @property _inited
         * @type {boolean}
         * @default false
         * @protected
         */
        this._inited = false;

        /**
         * Indicates whether the tween is currently registered with Tween.
         * @property _registered
         * @type {boolean}
         * @default false
         * @protected
         */
        this._registered = false;


        if (props) {
            this._useTicks = props.useTicks;
            this.ignoreGlobalPause = props.ignoreGlobalPause;
            this.loop = props.loop;
            props.onChange && this.addEventListener("change", props.onChange);
            if (props.override) {
                Tween.removeTweens(target);
            }
        }
        if (props && props.paused) {
            this._paused = true;
        }
        else {
            createjs.Tween._register(this, true);
        }
        if (props && props.position != null) {
            this.setPosition(props.position, Tween.NONE);
        }

    };

    var p = createjs.extend(Tween, createjs.EventDispatcher);

    // TODO: deprecated
    // p.initialize = function() {}; // searchable for devs wondering where it is. REMOVED. See docs for details.


// static properties
    /**
     * Constant defining the none actionsMode for use with setPosition.
     * @property NONE
     * @type Number
     * @default 0
     * @static
     */
    Tween.NONE = 0;

    /**
     * Constant defining the loop actionsMode for use with setPosition.
     * @property LOOP
     * @type Number
     * @default 1
     * @static
     */
    Tween.LOOP = 1;

    /**
     * Constant defining the reverse actionsMode for use with setPosition.
     * @property REVERSE
     * @type Number
     * @default 2
     * @static
     */
    Tween.REVERSE = 2;

    /**
     * Constant returned by plugins to tell the tween not to use default assignment.
     * @property IGNORE
     * @type Object
     * @static
     */
    Tween.IGNORE = {};

    /**
     * @property _listeners
     * @type Array[Tween]
     * @static
     * @protected
     */
    Tween._tweens = [];

    /**
     * @property _plugins
     * @type Object
     * @static
     * @protected
     */
    Tween._plugins = {};


// static methods
    /**
     * Returns a new tween instance. This is functionally identical to using "new Tween(...)", but looks cleaner
     * with the chained syntax of TweenJS.
     * <h4>Example</h4>
     *
     *        var tween = createjs.Tween.get(target);
     *
     * @method get
     * @param {Object} target The target object that will have its properties tweened.
     * @param {Object} [props] The configuration properties to apply to this tween instance (ex. `{loop:true, paused:true}`).
     * All properties default to `false`. Supported props are:
     * <UL>
     *    <LI> loop: sets the loop property on this tween.</LI>
     *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
     *    <LI> ignoreGlobalPause: sets the {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}} property on
     *    this tween.</LI>
     *    <LI> override: if true, `createjs.Tween.removeTweens(target)` will be called to remove any other tweens with
     *    the same target.
     *    <LI> paused: indicates whether to start the tween paused.</LI>
     *    <LI> position: indicates the initial position for this tween.</LI>
     *    <LI> onChange: specifies a listener for the {{#crossLink "Tween/change:event"}}{{/crossLink}} event.</LI>
     * </UL>
     * @param {Object} [pluginData] An object containing data for use by installed plugins. See individual plugins'
     * documentation for details.
     * @param {Boolean} [override=false] If true, any previous tweens on the same target will be removed. This is the
     * same as calling `Tween.removeTweens(target)`.
     * @return {Tween} A reference to the created tween. Additional chained tweens, method calls, or callbacks can be
     * applied to the returned tween instance.
     * @static
     */
    Tween.get = function (target, props, pluginData, override) {
        if (override) {
            Tween.removeTweens(target);
        }
        return new Tween(target, props, pluginData);
    };

    /**
     * Advances all tweens. This typically uses the {{#crossLink "Ticker"}}{{/crossLink}} class, but you can call it
     * manually if you prefer to use your own "heartbeat" implementation.
     * @method tick
     * @param {Number} delta The change in time in milliseconds since the last tick. Required unless all tweens have
     * `useTicks` set to true.
     * @param {Boolean} paused Indicates whether a global pause is in effect. Tweens with {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}}
     * will ignore this, but all others will pause if this is `true`.
     * @static
     */
    Tween.tick = function (delta, paused) {
        var tweens = Tween._tweens.slice(); // to avoid race conditions.
        for (var i = tweens.length - 1; i >= 0; i--) {
            var tween = tweens[i];
            if ((paused && !tween.ignoreGlobalPause) || tween._paused) {
                continue;
            }
            tween.tick(tween._useTicks ? 1 : delta);
        }
    };

    /**
     * Handle events that result from Tween being used as an event handler. This is included to allow Tween to handle
     * {{#crossLink "Ticker/tick:event"}}{{/crossLink}} events from the createjs {{#crossLink "Ticker"}}{{/crossLink}}.
     * No other events are handled in Tween.
     * @method handleEvent
     * @param {Object} event An event object passed in by the {{#crossLink "EventDispatcher"}}{{/crossLink}}. Will
     * usually be of type "tick".
     * @private
     * @static
     * @since 0.4.2
     */
    Tween.handleEvent = function (event) {
        if (event.type == "tick") {
            this.tick(event.delta, event.paused);
        }
    };

    /**
     * Removes all existing tweens for a target. This is called automatically by new tweens if the `override`
     * property is `true`.
     * @method removeTweens
     * @param {Object} target The target object to remove existing tweens from.
     * @static
     */
    Tween.removeTweens = function (target) {
        if (!target.tweenjs_count) {
            return;
        }
        var tweens = Tween._tweens;
        for (var i = tweens.length - 1; i >= 0; i--) {
            var tween = tweens[i];
            if (tween._target == target) {
                tween._paused = true;
                tweens.splice(i, 1);
            }
        }
        target.tweenjs_count = 0;
    };

    /**
     * Stop and remove all existing tweens.
     * @method removeAllTweens
     * @static
     * @since 0.4.1
     */
    Tween.removeAllTweens = function () {
        var tweens = Tween._tweens;
        for (var i = 0, l = tweens.length; i < l; i++) {
            var tween = tweens[i];
            tween._paused = true;
            tween.target && (tween.target.tweenjs_count = 0);
        }
        tweens.length = 0;
    };

    /**
     * Indicates whether there are any active tweens (and how many) on the target object (if specified) or in general.
     * @method hasActiveTweens
     * @param {Object} [target] The target to check for active tweens. If not specified, the return value will indicate
     * if there are any active tweens on any target.
     * @return {Boolean} If there are active tweens.
     * @static
     */
    Tween.hasActiveTweens = function (target) {
        if (target) {
            return target.tweenjs_count != null && !!target.tweenjs_count;
        }
        return Tween._tweens && !!Tween._tweens.length;
    };

    /**
     * Installs a plugin, which can modify how certain properties are handled when tweened. See the {{#crossLink "CSSPlugin"}}{{/crossLink}}
     * for an example of how to write TweenJS plugins.
     * @method installPlugin
     * @static
     * @param {Object} plugin The plugin class to install
     * @param {Array} properties An array of properties that the plugin will handle.
     */
    Tween.installPlugin = function (plugin, properties) {
        var priority = plugin.priority;
        if (priority == null) {
            plugin.priority = priority = 0;
        }
        for (var i = 0, l = properties.length, p = Tween._plugins; i < l; i++) {
            var n = properties[i];
            if (!p[n]) {
                p[n] = [plugin];
            }
            else {
                var arr = p[n];
                for (var j = 0, jl = arr.length; j < jl; j++) {
                    if (priority < arr[j].priority) {
                        break;
                    }
                }
                p[n].splice(j, 0, plugin);
            }
        }
    };

    /**
     * Registers or unregisters a tween with the ticking system.
     * @method _register
     * @param {Tween} tween The tween instance to register or unregister.
     * @param {Boolean} value If `true`, the tween is registered. If `false` the tween is unregistered.
     * @static
     * @protected
     */
    Tween._register = function (tween, value) {
        var target = tween._target;
        var tweens = Tween._tweens;
        if (value && !tween._registered) {
            // TODO: this approach might fail if a dev is using sealed objects in ES5
            if (target) {
                target.tweenjs_count = target.tweenjs_count ? target.tweenjs_count + 1 : 1;
            }
            tweens.push(tween);
            if (!Tween._inited && createjs.Ticker) {
                createjs.Ticker.addEventListener("tick", Tween);
                Tween._inited = true;
            }
        } else if (!value && tween._registered) {
            if (target) {
                target.tweenjs_count--;
            }
            var i = tweens.length;
            while (i--) {
                if (tweens[i] == tween) {
                    tweens.splice(i, 1);
                    break;
                }
            }
        }
        tween._registered = value;
    };


// events:
    /**
     * Called whenever the tween's position changes.
     * @event change
     * @since 0.4.0
     **/


// public methods:
    /**
     * Queues a wait (essentially an empty tween).
     * <h4>Example</h4>
     *
     *        //This tween will wait 1s before alpha is faded to 0.
     *        createjs.Tween.get(target).wait(1000).to({alpha:0}, 1000);
     *
     * @method wait
     * @param {Number} duration The duration of the wait in milliseconds (or in ticks if `useTicks` is true).
     * @param {Boolean} [passive] Tween properties will not be updated during a passive wait. This
     * is mostly useful for use with {{#crossLink "Timeline"}}{{/crossLink}} instances that contain multiple tweens
     * affecting the same target at different times.
     * @return {Tween} This tween instance (for chaining calls).
     **/
    p.wait = function (duration, passive) {
        if (duration == null || duration <= 0) {
            return this;
        }
        var o = this._cloneProps(this._curQueueProps);
        return this._addStep({d: duration, p0: o, e: this._linearEase, p1: o, v: passive});
    };

    /**
     * Queues a tween from the current values to the target properties. Set duration to 0 to jump to these value.
     * Numeric properties will be tweened from their current value in the tween to the target value. Non-numeric
     * properties will be set at the end of the specified duration.
     * <h4>Example</h4>
     *
     *        createjs.Tween.get(target).to({alpha:0}, 1000);
     *
     * @method to
     * @param {Object} props An object specifying property target values for this tween (Ex. `{x:300}` would tween the x
     * property of the target to 300).
     * @param {Number} [duration=0] The duration of the wait in milliseconds (or in ticks if `useTicks` is true).
     * @param {Function} [ease="linear"] The easing function to use for this tween. See the {{#crossLink "Ease"}}{{/crossLink}}
     * class for a list of built-in ease functions.
     * @return {Tween} This tween instance (for chaining calls).
     */
    p.to = function (props, duration, ease) {
        if (isNaN(duration) || duration < 0) {
            duration = 0;
        }
        return this._addStep({
            d: duration || 0,
            p0: this._cloneProps(this._curQueueProps),
            e: ease,
            p1: this._cloneProps(this._appendQueueProps(props))
        });
    };

    /**
     * Queues an action to call the specified function.
     * <h4>Example</h4>
     *
     *    //would call myFunction() after 1 second.
     *    myTween.wait(1000).call(myFunction);
     *
     * @method call
     * @param {Function} callback The function to call.
     * @param {Array} [params]. The parameters to call the function with. If this is omitted, then the function
     *      will be called with a single param pointing to this tween.
     * @param {Object} [scope]. The scope to call the function in. If omitted, it will be called in the target's
     *      scope.
     * @return {Tween} This tween instance (for chaining calls).
     */
    p.call = function (callback, params, scope) {
        return this._addAction({f: callback, p: params ? params : [this], o: scope ? scope : this._target});
    };

    // TODO: add clarification between this and a 0 duration .to:
    /**
     * Queues an action to set the specified props on the specified target. If target is null, it will use this tween's
     * target.
     * <h4>Example</h4>
     *
     *        myTween.wait(1000).set({visible:false},foo);
     *
     * @method set
     * @param {Object} props The properties to set (ex. `{visible:false}`).
     * @param {Object} [target] The target to set the properties on. If omitted, they will be set on the tween's target.
     * @return {Tween} This tween instance (for chaining calls).
     */
    p.set = function (props, target) {
        return this._addAction({f: this._set, o: this, p: [props, target ? target : this._target]});
    };

    /**
     * Queues an action to play (unpause) the specified tween. This enables you to sequence multiple tweens.
     * <h4>Example</h4>
     *
     *        myTween.to({x:100},500).play(otherTween);
     *
     * @method play
     * @param {Tween} tween The tween to play.
     * @return {Tween} This tween instance (for chaining calls).
     */
    p.play = function (tween) {
        if (!tween) {
            tween = this;
        }
        return this.call(tween.setPaused, [false], tween);
    };

    /**
     * Queues an action to pause the specified tween.
     * @method pause
     * @param {Tween} tween The tween to pause. If null, it pauses this tween.
     * @return {Tween} This tween instance (for chaining calls)
     */
    p.pause = function (tween) {
        if (!tween) {
            tween = this;
        }
        return this.call(tween.setPaused, [true], tween);
    };

    /**
     * Advances the tween to a specified position.
     * @method setPosition
     * @param {Number} value The position to seek to in milliseconds (or ticks if useTicks is true).
     * @param {Number} [actionsMode=1] Specifies how actions are handled (ie. call, set, play, pause):
     * <ul>
     *      <li>{{#crossLink "Tween/NONE:property"}}{{/crossLink}} (0) - run no actions.</li>
     *      <li>{{#crossLink "Tween/LOOP:property"}}{{/crossLink}} (1) - if new position is less than old, then run all
     *      actions between old and duration, then all actions between 0 and new.</li>
     *      <li>{{#crossLink "Tween/REVERSE:property"}}{{/crossLink}} (2) - if new position is less than old, run all
     *      actions between them in reverse.</li>
     * </ul>
     * @return {Boolean} Returns `true` if the tween is complete (ie. the full tween has run & {{#crossLink "Tween/loop:property"}}{{/crossLink}}
     * is `false`).
     */
    p.setPosition = function (value, actionsMode) {
        if (value < 0) {
            value = 0;
        }
        if (actionsMode == null) {
            actionsMode = 1;
        }

        // normalize position:
        var t = value;
        var end = false;
        if (t >= this.duration) {
            if (this.loop) {
                t = t % this.duration;
            }
            else {
                t = this.duration;
                end = true;
            }
        }
        if (t == this._prevPos) {
            return end;
        }


        var prevPos = this._prevPos;
        this.position = this._prevPos = t; // set this in advance in case an action modifies position.
        this._prevPosition = value;

        // handle tweens:
        if (this._target) {
            if (end) {
                // addresses problems with an ending zero length step.
                this._updateTargetProps(null, 1);
            } else if (this._steps.length > 0) {
                // find our new tween index:
                for (var i = 0, l = this._steps.length; i < l; i++) {
                    if (this._steps[i].t > t) {
                        break;
                    }
                }
                var step = this._steps[i - 1];
                this._updateTargetProps(step, (this._stepPosition = t - step.t) / step.d);
            }
        }

        // run actions:
        if (actionsMode != 0 && this._actions.length > 0) {
            if (this._useTicks) {
                // only run the actions we landed on.
                this._runActions(t, t);
            } else if (actionsMode == 1 && t < prevPos) {
                if (prevPos != this.duration) {
                    this._runActions(prevPos, this.duration);
                }
                this._runActions(0, t, true);
            } else {
                this._runActions(prevPos, t);
            }
        }

        if (end) {
            this.setPaused(true);
        }

        this.dispatchEvent("change");
        return end;
    };

    /**
     * Advances this tween by the specified amount of time in milliseconds (or ticks if`useTicks` is `true`).
     * This is normally called automatically by the Tween engine (via {{#crossLink "Tween/tick"}}{{/crossLink}}), but is
     * exposed for advanced uses.
     * @method tick
     * @param {Number} delta The time to advance in milliseconds (or ticks if `useTicks` is `true`).
     */
    p.tick = function (delta) {
        if (this._paused) {
            return;
        }
        this.setPosition(this._prevPosition + delta);
    };

    /**
     * Pauses or plays this tween.
     * @method setPaused
     * @param {Boolean} [value=true] Indicates whether the tween should be paused (`true`) or played (`false`).
     * @return {Tween} This tween instance (for chaining calls)
     */
    p.setPaused = function (value) {
        if (this._paused === !!value) {
            return this;
        }
        this._paused = !!value;
        Tween._register(this, !value);
        return this;
    };

    // tiny api (primarily for tool output):
    p.w = p.wait;
    p.t = p.to;
    p.c = p.call;
    p.s = p.set;

    /**
     * Returns a string representation of this object.
     * @method toString
     * @return {String} a string representation of the instance.
     */
    p.toString = function () {
        return "[Tween]";
    };

    /**
     * @method clone
     * @protected
     */
    p.clone = function () {
        throw("Tween can not be cloned.")
    };

// private methods:
    /**
     * @method _updateTargetProps
     * @param {Object} step
     * @param {Number} ratio
     * @protected
     */
    p._updateTargetProps = function (step, ratio) {
        var p0, p1, v, v0, v1, arr;
        if (!step && ratio == 1) {
            // GDS: when does this run? Just at the very end? Shouldn't.
            this.passive = false;
            p0 = p1 = this._curQueueProps;
        } else {
            this.passive = !!step.v;
            if (this.passive) {
                return;
            } // don't update props.
            // apply ease to ratio.
            if (step.e) {
                ratio = step.e(ratio, 0, 1, 1);
            }
            p0 = step.p0;
            p1 = step.p1;
        }

        for (var n in this._initQueueProps) {
            if ((v0 = p0[n]) == null) {
                p0[n] = v0 = this._initQueueProps[n];
            }
            if ((v1 = p1[n]) == null) {
                p1[n] = v1 = v0;
            }
            if (v0 == v1 || ratio == 0 || ratio == 1 || (typeof(v0) != "number")) {
                // no interpolation - either at start, end, values don't change, or the value is non-numeric.
                v = ratio == 1 ? v1 : v0;
            } else {
                v = v0 + (v1 - v0) * ratio;
            }

            var ignore = false;
            if (arr = Tween._plugins[n]) {
                for (var i = 0, l = arr.length; i < l; i++) {
                    var v2 = arr[i].tween(this, n, v, p0, p1, ratio, !!step && p0 == p1, !step);
                    if (v2 == Tween.IGNORE) {
                        ignore = true;
                    }
                    else {
                        v = v2;
                    }
                }
            }
            if (!ignore) {
                this._target[n] = v;
            }
        }

    };

    /**
     * @method _runActions
     * @param {Number} startPos
     * @param {Number} endPos
     * @param {Boolean} includeStart
     * @protected
     */
    p._runActions = function (startPos, endPos, includeStart) {
        var sPos = startPos;
        var ePos = endPos;
        var i = -1;
        var j = this._actions.length;
        var k = 1;
        if (startPos > endPos) {
            // running backwards, flip everything:
            sPos = endPos;
            ePos = startPos;
            i = j;
            j = k = -1;
        }
        while ((i += k) != j) {
            var action = this._actions[i];
            var pos = action.t;
            if (pos == ePos || (pos > sPos && pos < ePos) || (includeStart && pos == startPos)) {
                action.f.apply(action.o, action.p);
            }
        }
    };

    /**
     * @method _appendQueueProps
     * @param {Object} o
     * @protected
     */
    p._appendQueueProps = function (o) {
        var arr, oldValue, i, l, injectProps;
        for (var n in o) {
            if (this._initQueueProps[n] === undefined) {
                oldValue = this._target[n];

                // init plugins:
                if (arr = Tween._plugins[n]) {
                    for (i = 0, l = arr.length; i < l; i++) {
                        oldValue = arr[i].init(this, n, oldValue);
                    }
                }
                this._initQueueProps[n] = this._curQueueProps[n] = (oldValue === undefined) ? null : oldValue;
            } else {
                oldValue = this._curQueueProps[n];
            }
        }

        for (var n in o) {
            oldValue = this._curQueueProps[n];
            if (arr = Tween._plugins[n]) {
                injectProps = injectProps || {};
                for (i = 0, l = arr.length; i < l; i++) {
                    // TODO: remove the check for .step in the next version. It's here for backwards compatibility.
                    if (arr[i].step) {
                        arr[i].step(this, n, oldValue, o[n], injectProps);
                    }
                }
            }
            this._curQueueProps[n] = o[n];
        }
        if (injectProps) {
            this._appendQueueProps(injectProps);
        }
        return this._curQueueProps;
    };

    /**
     * @method _cloneProps
     * @param {Object} props
     * @protected
     */
    p._cloneProps = function (props) {
        var o = {};
        for (var n in props) {
            o[n] = props[n];
        }
        return o;
    };

    /**
     * @method _addStep
     * @param {Object} o
     * @protected
     */
    p._addStep = function (o) {
        if (o.d > 0) {
            this._steps.push(o);
            o.t = this.duration;
            this.duration += o.d;
        }
        return this;
    };

    /**
     * @method _addAction
     * @param {Object} o
     * @protected
     */
    p._addAction = function (o) {
        o.t = this.duration;
        this._actions.push(o);
        return this;
    };

    /**
     * @method _set
     * @param {Object} props
     * @param {Object} o
     * @protected
     */
    p._set = function (props, o) {
        for (var n in props) {
            o[n] = props[n];
        }
    };

    createjs.Tween = createjs.promote(Tween, "EventDispatcher");

}());

/**
 * @module TweenJS
 */
this.createjs = this.createjs || {};

(function () {
    "use strict";

    /**
     * Static class holding library specific information such as the version and buildDate of
     * the library.
     * @class TweenJS
     **/
    var s = createjs.TweenJS = createjs.TweenJS || {};

    /**
     * The version string for this release.
     * @property version
     * @type String
     * @static
     **/
    s.version = /*=version*/"0.6.2"; // injected by build process

    /**
     * The build date for this release in UTC format.
     * @property buildDate
     * @type String
     * @static
     **/
    s.buildDate = /*=date*/"2016-01-27 11:59"; // injected by build process

})();