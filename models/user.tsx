class User {
    // ignore the errors
    constructor(
        firstname,
        tussenvoegsel,
        lastname,
        userId,
        address,
        registerdate,
        role,
        email,
        image,
        telephone,
        description
    ) {
      this.firstname = firstname;
      this.tussenvoegsel = tussenvoegsel;
      this.lastname = lastname;
      this.userId = userId;
      this.address = address;
      this.registerdate = registerdate;
      this.role = role;
      this.email = email;
      this.image = image;
      this.telephone = telephone;
      this.description = description;
    }
  }
  
  export default User;