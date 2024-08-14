
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import pool from "./db.mjs";

const __filename = fileURLToPath(import.meta.url); //import.meta.url : 현재 파일의 경로
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.send('자 그럼 요청을 해 볼까요~     /sangdata, /sangdata/2');
});

// 전체 자료 읽기
app.get('/sangdata', async(req, res) => {
    try{
        // MariaDB 연결 풀에서 DB 연결을 하는 비동기 함수 
        const conn = await pool.getConnection();

        const rows = await conn.query("select * from sangdata");
        conn.release();        // 연결 해지 
        console.log(rows);
        
        res.json(rows);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});


// 부분 자료 읽기
app.get('/sangdata/:code', async(req, res) => { // async 사용
    const {code} = req.params;
    try{
        // MariaDB 연결 풀에서 DB 연결을 하는 비동기 함수 
        const conn = await pool.getConnection();

        const rows = await conn.query("select * from sangdata where code=?", [code]);
        conn.release();        // 연결 해지 
        
        if(rows.length === 0){
            return res.status(404).json({error:'그런 자료는 없어요'});
        }
        console.log(rows);
        
        res.json(rows[0]);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

// INSERT (create)
app.post('/sangdata', async(req, res) => { // async 사용
    const {code, sang, su, dan} = req.body; // body에 담겨서 code, sang, su, dan가 넘어온다.
    try{
        // MariaDB 연결 풀에서 DB 연결을 하는 비동기 함수 
        const conn = await pool.getConnection();

        const result = await conn.query("insert into sangdata values(?,?,?,?)", [code, sang, su, dan]);   // mapping
        conn.release();        // 연결 해지 
      
        res.status(201).json({id:result, code, sang, su, dan});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

// UPDATE
app.put('/sangdata/:code', async(req, res) => { 
    const {code} = req.params;
    const {sang, su, dan} = req.body; 
    try{
        // MariaDB 연결 풀에서 DB 연결을 하는 비동기 함수 
        const conn = await pool.getConnection();

        const result = await conn.query("update sangdata set sang=?,su=?,dan=? where code=?", [sang, su, dan, code]);   // mapping
        conn.release();        // 연결 해지 
      
        if(result.affectedRows === 0){
            res.status(404).json({error:'수정 대상 자료가 없어요'})
        } 
        res.status(201).json({code, sang, su, dan});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

// DELETE 
app.delete('/sangdata/:code', async(req, res) => { 
    const {code} = req.params;
    try{
        const conn = await pool.getConnection();

        const result = await conn.query("delete from sangdata where code=?", [code]);   // mapping
        conn.release();        // 연결 해지 
      
        if(result.affectedRows === 0){
            res.status(404).json({error:'삭제 대상 자료가 없어요'})
        } 
        res.json({message:'delete success'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});


app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 서버 서비스 시작중");
});
