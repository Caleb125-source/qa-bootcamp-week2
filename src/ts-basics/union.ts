// Union type - weight can be a number or a string
function kgsToGrams(weight: number | string): number {
    // narrowing - check the type before using it
    if (typeof weight === "number") {
        return weight * 1000;
    }
    return parseFloat(weight) * 1000;
}

console.log(kgsToGrams(10));
console.log(kgsToGrams("2.5kg"));

// unions also work with fixed values
let size: "small" | "medium" | "large" = "medium";
// size = "huge"; // error - not one of the allowed values
console.log(size);
