(function (global) {
    var suite = {
        'suite.0': function() {
            describe('suite.0.0', function(){
                before(function () {
                    console.log('Called global suites 0.0 before');
                });
                it('suite.0.0.0', function() {
                    expect(mochai.VERSION).be.ok;
                    expect(mochai.libs.chai).be.ok;
                    expect(mochai.libs.mocha).be.ok;
                    expect(mochai.runner).be.ok;
                    expect(mochai.setuped).be.ok;
                    console.log(this.before);
                    //expect(mochai.suites['spec/test/index']).be.ok;
                });
                after(function () {
                    console.log('Called global suites 0.0 after');
                });
            });
        }
    };
    var suites = {
        'suites.1' : function() {
            describe('suites.1.0', function(){
                before(function () {
                    console.log('Called global suites 1.0 before');
                });
                it('suites.1.0.0', function() {
                    expect(true).be.ok;
                });
                after(function () {
                    console.log('Called global suites 1.0 after');
                });
            });
        },
        'suites.2' : function() {
            describe('suites.2.0', function(){
                before(function () {
                    console.log('Called global suites 2.0 before');
                });
                it('suites.2.0.0', function() {
                    expect(true).be.ok;
                });
                after(function () {
                    console.log('Called global suites 2.0 after');
                });
            });
        },
        'suites.3' : function() {
            describe('suites.3.0', function(){
                before(function () {
                    console.log('Called global suites 3.0 before');
                });
                it('suites.3.0.0', function() {
                    expect(true).be.ok;
                });
                after(function () {
                    console.log('Called global suites 3.0 after');
                });
            });
        }
    };

    ///
    var mochai = global.mochai;

    mochai.setup(null, function () {
        mochai.addSuite(suite, function (name, suite) {
            mochai.addSuite(suites, function (name, suite) {
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
