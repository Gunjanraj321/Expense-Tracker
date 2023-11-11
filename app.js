const express = require("express");
const path = require("path");
const db = require("./database/data");
const port = 3000;
const expenseController = require("./controllers/dataControllers")
const app=express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/expenses",expenseController.createExpense );
app.get("/expenses",expenseController.getExpense);
app.put("/expenses/:id", expenseController.editExpense);
app.delete("/expenses/:id", expenseController.deleteExpense);

app.use(express.static(path.join(__dirname,"public")));

app.get("/welcome" , (req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})

app.listen(port,()=>{
    console.log("server running at port ",port);
    // db.connect((err)=>{
    //     if(err){
    //         console.log("error connecting database");
    //         return;
    //     }
    //     console.log("connected to database");
    // })
});
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server and database connection closed.');
        process.exit(0);
    });
});