/* 
    Calculates infix expression; input is a space-separated
    string containing operators and integer operands
*/

exports.OperatorEnum = {
    PLUS : '+',
    MINUS: '-',
    MULT: '*'
};

exports.getResult = function (input) {
    if (!input) {
        throw new Error("input cannot be empty");
    }

    return 'Hello';
};

exports.scanInput = function(input) {
    var parsedTokenStrings = input.split(' ');
    return parsedTokenStrings.map(parseToken);
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
    for (var operator in exports.OperatorEnum) {
        if (exports.OperatorEnum[operator] === tokenString)
            return exports.OperatorEnum[operator];
    }

    return null;
};