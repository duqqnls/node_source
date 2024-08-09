// http 모듈을 이용해 웹 서버 구축 가능
import http from 'http';

http.createServer((req, res) => {   // 요청과 반응
    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
    res.write('<h1>환영합니다. 노드 서버 세상에 오신 것을</h1>');
    res.write('반가워요');
    res.end('<p>Hello~</p>');
    // res.write('반가반가');
})
.listen(8080, () => {
    console.log('서버 서비스 중...');
})