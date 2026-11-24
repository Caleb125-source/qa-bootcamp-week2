let employee: {
    readonly id: number; // readonly - id can't be changed after creation
    name?: string; // ? makes name optional
    retire: (year: number) => number;
};

employee = {
    id: 1,
    name: "Caleb",
    retire: function (y) {
        return y;
    },
};

employee.name = "Mark"; // allowed - name is not readonly
// employee.id = 2; // error - id is readonly

console.log("Employee ID: " + employee.id + " : " + employee.name + " Will retire on: " + employee.retire(2026));
