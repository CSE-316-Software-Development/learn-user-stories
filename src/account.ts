export type Account = {
    accountNumber: string;
    ownerName: string;
    email: string;
    balance: number;
};

export class AccountManager {
    private accounts: Account[] = [];

    /**
     * Create a new bank account.
     * @param ownerName Name of the account owner
     * @param email Email of the account owner
     * @returns The created account or an error if the account already exists
     */
    createAccount(ownerName: string, email: string): Account {
        // Check for duplicate accounts based on email
        const existingAccount = this.accounts.find((account) => account.email === email);
        if (existingAccount) {
            throw new Error("Account with this email already exists.");
        }

        // Generate a unique account number
        const accountNumber = `ACC-${Math.floor(100000 + Math.random() * 900000)}`;

        // Create and store the new account
        const newAccount: Account = { accountNumber, ownerName, email, balance: 0 };
        this.accounts.push(newAccount);

        return newAccount;
    }

    /**
     * Get all accounts (for testing and verification).
     */
    getAllAccounts(): Account[] {
        return this.accounts;
    }
}

export default AccountManager;
