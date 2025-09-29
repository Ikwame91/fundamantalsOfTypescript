interface User {
  readonly dbID: number;
  email: string;
  userId: number;
  googleId?: string;
  startTrial(): string;
  getCoupon(coupnname: string, value: number): number;
}

interface User {
  githubToken: string;
}

interface Admin extends User {
  roles: "admin" | "ta" | "learner";
}
const hitesh: User = {
  dbID: 759,
  
  githubToken: "kwame",
  email: "kwame@gmail.com",
  userId: 9494,
  startTrial: () => {
    return "monjutic";
  },
  getCoupon: (name: "stratos", value: 56) => {
    return 10;
  },
};
