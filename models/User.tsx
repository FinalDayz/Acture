import { UserRole } from "./UserRole";

export class User {
    firstname: string = '';
    lastname: string = '';
    userId: number = 0;
    address: string = '';
    tussenvoegsel: string = '';
    register: Date = new Date();
    unregister: Date = new Date();
    password: string = '';
    role: UserRole = UserRole.user;
    email: string = '';
    image: string = '';
    telephone: number = 0;
    description: string = '';
    activivated: boolean = false;

    public getFullName() {
        return this.firstname +
            (this.tussenvoegsel ? " " + this.tussenvoegsel : "")
            + " " + this.lastname;
    }

    constructor(firstname: string, insertion: string, lastname: string, email: string, password: string){
        this.firstname = firstname;
        this.tussenvoegsel = insertion;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    static searchFilter(account: User, searchQuery: string): boolean {
        if (!searchQuery)
            return true;
        return (
            (account.firstname +
                (account.tussenvoegsel ? " " + account.tussenvoegsel : "")
                + " " + account.lastname).includes(searchQuery) ||
            account.email.includes(searchQuery)
        );
    }
}
