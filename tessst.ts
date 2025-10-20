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
