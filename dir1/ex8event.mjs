// 이벤트 처리 : events 모듈을 사용 
// EventEmitter 객체를 사용해 이벤트와 이벤트 핸들러와 연결 

import  EventEmitter from "stream"; 
const myEvent = new EventEmitter(); // 이벤트 객체 생성
myEvent.addListener('event1', () => {
    console.log('이벤트1');
})
myEvent.on('event2', () => { // addListener()와 같은 의미
    console.log('이벤트2');
})
myEvent.on('event2', () => { // addListener()와 같은 의미
    console.log('이벤트2 추가 ');
})
myEvent.once('event3', () => { // 1회만 수행
    console.log('이벤트2 추가 ');
});
myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2');
myEvent.emit('event3');
myEvent.emit('event3');
myEvent.emit('event1');

console.log('---------');
myEvent.on('event4', () => { // addListener()와 같은 의미
    console.log('이벤트4 ');
})
myEvent.emit('event4');
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener = () => {
    console.log('이벤트5');
}
myEvent.on('event5', listener);  // 이벤트 연결
myEvent.emit('event5');
myEvent.off('event5', listener); // 이벤트 해제
myEvent.emit('event5');

console.log(myEvent.listenerCount('event1'));
console.log('----- 매개 변수 전달 ----');
class MyEmitter extends EventEmitter{};

const myEmitter = new MyEmitter();
myEmitter.on("ev", () => {
    console.log("이벤트 처리");
})
myEmitter.emit("ev");

const myEmitter2 = new MyEmitter();
myEmitter2.on("ev", (a, b) => {
    console.log("이벤트 처리 : " , a, b);
})
myEmitter2.emit("ev", "쉬고", "갑시다.");