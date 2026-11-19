import "./style.css";

import {
    employeeStore,
    departments,
    validateEmployee,
} from "./modules/index.js";

import { renderEmployees } from "./components/employeeUI.js";

const employeeForm = document.getElementById("employeeForm");
const employeeList = document.getElementById("employeeList");
const employeeId = document.getElementById("employeeId");
const message = document.getElementById("message");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const departmentInput = document.getElementById("department");
const roleInput = document.getElementById("role");
const joiningDateInput = document.getElementById("joiningDate");

const searchName = document.getElementById("searchName");
const searchDepartment = document.getElementById("searchDepartment");

const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");

const reportButton = document.getElementById("reportButton");
const reportOutput = document.getElementById("reportOutput");

function populateDepartments() {
    departments.forEach((department) => {
        const option = document.createElement("option");

        option.value = department.id;
        option.textContent = department.name;

        departmentInput.append(option.cloneNode(true));
        searchDepartment.append(option);
    });
}

function displayEmployees() {
    const filteredEmployees = employeeStore.searchEmployees(
        searchName.value.trim(),
        searchDepartment.value
    );

    renderEmployees(filteredEmployees, employeeList);
}

function showMessage(text, isError = false) {
    message.textContent = text;
    message.classList.toggle("error", isError);
}

function resetForm() {
    employeeForm.reset();
    employeeId.value = "";

    formTitle.textContent = "Add Employee";
    submitButton.textContent = "Add Employee";
    cancelButton.hidden = true;
}

employeeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const employeeData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        departmentId: departmentInput.value,
        role: roleInput.value.trim(),
        joiningDate: joiningDateInput.value,
    };

    const errors = validateEmployee(employeeData);

    if (Object.keys(errors).length > 0) {
        showMessage(Object.values(errors).join(" "), true);
        return;
    }

    if (employeeId.value) {
        const updated = employeeStore.updateEmployee(
            employeeId.value,
            employeeData
        );

        if (!updated) {
            showMessage("Employee could not be updated.", true);
            return;
        }

        showMessage("Employee updated successfully.");
    } else {
        employeeStore.addEmployee(employeeData);
        showMessage("Employee added successfully.");
    }

    resetForm();
    displayEmployees();
});

employeeList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "delete") {
        const deleted = employeeStore.deleteEmployee(id);

        if (deleted) {
            showMessage("Employee deleted successfully.");
            displayEmployees();
        }

        return;
    }

    if (action === "edit") {
        const employee = employeeStore
            .getEmployees()
            .find((item) => item.id === id);

        if (!employee) {
            return;
        }

        employeeId.value = employee.id;
        nameInput.value = employee.name;
        emailInput.value = employee.email;
        departmentInput.value = employee.departmentId;
        roleInput.value = employee.role;
        joiningDateInput.value = employee.joiningDate;

        formTitle.textContent = "Update Employee";
        submitButton.textContent = "Update Employee";
        cancelButton.hidden = false;

        showMessage("Editing employee information.");
        employeeForm.scrollIntoView({ behavior: "smooth" });
    }
});

cancelButton.addEventListener("click", () => {
    resetForm();
    showMessage("Editing cancelled.");
});

searchName.addEventListener("input", displayEmployees);
searchDepartment.addEventListener("change", displayEmployees);

reportButton.addEventListener("click", async () => {
    try {
        const reports = await import("./modules/reports.js");

        reportOutput.textContent = reports.generateDepartmentReport(
            employeeStore.getEmployees(),
            departments
        );
    } catch (error) {
        showMessage("Unable to generate report.", true);
        console.error(error);
    }
});

populateDepartments();
displayEmployees();
