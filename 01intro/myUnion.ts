let score: number | string = 33;
score = "556";
score = 44;

type User = {
  name: string;
  id: number;
};

type Admin = {
  username: string;
  id: number;
};

let kwame: User | Admin = { name: "kwame", id: 444 };

kwame = { username: "jefferson", id: 89 };

function getDbId(id: number | string) {
  if (typeof id === "string") {
    id.toLowerCase;
  }
}

//array
const data: number[] = [1, 2, 4];
const data1: string[] = ["1", "2", "3"];
const data3: (string | number)[] = ["", 3, "5"];


export{}