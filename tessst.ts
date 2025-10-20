function isEven(num: number): boolean {
  if (num % 2 === 0) {
    return true;
  }
  return false;
}

function isOdd(num: number): boolean {
  return !isEven(num);
}

// Find the maximum number in an array
function findMax(arr: number[]): number | null {
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}

function findPositveNumbers(arr: number[]): number[] {
  const positveNumbers: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      positveNumbers.push(arr[i]);
    }
  }
  return positveNumbers;
}

function countPositives(arr: number[]): number {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      count++;
    }
  }
  return count;
}

function countVowels(str: string): number {
  const vowels = "aeiouAEIOU";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (vowels.indexOf(str[i]) !== -1) {
      count++;
    }
  }
  return count;
}

function countVowels1(str: string): number {
  const vowels = "aeiouAEIOU";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }
  return count;
}

// function countConsonants(str: string): number{
//     const vowels = 'aeiouAEIOU';
//     let count =0;

//     for (let i =0 ; i< str.length; i++){
//         const char = str[i];
//         if ( /[a-zA-Z]/.test(char) && !vowels.includes(char) ){
//             count++;
//         }
//     }
//     return count;
// }

//match all letters that are not vowels, digits, underscores, or non-word characters
// function countConsonantsUsingRegex(str: string): number{
//     const matches = str.match(/[^aeiou\W\d_]/gi)
//     return matches ? matches.length : 0;
// }

function countVowelsUsingRegex(str: string): number {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

function countConstantsUsingRegex(str: string): number {
  const matches = str.match(/^aeiou\W\d_/gi);
  return matches ? matches.length : 0;
}

function countConstant(str: string): number {
  const vowels = "aeiouAEIOU";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (/[a-zA-Z]/.test(char) && !vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

function countVowelsAndConstants(str: string): {
  vowels: number;
  consonants: number;
} {
  const vowels = "aeiouAEIOU";
  let vowelCount = 0;
  let consonantsCount = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    //check if its letter a-z or A-Z
    if (/[a-zA-Z]/.test(char)) {
      if (vowels.includes(char)) {
        vowelCount++;
      } else {
        consonantsCount++;
      }
    }
  }
  return { consonants: consonantsCount, vowels: vowelCount };
}

// function countVowelsAndConstants(str: string): { vowels: number; consonants: number } {
//     const vowelsSet = new Set('aeiouAEIOU');
//     let vowelsCount = 0;
//     let consonantsCount = 0;
//     for (let i = 0; i < str.length; i++) {
//         const char = str[i];
//         if (/[a-zA-Z]/.test(char)) {
//             if (vowelsSet.has(char)) {
//                 vowelsCount++;
//             } else {
//                 consonantsCount++;
//             }
//         }
//     }
//     return { vowels: vowelsCount, consonants: consonantsCount };
// }

function sumEvenNumber(numbers: number[]): number {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    let evenSum = numbers[i];
    if (evenSum % 2 === 0) {
      sum += evenSum;
    }
  }
  return sum;
}

function sumEvenNumber1(numbers: number[]): number {
  return numbers
    .filter((num) => num % 2 === 0)
    .reduce((sum, num) => sum + num, 0);
}

function doubleEvenNumbers(numbers: number[]): number[] {
  const doubledEvens: number[] = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      doubledEvens.push(numbers[i] * 2);
    }
  }
  return doubledEvens;
}

function doubledEvenNumber1(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0).map((num) => num * 2);
}

function reverseString(str: string): string {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

function reverseString1(str: string): string {
  return str.split("").reverse().join("");
}

function PalindromeString(str: string): boolean {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return str === reversed;
}

function mostfrequentCharacter(str: string): string {
  const charCount: { [key: string]: number } = {};
  let maxCount = 0;
  let mostfrequentCharacter = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    //
    charCount[char] = (charCount[char] || 0) + 1;
    if (charCount[char] > maxCount) {
      maxCount = charCount[char];
      mostfrequentCharacter = char;
    }
  }
  return mostfrequentCharacter;
}

function mostFrequentChar(str: string): string {
  let mostFrequent = "";
  let maxCount = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    let count = 0;

    for (let j = 0; j < str.length; j++) {
      if (str[j] === char) {
        count++;
      }
    }
    if (count > maxCount) {
      maxCount = count;
      mostFrequent = char;
    }
  }
  return mostFrequent;
}


// str = "aabb"
// const charcount : { [key: string]: number } = {};
// let maxcount =0;
// for (let i=0; i< str.length; i++){
//     const char = str[i];

//     imagine char = "a" first loop
//     initially charcount = {} completely empty
//     so charcount['a'] is undefined
//     charcount['a'] || 0 means if theres already a value for charcount['a'], 
//     use it, otherwise use 0 s0 tthis becomes 
//    charcount['a'] = 0 + 1 = 1

//     charcount[char] = (charcount[char] || 0) +1;}