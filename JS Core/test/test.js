var assert = require('assert');
var calc = require('../calc.js')

describe('Calc', function() {
    describe('getResult', function() {
        it('should throw an exception if input is empty', function() {
            assert.throws(() => calc.getResult(), Error);
        });

        it('should throw an exception if second argument is not provided', function() {
            assert.throws(() => calc.getResult('2 +'), Error);
        });

        it('should throw an exception if an operation is missing', function() {
            assert.throws(() => calc.getResult('2 3 4 +'), Error);
        });

        it('should calculate simple multiplication', function() {
            assert.equal(calc.getResult("12 23 *"), 12 * 23);
        });

        it('should calculate simple addition', function() {
            assert.equal(calc.getResult("12 23 +"), 12 + 23);
        });

        it('should calculate simple subtraction', function() {
            assert.equal(calc.getResult("12 23 -"), 12 - 23);
        });

        it('should calculate complex arithmetic expression', function() {
            assert.equal(calc.getResult('5 1 2 + 4 * + 3 -'), 5 + ((1 + 2) * 4) - 3)
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