const {odd, even} = require('./ex2_1');

function chkFunc(num) {
    if(num % 2){
        return odd;
    }
    return even;
}

module.exports = chkFunc;
