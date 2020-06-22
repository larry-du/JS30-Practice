// function outer() {
//     var b = a * 2;
//     function inner(c) {
//         console.log(a, b, c);
//     }
//     inner(b * 3);
// }

// var a = 1;
// outer(a);

// function outer() {
//      b = a * 2;
//     function inner(c) {
//         console.log(a, b, c);
//     }
//     inner(b * 3);
// }

// var a = 1;
// outer(a);

var msg = "global";

function outer() {
    var msg = "local";
    function inner() {
        return msg;
    }
    return inner;
}

var innerFunc = outer();
var result = innerFunc();

console.log(result);//?


for (let i = 0; i < 5; i++) {
    (function (i) {
        window.setTimeout(function () {
            console.log(i)
        }, 1000 * i);
    })(i);
}

var count = 0;

function counter() {
    return ++count;
}

console.log(count());//1
console.log(count());//2
console.log(count());//3

function counter() {
    var count = 0;

    function inner() {
        return ++count;
    }
}

console.log(counter());//1
console.log(counter());//2
console.log(counter());//3


const counter = () => {
    var count = 0;
    return () => count++;
}