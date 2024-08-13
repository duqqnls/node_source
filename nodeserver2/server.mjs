import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express(); // Express 애플리케이션 생성

const __filename = fileURLToPath(import.meta.url); //import.meta.url : 현재 파일의 경로
const __dirname = path.dirname(__filename);

app.use(cors()); // cors 미들웨어 등록
app.use(express.json()); // express.json 미들웨어. json 파싱용 
// 예: 클라이언트가 json 데이터를 요청으로 보낼때 
// {"name":"tom","age":30} << 자동으로 파싱해 req.body 객체를 만듬
// req.body.name 또는 req.body.age로 접근이 가능해 짐.

app.set("port",process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

let datas = [
    {id:1, name:'여빙', position:'자바 개발자'},
    {id:2, name:'땅콩', position:'웹 퍼블리셔'}
]

let nextid = 3;  // 새로운 직원이 추가될 때, id 증가용 

app.get('/', (req, res) => {
    res.send('자 그럼 슬슬 시작해 볼까요. /emp, /emp/1, /abc.html');
});

// 전체 자료 읽기
app.get('/emp', (req, res) => {
    res.json(datas);
});

// 부분 자료 읽기
app.get('/emp/:id', (req, res) => {
    const employee = datas.find(emp => emp.id === parseInt(req.params.id,10));
    if(!employee) return res.status(404).send('그런 자료는 없어요');
    res.json(employee);
});

// 자료 추가
app.post('/emp', (req, res) => {
    const newEmployee = {
        id:nextid++, // 자동 증가 
        name:req.body.name,
        position:req.body.position
    };
    datas.push(newEmployee);
    res.status(201).json(newEmployee);
});

// 자료 수정
app.put('/emp/:id', (req, res) => {
    console.log(req.body)
    const employee = datas.find(emp => emp.id === parseInt(req.params.id,10));
    if(!employee) return res.status(404).send('그런 자료는 없어요');

    employee.name = req.body.name || employee.name;
    employee.position = req.body.position || employee.position;

    res.json(employee);
});

// 자료 삭제
app.delete('/emp/:id', (req, res) => {
    console.log(req.params.id);

    const empIndex = datas.findIndex(emp => emp.id === parseInt(req.params.id, 10)) // 해당자료가 있으면 10진수로 INDEX받음 
    if(empIndex === -1) return res.status(404).send('그런 자료는 없어요');          // 해당자료가 없으면 -1값을 받음

    const [delEmp] = datas.splice(empIndex, 1);

    res.json(delEmp);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트로 서버 서비스 시작중')
});