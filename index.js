const express = require ('express');
const mongoose = require('mongoose');
// ملفك الرئيسي
//import Article from './modules/Article.js';
const Article = require('./modules/Article.js')
const path = require("path")
const app = express();


mongoose.connect("mongodb+srv://wael77365:Y8NO1aRTC5WBtDaR@cluster0.3kpitib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() =>{
      console.log("connected success fully")
}).catch((error) =>{
    console.log("error with connecting with DB",error)
}
);
//mongodb+srv://wael77365:Y8NO1aRTC5WBtDaR@cluster0.3kpitib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


app.use(express.json());
  
//app.post("/articles", (req, res) => {
    //const newArticle = new Article()
    //title: "my first article"
    //body: "this is body"  
    //});
    


      app.post("/articles", async (req, res) => {
        // 1. إنشاء كائن المقال الجديد
        const newArticle = new Article();
       
        const Arttitle = req.body.articleTitle
        const ArtBody = req.body.articleBody

  
        newArticle.title = Arttitle;
        newArticle.body = ArtBody;
        newArticle.NumberOflikes= 100 ;
    
        // 2. استخدام دالة save() لحفظ الكائن في قاعدة البيانات
        
        await newArticle.save()
         res.json(newArticle)
    });


    app.get("/articles",async (req,res) =>{
        const articles = await Article.find();
        console.log(articles)
        res.json(articles)
    })

app.get("/articles/:articleid",async (req,res) =>{
    const id = req.params.articleid

    try{
        const article = await Article.findById(id)
        res.json(article)
      return;
    } catch(error){
        console.log("ereor with article byId",id);
        return res.send(error);
    }
})
app.delete("/articles/:rticleid", async (req,res) =>{
    const id = req.params.articleid

    try{
        const article = await Article.findByIdAndDelete(Id)
        res.json(article)
      return;
    } catch(error){
        console.log("ereor with article byId",id);
        return res.send(error);}
});
app.get("/hello", (req,res)=> {
    res.send("hello")
})

app.get("/showArticles", async(req,res) =>{
    
    const articls = await Article.find()
    res.render("articles.ejs" , {
        allArticles:articls

        
    })
})

app.get("/jojo",(req,res) =>{
    //res.send("you visited hipzo")
    //res.sendFile(__dirname + "/opppo/numbers.ejs");
    res.render("numbers.ejs",{
        name:"yarob",
    });
});


app.get("/numbers", (req,res) =>{ 
    let numbrs ="--"; 
    for(let i =0;i<=100 ;i++){ 
        numbrs += i+"_"};


 //res.sendFile(__dirname +"/opppo/numbers.html");
 res.render("numbers.ejs",{
    name:"yarop",  
    numbrs: numbrs
});
}); {};
app.get("/", (req,res) =>{
    res.send("")
})
app.get("/findSummation/:number1/:number2", (req,res) =>{
    const num1 = req.params.number1;
    const num2 = req.params.number2;
    

    const total = Number(num1) + Number(num2);
    res.send(`the total is ${total}`)
})

app.post("/sayhello",(req,res) =>{
    //console.log(req.body)
    //res.send(`hello ${req.body.name},age is ${req.query.age}`)
    res.json({
        name:req.body.name,
        age:req.query.age,
        lang:"arabic"    });
});
app.get("/prman",(req,res) =>{

    res.sendFile(__dirname + "/nop/nump.html");
});

//9sRsQ3iu7oMGGnEz




app.post("/addComment", (req,res) =>
    res.send("post request on add comment"  ))
app.listen(3000, () => {
    console.log("i am listening in port 3000")
})
