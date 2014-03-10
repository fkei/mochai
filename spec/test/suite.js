/**
 * @name suite.js<spec/test>
 * @author Kei Funagayama <kei.topaz@gmail.com>
 * @overview TestCase: mochai
 */

define(['mochai'], function(mochai){

    return {
        'suite.0': function() {
            describe('suite.0.0', function(){
                before(function () {
                    console.log('Called suites 0.0 before');
                });
                it('suite.0.0.0', function() {
                    expect(mochai.VERSION).be.ok;
                    expect(mochai.libs.chai).be.ok;
                    expect(mochai.libs.mocha).be.ok;
                    expect(mochai.runner).be.ok;
                    expect(mochai.setuped).be.ok;
                    //expect(mochai.suites['spec/test/index']).be.ok;
                });
                after(function () {
                    console.log('Called suites 0.0 after');
                });
            });
        }
    };
});
