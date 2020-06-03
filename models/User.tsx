import { UserRole } from "./UserRole";

export class User {
    firstname: string = '';
    lastname: string = '';
    private static userId: number = 1;
    address: string = '';
    tussenvoegsel: string = '';
    register: Date = new Date();
    unregister: Date = new Date();
    password: string = '';
    private static role: UserRole = UserRole.user;
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

    public static getRole() {
        return User.role;
    }

    public static getUserId() {
        return User.userId;
    }

    constructor(firstname: string, insertion: string, lastname: string, email: string, password: string){
        this.firstname = firstname;
        this.tussenvoegsel = insertion;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}
