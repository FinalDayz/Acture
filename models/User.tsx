import { UserRole } from "./UserRole";

export class User {
    private static loggedInUser: User;

    firstname: string = '';
    lastname: string = '';
    userId: number = 1;
    address: string = '';
    tussenvoegsel: string = '';
    register: Date = new Date();
    unregister: Date = new Date();
    password: string = '';
    role: UserRole = UserRole.admin;
    email: string = '';
    image: string = '';
    telephone: number = 0;
    description: string = '';
    activivated: boolean = false;

    static getLoggedInUser(): User
    {
        if(User.loggedInUser === undefined) {
            User.loggedInUser = new User();
        }
        return User.loggedInUser;
    }

    static setLoggedInUser(user: User) {
        User.loggedInUser = user;
    }

    public static getRole() {
        return User.getLoggedInUser().role;

    }

    public static getUserId() {
        return User.getLoggedInUser().userId;
    }

    public getFullName() {
        return this.firstname +
            (this.tussenvoegsel ? " " + this.tussenvoegsel : "")
            + " " + this.lastname;
    }

    constructor(firstname: string = '', insertion: string = '', lastname: string = '', email: string = '', password: string = ''){
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
                + " " + account.lastname).toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
}
