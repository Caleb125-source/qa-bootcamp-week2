// Type alias - define the shape once, reuse it everywhere (DRY)
type Student = {
    readonly id: number;
    name?: string;
};

let student1: Student = { id: 1, name: "Caleb" };
let student2: Student = { id: 2 }; // name is optional

// reuse the same alias as a parameter type
function printStudent(student: Student) {
    console.log("Student ID: " + student.id + " : " + (student.name ?? "No name"));
}

printStudent(student1);
printStudent(student2);

// student1.id = 5; // error - id is readonly

// aliases work for unions too
type Grade = "A" | "B" | "C";
let grade: Grade = "A";
console.log(grade);
