import * as readline from "readline";
import AccountManager from "./account";


// Create an instance of AccountManager
const accountManager = new AccountManager();

// Initialize readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const menu = `
===== Bank Account Manager =====
1. Create a New Account
2. View All Accounts
3. Exit
================================
Choose an option: `;

/**
 * Display the main menu and handle user input.
 */
function showMenu(): void {
    rl.question(menu, (choice) => {
        switch (choice.trim()) {
            case "1":
                createAccount();
                break;
            case "2":
                viewAccounts();
                break;
            case "3":
                console.log("Exiting. Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please try again.");
                showMenu();
        }
    });
}

/**
 * Prompt the user to create a new account.
 */
function createAccount(): void {
    rl.question("Enter the owner's name: ", (ownerName) => {
        rl.question("Enter the email: ", (email) => {
            try {
                const newAccount = accountManager.createAccount(ownerName, email);
                console.log("Account created successfully!");
                console.log(`Account Number: ${newAccount.accountNumber}`);
                console.log(`Owner Name: ${newAccount.ownerName}`);
                console.log(`Email: ${newAccount.email}`);
                console.log(`Balance: ${newAccount.balance}`);
            } catch (error) {
                console.error(`Error: ${(error as Error).message}`);
            }
            showMenu();
        });
    });
}

/**
 * Display all accounts.
 */
function viewAccounts(): void {
    const accounts = accountManager.getAllAccounts();
    if (accounts.length === 0) {
        console.log("No accounts found.");
    } else {
        console.log("===== All Accounts =====");
        accounts.forEach((account, index) => {
            console.log(`${index + 1}.`);
            console.log(`   Account Number: ${account.accountNumber}`);
            console.log(`   Owner Name: ${account.ownerName}`);
            console.log(`   Email: ${account.email}`);
            console.log(`   Balance: ${account.balance}`);
        });
        console.log("========================");
    }
    showMenu();
}

// Start the menu
showMenu();
