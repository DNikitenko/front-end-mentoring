/* 
    Calculates infix expression; input is a space-separated
    string containing operators and integer operands
*/

exports.getResult = function (input, extraOperators) {
    if (!input) {
        throw new Error("input cannot be empty");
    }

    initOperators(extraOperators);

    let operandStack = [];
    for (let token of exports.scanInput(input)) {
        if (Number.isInteger(token)) {
            operandStack.push(token);
        } else { // if token is operator
            if (operandStack.length < 2) {
                throw new Error('not enough operands for binary operator ' + token)
            }

            let arg2 = operandStack.pop();
            let arg1 = operandStack.pop();

            operandStack.push(evaluate(token, arg1, arg2));
        } 
    }

    if (operandStack.length > 1) {
        throw new Error('invalid infix expression');
    }

    console.log(operandStack[0]);
    return operandStack[0];
};

exports.scanInput = function(input) {
    let parsedTokenStrings = input.split(' ');
    return parsedTokenStrings.map(parseToken);
};

function initOperators(extraOperators) {
    exports.OperatorEnum = {
        PLUS : '+',
        MINUS: '-',
        MULT: '*'
    };

    if (extraOperators) {
        Object.assign(exports.OperatorEnum, extraOperators);
    }
};

function evaluate(op, arg1, arg2) {
    switch (op) {
        case exports.OperatorEnum.PLUS: return arg1 + arg2;
        case exports.OperatorEnum.MINUS: return arg1 - arg2;
        case exports.OperatorEnum.MULT: return arg1 * arg2;
        
        /* Additional operators which can be passed via extraOperators variable */
        case '%': return arg1 % arg2;

        default: throw new Error('unknown operator ' + op);
    }
};

function parseToken(tokenString) {
    if (!isNaN(parseInt(tokenString))) {
        return parseInt(tokenString);
    }
    else if (getOperatorToken(tokenString)) {
        return getOperatorToken(tokenString);
    }

    throw new Error('invalid token: ' + tokenString);
};

function getOperatorToken(tokenString) {
    for (let operator in exports.OperatorEnum) {
        if (exports.OperatorEnum[operator] === tokenString)
            return exports.OperatorEnum[operator];
    }

    return null;
};