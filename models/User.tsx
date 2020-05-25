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
            (this.tussenvoegsel ? " "+this.tussenvoegsel : "")
            + " " + this.lastname;
    }
}
