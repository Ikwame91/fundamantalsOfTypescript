function addTwo(num: number) {
  return num + 2;
}

function getUpper(val: string) {
  return val.toUpperCase();
}

function signUpUser(name: string, email: string, isPaid: boolean) {}

// const getHello = (s: string) => {
//   return true;
// };

const getHello = (s: string): string => {
  return "";
};
const heros = ["thor", "spiderman", "ironman"];
heros.map((hero): string => {
  return `this is my ${hero}`;
});

let loginUser = (name: string, email: string, paid: boolean = false) => {};

function consoleError(errmsg: string): never {
  throw new Error(errmsg);
}

function handleError() {}

signUpUser("kwame", "kwame@gmail.com", true);
getUpper("demistify");
addTwo(5);
loginUser("h", "h@h.com");
getHello("j");

export {};
