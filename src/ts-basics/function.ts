// parameter types + return type
function calculateTax(salary: number, taxYear = 2025): number {
    // taxYear has a default value, so it's optional when calling
    if (taxYear <= 2025) {
        return salary * 1.2;
    }
    return salary * 1.3;
}

console.log(calculateTax(200000)); // uses default year 2025
console.log(calculateTax(200000, 2026));

// calculateTax(); // error - salary is required
// calculateTax(200000, 2026, 1); // error - too many arguments
// calculateTax("200000"); // error - salary must be a number

// optional parameter with ?
function greet(name: string, title?: string): string {
    return "Hello " + (title ?? "") + name;
}

console.log(greet("Caleb"));
console.log(greet("Caleb", "Mr. "));
