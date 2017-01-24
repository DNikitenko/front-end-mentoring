var assert = require('assert');
var calc = require('../calc.js')

describe('Calc', function() {
    describe('getResult', function() {
        it('should throw an exception if input is empty', function() {
            assert.throws(() => calc.getResult(), Error);
        });
    });

    describe('scanInput', function() {
        it('should successfully parse integer as an input', function() {
            assert.equal(123, calc.scanInput('123'));
        });

        it('should successfully parse operator *', function() {
            assert.equal(calc.OperatorEnum.MULT, calc.scanInput('*'));
        });

        it('should successfully parse operator +', function() {
            assert.equal(calc.OperatorEnum.PLUS, calc.scanInput('+'));
        });

        it('should successfully parse operator -', function() {
            assert.equal(calc.OperatorEnum.MINUS, calc.scanInput('-'));
        });

        it('should throw exception for unknown token', function() {
            assert.throws(() => calc.scanInput('abc'), Error);
        });
    });
});