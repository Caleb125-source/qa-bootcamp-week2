// A tuple is a fixed-length array where each element has its own type
let user: [number, string] = [1, "Anderson"];
console.log("User ID: " + user[0] + " : " + user[1]);

// TS knows the type at each position
console.log(user[1].toUpperCase());

// let wrong: [number, string] = ["Anderson", 1]; // error - wrong order

// destructuring
let [id, userName] = user;
console.log(id, userName);

// handy for returning two values from a function
function getMinMax(nums: number[]): [number, number] {
    return [Math.min(...nums), Math.max(...nums)];
}
let [min, max] = getMinMax([4, 9, 1, 7]);
console.log("Min: " + min + ", Max: " + max);

// careful - push still works on a tuple
user.push(2);
console.log(user);
