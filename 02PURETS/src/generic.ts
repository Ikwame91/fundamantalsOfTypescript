const score: Array<number> = [];
const names: Array<string> = [];

function identityOne(val: boolean | number): boolean | number {
  return val;
}

function identityTwo(val: any): any {
  return val;
}
function identityThree<Type>(val: Type): Type {
  return val;
}
function identityFour<T>(val: T): T {
  return val;
}

interface Bottle {
  brand: string;
  type: number;
}

identityFour<Bottle>({
  brand: "coke",
  type: 2,

});


function getSearchProducts<T>(products : T[]): T{
    const myIndex = 3
    return products[myIndex]!

}

const getMoreSearchProducts = <T,>(products: T[]):T =>{
    //some database operations
    const myIndex =6
    return products[myIndex]!
} 

interface Database{
    connection: string
    username: string
    password: string
}



function anotherFunction<T,U>(valueOne:T, valueTwo:U): object{
 return{
    valueOne,
    valueTwo
 }
}

anotherFunction(3,true)


interface Quiz{
    name: string
    type: string
}


interface Course{
    name: string,
    author : string, 
    subject: string
}


class Sellable<T>{
    public cart: T[]=[]
    addToCart(product: T){
        this.cart.push(product)
    }
}