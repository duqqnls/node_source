// fs 모듈은 비동기 처리가 기본.
// 이 때 결과를 순서대로 출력되도록 하려면 promise 객체를 사용한다.

import {promises as fs} from "fs";

console.log("시작");

fs.readFile('./ex3write.txt')
.then((data) => {
    console.log("1번", data.toString());
    return fs.readFile('./ex3write.txt');
})
.then((data) => {
    console.log("2번", data.toString());
    return fs.readFile('./ex3write.txt');
})
.then((data) => {
    console.log("3번", data.toString());
    return fs.readFile('./ex3write.txt');
})
console.log