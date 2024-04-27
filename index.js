#!/usr/bin/env node 
import inquirer from "inquirer";
let enrolledstudents = [];
let condition = true;
while (condition) {
    let options = await inquirer.prompt([
        {
            name: "operations",
            type: "list",
            choices: ["Enroll", "Check Balance", "Pay Fee", "Status", "Students Enrolled"],
        }
    ]);
    class Student {
        name;
        password;
        id;
        course;
        constructor(name, password, id, course) {
            this.name = name;
            this.password = password;
            this.id = id;
            this.course = course;
        }
        async input() {
            const pin = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter name",
                },
                {
                    name: 'password',
                    type: 'input',
                    message: "Create Password (Only alphabetic)",
                }
            ]);
            this.password = pin.password;
            this.name = pin.name;
        }
        makeId() {
            function randomno() {
                return Math.floor(Math.random() * 9000);
            }
            this.id = randomno();
        }
        async studycourse() {
            const courses = await inquirer.prompt([
                {
                    name: "courseAvailable",
                    type: "checkbox",
                    message: "Choose courses for this semester",
                    choices: ["JAVA", "Python", "C++", "Javascript", "Ruby"],
                }
            ]);
            this.course = courses.courseAvailable;
        }
    }
    if (options.operations === "Enroll") {
        const newStudent = new Student("", "", 0, []);
        await newStudent.input();
        await newStudent.studycourse();
        newStudent.makeId();
        enrolledstudents.push(newStudent);
    }
    if (options.operations === "Status") {
        const newStudent = enrolledstudents[enrolledstudents.length - 1];
        console.log("Your Enrolled Information:");
        console.log(newStudent);
    }
    if (options.operations === "Students Enrolled") {
        if (enrolledstudents.length > 0) {
            console.log("Enrolled Students:");
            enrolledstudents.forEach(student => console.log(student));
        }
        else {
            console.log("No students enrolled yet.");
        }
    }
    let fee;
    if (options.operations === "Pay Fee") {
        fee = await inquirer.prompt([
            {
                name: "feepaid",
                type: "confirm",
                message: "Fee amount for the whole semester is 20000",
            },
            {
                name: "accountnumber",
                type: "number",
                message: "Enter Account number",
            },
            {
                name: "feeAmount",
                message: "Enter Amount",
                type: "number",
            }
        ]);
        if (Number(fee.feeAmount) === 20000) {
            console.log("Fee Paid");
        }
        else {
            console.log("Insufficient Amount");
        }
    }
    else if (options.operations === "Check Balance") {
        if (fee && fee.feeAmount === 20000) {
            console.log("Fee is Paid");
        }
        else {
            console.log("Fee is not paid");
        }
    }
}
