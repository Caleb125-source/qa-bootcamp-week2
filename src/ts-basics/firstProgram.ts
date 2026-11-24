// type annotation - age must always be a number
let age: number = 20;
console.log("My age is: " + age);

// age = "twenty"; // error - can't assign a string to a number

// TS can also infer the type from the value
let firstName = "Caleb"; // inferred as string
let isStudent = true; // inferred as boolean

console.log(firstName + " is a student: " + isStudent);
