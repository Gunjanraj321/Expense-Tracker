const apiUrl ="http://localhost:3000/expenses"
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

document.addEventListener("DOMContentLoaded",function () {

    function fetchExpense(){
        fetch(`${apiUrl}`,{
            method : "GET",
        })
        .then(res=>res.json())
        .then(expense=> {
            displayExpense(expense);
        })
        .catch(err=>console.log(err));
    }

    function displayExpense(expense){
        expenseList.innerHTML = "";
        expense.forEach((expense,index) => {
            const expenseItem = createExpenseItem(expense,index);
            expenseList.appendChild(expenseItem);
        });
    }

    function createExpenseItem(expense,index){
        const expenseDiv = document.createElement("div");
        expenseDiv.innerHTML= `
        <span>Name:${expense.name} </span>
        <span>Amount:${expense.amount}</span>
        <span>Quantity:${expense.quantity}</span>
        <button id="editBtn" >Update</button>
        <button id="deleteBtn">Delete</button>
        <hr>`;
    
        const editBtn = expenseDiv.querySelector("#editBtn");
        const deleteBtn = expenseDiv.querySelector("#deleteBtn");
    
        editBtn.addEventListener("click", function() {
            editExpense(expense);
        })
        deleteBtn.addEventListener("click",function() {
            deleteExpense(expense);
        })
    
        return expenseDiv;
    }

    function editExpense(expense){
        const newName = prompt("enter new name", expense.name);
        const newQuantity = prompt("enter new Quantity", expense.quantity);
        const newAmount = prompt("enter new Amount",expense.amount);

        const updatedExpense = {
            name: newName || expense.name,
            quantity : parseInt(newQuantity) || expense.quantity,
            amount : parseInt(newAmount) || expense.amount,
        }
        
        fetch(`${apiUrl}/${expense.id}`,{
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(updatedExpense),
        })
        .then((res)=>{
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(()=>{
            fetchExpense();
        })
        .catch(err=>console.log(err))
    }

    function deleteExpense(expense){
        console.log(expense)
        fetch(`${apiUrl}/${expense.id}`,{
            method:"DELETE"
        }) .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(() => {
            fetchExpense();
        }).catch(err=>{
            console.log(err);
        })
    }

    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const amount = document.getElementById("amount").value;
        const quantity = document.getElementById("quantity").value;

        if(!name || !amount || !quantity){
            console.log("data not filled completely")
        }else{
            const newExpense ={
                name : name,
                amount : amount,
                quantity : quantity,
            };
            addExpense(newExpense);
            expenseForm.reset();
        }
    })

function addExpense(expense) {
   fetch(`${apiUrl}`,{
    method :"POST",
    headers : {
        "Content-Type":"application/json"
    },
    body : JSON.stringify(expense),
   })
    .then(res=>res.json())
    .then(() =>{
        fetchExpense();
    })
    .catch(err=>console.log(err));
}

fetchExpense();

})