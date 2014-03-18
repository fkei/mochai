/**
 * Test framework which blended chai and mocha
 *
 * The MIT License (MIT)
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * @license MIT
 * @author Kei Funagayama <kei.topaz@gmail.com>
 */
(function (w) {
    'use strict';

    var none = function () {};

    var is = function (type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    };

    var isRequire = !!(typeof define === 'function' && define.amd);

    var mochai = {
        VERSION: '0.2.4',
        DEBUG: w.DEBUG || false,
        suites: {},
        runner: null,
        mochaPhantomJS: w.mochaPhantomJS || undefined,
        libs: {},
        setuped: false,
        setup: function (options, callback) {
            var self = this;
            options = options || { ui: 'bdd' };

            ////////////////////////////////////
            // define function

            /**
             * Add flag for enviroment
             *
             * @memberof mochai
             * @return {boolean}
             */
            self.isMochaPhantomJS = function () {
                return !!w.mochaPhantomJS;
            };

            /**
             * Add test suite
             *
             * @memberof mochai
             * @param {String|Array|function} target require.path or function
             * @param {function} callback
             */
            self.addSuite = function (target, callback) {
                var self = this;

                var add = function (target, callback) {
                    for (var key in target) {
                        var obj = target[key];
                        if (!is('Object', obj)) {
                            throw new Error('Suite is not an Object.');
                        }
                        for (var name in obj) {
                            self.suites[name] = obj[name];
                            if (self.DEBUG) {
                                console.log('add test:', name);
                            }
                        }
                    }
                    callback && callback(null, self.suites);
                    return this;
                };

                if (!is('Array', target)) {
                    target = [target];
                }

                var r = [];
                for (var idx in target) {
                    var obj = target[idx];
                    if (is('String', obj)) {
                        r.push(obj);
                        continue;
                    }
                    if (is('Object', obj)) {
                        add([obj]);
                    }
                }

                if (isRequire && 0 < r.length) {
                    require(r, function () {
                        var _target = Array.prototype.slice.call(arguments);
                        add(_target, function (err, suites) {
                            callback && callback();
                        });
                    });
                    return this;
                } else {
                    callback && callback();
                }
            };

            /**
             * Run test suites
             * Warnning: It does not support the mochaPhantomJS.run() more than once.
             *
             * @memberof mochai
             * @param {String} name suite name
             * @param {function} callback
             */
            self.run = function (name, callback) {
                var self = this;
                var ary = name;
                var suite;
                var tasks = [];

                if (!this.setuped) {
                    throw new Error('"mochai.setup()" is not running.');
                }

                this.libs.mocha.suite.suites = []; // clear

                if (!this.suites[name]) {
                    return;
                }

                this.libs.mocha.checkLeaks();

                if (this.isMochaPhantomJS()) {

                    for (var key in self.suites) {
                        suite = self.suites[key];
                        tasks.push(suite());
                    }

                    this.runner = this.mochaPhantomJS.run();
                } else {
                    if (!is('Array', name)) {
                        ary = [name];
                    }

                    for (var idx in ary) {
                        self.suites[ary[idx]]();
                    }

                    this.runner = this.libs.mocha.run(callback);
                }
            };

            /**
             * Output test report for the GUI browser console
             * Warnning: It does not support the mochaPhantomJS.run() more than once.
             *
             * @memberof mochai
             * @param {Object} runner mocha-phantomjs.runner
             */
            self.ConsoleReporter = function ConsoleReporter(runner) {
                var pass = 0;
                var fail = 0;
                var result = [];
                var messages = [];
                runner.on('pass', function (test) {
                    result.push({data: test});
                    pass++;
                });

                runner.on('fail', function (test, err) {
                    result.push({
                        data: test,
                        error: err
                    });

                    fail++;
                });

                runner.on('end', function () {
                    messages.push('- Mochai results\n');

                    for (var idx in result) {
                        var obj = result[idx];
                        var data = obj.data;
                        var error = obj.error;
                        if (data.state === 'failed') {
                            messages.push('\t[ NG ] ' + data.fullTitle() + ' error: ' + error.message);
                        }
                        if (data.state === 'passed') {
                            messages.push('\t[ OK ] ' + data.fullTitle());
                        }

                    }

                    var res = pass +  '/' + (pass + fail);
                    messages.push('');
                    if (0 < fail) {
                        messages.push('Total: ' + res);
                        console.error(messages.join('\n'));
                    } else {
                        messages.push('Total: ' + res);
                        console.warn(messages.join('\n'));
                    }

                });
            };


            ////////////////////////////////////
            // local function

            var g = function (callback) {
                self.libs.chai = w.chai;
                self.libs.mocha = w.mocha;
                callback && callback.apply(self, arguments);
                return this;
            };

            var r = function (callback) {
                require(['require', 'chai', 'mocha'], function (requirejs, chai, mocha) {
                    self.libs.chai = chai;
                    self.libs.mocha = mocha;
                    if (!self.libs.mocha) {
                        self.libs.mocha = w.mocha;
                    }

                    callback && callback.apply(self, arguments);
                });
                return this;
            };

            ////////////////////////////////////

            var pre = g;
            if (isRequire) {
                pre = r;
            }

            pre(function () {
                if (!this.isMochaPhantomJS() && !options.reporter) {
                    options.reporter = this.ConsoleReporter;
                }

                //this.libs.mocha = w.mocha;
                this.libs.mocha.setup(options);
                w.assert = this.libs.chai.assert;
                //global.should = this.libs.chai.should();
                w.expect = this.libs.chai.expect;



                //////////////

                self.setuped = true;

                callback && callback(this);
            });
        }
    };

    // sync
    var sync = ['initialize', 'isMochaPhantomJS', 'run'];
    for (var i = 0; i < sync.length; i++) {
        mochai[sync[i]] = none;
    }

    // async
    var async = ['initialize', 'isMochaPhantomJS', 'run'];
    for (var i = 0; i < async.length; i++) {
        mochai[async[i]] = function (arg, callback) {
            callback && callback();
        };
    }

    if (isRequire) {
        define([], function () {
            return mochai;
        });
    } else {
        w.mochai = mochai;
    }

})(window);
