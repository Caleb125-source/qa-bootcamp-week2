type Customer = {
    birthdayMonth?: string;
};

function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthdayMonth: "January" };
}

// the long way - check for null before accessing a property
let customer = getCustomer(0);
if (customer !== null && customer !== undefined)
    console.log(customer.birthdayMonth);

// optional property access ?. - returns undefined instead of crashing
console.log(getCustomer(0)?.birthdayMonth); // undefined
console.log(getCustomer(1)?.birthdayMonth); // January

// optional element access ?.[]
function getCustomers(hasData: boolean): Customer[] | null {
    return hasData ? [{ birthdayMonth: "March" }] : null;
}
console.log(getCustomers(false)?.[0]?.birthdayMonth); // undefined
console.log(getCustomers(true)?.[0]?.birthdayMonth); // March

// optional call ?.()
function getLogger(enabled: boolean): ((message: string) => void) | null {
    return enabled ? (message) => console.log(message) : null;
}
getLogger(false)?.("a"); // nothing happens
getLogger(true)?.("b"); // b

// ?? gives a default when the value is null/undefined
console.log(getCustomer(0)?.birthdayMonth ?? "Birthday month not available");
