(function (global) {
    var require = global.require;

    // Configure RequireJS
    require.config({
        "baseUrl": "../",
        "urlArgs": "v=" + Date.now(),
        "paths": {
            "mocha": "./node_modules/mocha/mocha",
            "chai": "./node_modules/chai/chai",
            "spec": './spec',
            "mochai": "./mochai"
        },
        "shim": {
        },
        "config": {
        }
    });
    var tests = [
        'spec/test/suite',
        'spec/test/suites'
    ];
    require(['mochai'], function (mochai) {
        mochai.setup(null, function () {
            mochai.addSuite(tests, function (name, suite) {
                mochai.run('suite.0', function () {
                    mochai.run('suites.1', function () {
                        mochai.run('suites.2', function () {
                            mochai.run('suites.3', function () {
                                console.log("Finish!!"); // end!!
                            });
                        });
                    });
                });
            });
        });
    });

})(this);
