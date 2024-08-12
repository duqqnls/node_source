import express from 'express';
import session from 'express-session';  // 세션 모듈 
import bodyParser from 'body-parser';   // 요청 본문 파싱용 
import path from 'path';                
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);

const app = express()
const PORT = 3000;

// bodyParser.urlencoded() 미들웨어 설정(). 주로 전송된 폼데이터를 파싱
app.use(bodyParser.urlencoded({extended:true})) // 데이터 파싱 방법 결정
// session 미들웨어 설정()
app.use(session({
    secret:'secret-key',    // 세션 암호화를 위한 비밀 키 설정
    resave:false, // 세션이 수정되지 않은 경우에도 세션을 다시 설정 유무 
    saveUninitialized:true, // 초기화되지 않은 저장 여부 
    cookie:{maxAge:30 * 60 * 1000} // 세션의 유효 시간 
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const auth = {
    id:'duqqnls',
    password:'123'
};

app.get('/', (req, res) => { // root로 접속하면,
    res.sendFile(path.join(__dirname, 'login.html')); // 로그인 페이지 호출 
});

app.post('/login', (req, res) => { // root로 접속하면,
    const {id, password} = req.body;

    if(id === auth.id && password === auth.password){
        req.session.user = id;     // 세션에 사용자 id를 저장
        res.redirect('/main');     // 로그인 성공시 메인 페이지로 리다이렉션
    }else{
        res.send('로그인 실패 <a href="/">다시 시도</a>');
    }
});

app.get('/main', (req, res) => {
    // 사용자가 로그인 한 경우에 main.ejs 파일을 호출한다.
    if(req.session.user) {
        res.render('main', {sessionID:req.sessionID});
    }else{
        res.send('접근 권한이 없습니다. <a href="/">로그인</a>');
    }
}); 

app.get('/logout', (req, res) => {
    req.session.destroy(err => {    // 세션 삭제
        if (err) {
        return res.redirect('/main'); 
        }
    })

    res.clearCookie('connect.sid'); // 세션쿠키도 삭제
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}로 서버 시작...`);
})
