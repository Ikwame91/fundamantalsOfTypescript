class User {
  protected _courseCount = 1;

  readonly city: string = "Ashalaja";
  constructor(
    public email: string,
    public name: string,
    private userId: string
  ) {}

  private deleteToken() {
    console.log("Token deleted");
  }
  get getAppleEmail(): string {
    return `apple${this.email}`;
  }

  get courseCount(): number {
    return this._courseCount;
  }
  set courseCount(courseNum) {
    if (courseNum <= 1) {
      throw new Error("course count should be more than 1");
    }
    this._courseCount = courseNum;
  }
}
// class User {
//     email:string
//     name:string
//     city: string = ""
//     constructor(email:string,name:string){
//         this.email = email;
//         this.name = name
//     }
// }

class subUser extends User{
  isFamily: boolean = true
  changeCourseCount(){
    this._courseCount = 5
  }
}


const hitesh = new User("japhet", "djfdd@59", "");
//
