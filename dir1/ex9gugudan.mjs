// 키보드로 단을 받아 구구단 출력
import EventEmitter from "stream";
import readline from 'readline';

const myEvent = new EventEmitter(); // 이벤트 

const inout = readline.createInterface({
    input:process.stdin,    // 표준 입력장치 선언
    output:process.stdout,  // 표준 출력장치 선언
})

const printGugudan = (dan) => {
    console.log(`\n구구단 ${dan} 출력 : `)
    for (let index = 1; index <= 9; index++) {
        console.log(`${dan}  x ${index} = ${dan * index}`);
    }
}

// 이벤트 호출 
myEvent.on('gugudan', (dan) => {
    printGugudan(dan);
    inout.close();
})

// question(query, callback)
inout.question('출력할 단 입력 : ', (input) => {
    const dan = parseInt(input, 10);

    if(!isNaN(dan)) { // 아닌경우 
        myEvent.emit('gugudan', dan)
    }else{
        console.log('단은 숫자로 입력 !');
        inout.close();
    }
});