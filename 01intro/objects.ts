// const User = {
//     name: "Kwame",
//     email: "kwame@gmail.com",
//     isActive: true
// }

// type UserInput = {
//     name: string;
//     isPaid: boolean;
// }

// function createUser({name, isPaid}: UserInput){}

// createUser({name: "kwame", isPaid:false})

// function createCourse(): {}{
//     return {}
// }

type User = {
  readonly _id: string;
  name: string;
  email: string;
  isActive: boolean;
  creditCardDetails?: number;
};

let myUser: User = {
  _id: "1253",
  name: "k",
  email: "k@gmail.com",
  isActive: true,
};

myUser.email = "kwame@gmail.com";

type cardNumber = {
  cardnumber: string;
};
type cardDate = {
  cardate: string;
};
type cardDetails = cardNumber &
  cardDate & {
    cvv: number;
  };

export {};
