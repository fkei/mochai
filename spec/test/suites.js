/**
 * @name suites.js<spec/test>
 * @author Kei Funagayama <kei.topaz@gmail.com>
 * @overview TestCase: mochai
 */

define(['mochai'], function(mochai){

    return {
        'suites.1' : function() {
            describe('suites.1.0', function(){
                before(function () {
                    console.log('Called suites 1.0 before');
                });
                it('suites.1.0.0', function() {
                    expect(true).be.ok;
                });
                after(function () {
                    console.log('Called suites 1.0 after');
                });
            });
        },
        'suites.2' : function() {
            describe('suites.2.0', function(){
                before(function () {
                    console.log('Called suites 2.0 before');
                });
                it('suites.2.0.0', function(done) {
                    setTimeout(function() {
                        console.log('1500ms');
                        expect(true).be.ok;
                        done();
                    }, 1500);
                });
                after(function () {
                    console.log('Called suites 2.0 after');
                });
            });
        },
        'suites.3' : function() {
            describe('suites.3.0', function(){
                before(function () {
                    console.log('Called suites 3.0 before');
                });
                it('suites.3.0.0', function() {
                    expect(true).be.ok;
                });
                after(function () {
                    console.log('Called suites 3.0 after');
                });
            });
        }
    };
});
