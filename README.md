mochai
===========

### Test framework for beez (mocha + chai)

# About

mochai + chai を組み合わせたブラウザ向けのテストフレームワークです。

プログラム中から直接テストコード呼び出しを行う機能もあるため、任意のタイミング(mouse events) のタイミング等でテストを実行することも可能です。



# Features

- [mocha](http://visionmedia.github.io/mocha/) + [chai](http://chaijs.com/)　をサポート
- [phantomjs](http://phantomjs.org/) をサポート
- 任意のタイミングでテストケースを追加削除可能
- scriptタグ, [require.js](http://requirejs.org/) 両方でのロードをサポート

# Requirements

- [mocha](http://visionmedia.github.io/mocha/) (Require)
- [chai](http://chaijs.com/) (Require)
- [phantomjs](http://phantomjs.org/) (Optional)



# Install

mocha.js or mochai.min.js を `script` タグ もしくは require.js でロードしてください。

# 使い方

## コード (script tag)

テストケースを定義して、個別にテストケースをmochaiに追加し、テスト実行をしています。

```
(function (global) {
    // 1 テストケース
    var suite = {
        'suite.0': function() {
            describe('suite.0.0', function(){
                it('suite.0.0.0', function() {
                    expect(mochai.VERSION).be.ok;
                    expect(mochai.libs.chai).be.ok;
                    expect(mochai.libs.mocha).be.ok;
                    expect(mochai.runner).be.ok;
                    expect(mochai.setuped).be.ok;
                    //expect(mochai.suites['spec/test/index']).be.ok;
                });
            });
        }
    };
    // n テストケース
    var suites = {
        'suites.1' : function() {
            describe('suites.1.0', function(){
                it('suites.1.0.0', function() {
                    expect(true).be.ok;
                });
            });
        },
        'suites.2' : function() {
            describe('suites.2.0', function(){
                it('suites.2.0.0', function() {
                    expect(true).be.ok;
                });
            });
        },
        'suites.3' : function() {
            describe('suites.3.0', function(){
                it('suites.3.0.0', function() {
                    expect(true).be.ok;
                });
            });
        }
    };

    ///
    var mochai = global.mochai;

    if (DEBUG) { // uglifyでコンパイル時に除去する用のDEBUGフラグ

        // セットアップ
        mochai.setup(null, function () {

            // テストケースを追加
            mochai.addSuite(suite, function (name, suite) {
                mochai.addSuite(suites, function (name, suite) {

                    // テスト実行
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
    }

})(this);

```

## コード (require.js)

require.jsを利用して、テストコードを別ファイルに作成してテストをmochaiに追加するときに遅延ロードし、テストを実行しています。

**本体**

```
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

    // テストファイルリストを定義
    var tests = [
        'spec/test/suite',
        'spec/test/suites'
    ];

    // Load mochai
    require(['mochai'], function (mochai) {

        // セットアップ
        mochai.setup(null, function () {

            テストファイルリストをまとめて追加
            mochai.addSuite(tests, function (name, suite) {

                // テスト実行
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
```

**テストファイル**

```
define(['mochai'], function(mochai){

    return {
        'suite.0': function() {
            describe('suite.0.0', function(){
                it('suite.0.0.0', function() {
                    expect(mochai.VERSION).be.ok;
                    expect(mochai.libs.chai).be.ok;
                    expect(mochai.libs.mocha).be.ok;
                    expect(mochai.runner).be.ok;
                    expect(mochai.setuped).be.ok;
                    //expect(mochai.suites['spec/test/index']).be.ok;
                });
            });
        }
    };
});
```


## TIPS

- mochaiは `setup()` が実行されるまで、内部メソッドはすべて空の関数で定義されています。


## TODO

CUI test : [phantomjs](http://phantomjs.org/) を利用します。


# Build

```
$ npm install -g grunt-cli
$ npm install .
$ grunt # genarate -> mochai.min.js and mochai.min.map
$ grunt docs # HTML Documents(jsdoc3)
```

# Contributing

- Kei FUNAGAYAMA - [@fkei](https://twitter.com/fkei) [github](https://github.com/fkei)
- HIRAKI Satoru - [github](https://github.com/Layzie)


# LICENSE

@see : [LICENSE](https://github.com/shibucafe/mochai/blob/master/LICENSE)

```
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```
