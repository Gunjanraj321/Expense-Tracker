
const db = require('../database/data');


const createExpense = async(req , res )=> {
    const data = req.body;
    data.json;
    // console.log(data)
    // const name = result.name
    try{
        await db.query(
            "INSERT INTO expenses (name , amount , quantity) VALUES (? ,? ,?)",
            [data.name,data.amount,data.quantity] 
        );
        res.json({ success: true, result: data });
    }catch(err){
        console.error("Error inserting expense:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

const getExpense =  async (req,res) => {
    try{
        const result = await db.query('SELECT * FROM expenses');
        res.header("Content-Type",'application/json');
        res.json(result[0]);
    }catch(err){
        console.error("Error fetching expense:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" }); 
    }
}

const deleteExpense = async (req , res )=>{
    const id = req.params.id;
    await db.query('DELETE FROM expenses WHERE ID = ?',[id]);
    res.json({ success: true, message: 'Expense deleted successfully' });
}

const editExpense = async (req, res) => {
    const id = req.params.id;
    const updatedExpense = req.body;

    try {
        const result = await db.query(
            "UPDATE expenses SET name = ?, quantity = ?, amount = ? WHERE id = ?",
            [updatedExpense.name, updatedExpense.quantity, updatedExpense.amount, id]
        );

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Expense not found' });
            return;
        }

        res.json(updatedExpense);
    } catch (err) {
        console.error('Error updating expense:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports= {createExpense , deleteExpense , getExpense , editExpense}