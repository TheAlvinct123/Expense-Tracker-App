// Initialize expenses array from localStorage if available, otherwise default to empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;

// Get references to DOM elements
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addButton = document.getElementById('add-button');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Function to save expenses array to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Event listener for the "Add" button
addButton.addEventListener('click', function(){
    // Get values from input fields
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validate input fields
    if(category === ''){
        alert('Please select a category');
        return;
    }
    if(isNaN(amount) || amount <= 0){
        alert('Please enter a valid amount');
        return;
    } 
    if(date === ''){
        alert('Please select a date');
        return;
    }

    // Add new expense to the expenses array
    expenses.push({category, amount, date});

    // Save expenses to localStorage
    saveExpenses();

    // Update total amount and display in the total amount cell
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;
    
    // Create a new row in the expenses table
    const newRow = expensesTableBody.insertRow();
    
    // Insert cells for category, amount, date, and delete button
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteButton = document.createElement('button');

    // Configure delete button
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function(){
        // Remove expense from the expenses array
        expenses.splice(expenses.indexOf(expense), 1);

        // Save expenses to localStorage
        saveExpenses();

        // Update total amount and display in the total amount cell
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        // Remove the row from the expenses table
        expensesTableBody.removeChild(newRow);
    });

    // Retrieve the latest added expense
    const expense = expenses[expenses.length - 1]
    
    // Populate cells with expense data
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteButton);
});

// Function to load expenses from localStorage and populate the table
function loadExpenses() {
    expenses.forEach(function(expense) {
        // Update total amount and display in the total amount cell
        totalAmount += expense.amount;
        totalAmountCell.textContent = totalAmount;

        // Create a new row in the expenses table
        const newRow = expensesTableBody.insertRow();
        
        // Insert cells for category, amount, date, and delete button
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteButton = document.createElement('button');

        // Configure delete button
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function(){
            // Remove expense from the expenses array
            expenses.splice(expenses.indexOf(expense), 1);

            // Save expenses to localStorage
            saveExpenses();

            // Update total amount and display in the total amount cell
            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;

            // Remove the row from the expenses table
            expensesTableBody.removeChild(newRow);
        });

        // Populate cells with expense data
        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteButton);
    });
}

// Load expenses from localStorage and populate the table on page load
loadExpenses();
