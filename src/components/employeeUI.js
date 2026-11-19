import { formatDate, formatEmployeeInformation } from "../modules/utils.js";

import { getDepartmentName } from "../modules/departments.js";

export function renderEmployees(employees, container) {
    container.replaceChildren();

    if (employees.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No employees found.";
        container.append(message);
        return;
    }

    const table = document.createElement("table");

    const headings = [
        "Employee",
        "Email",
        "Department",
        "Joining Date",
        "Actions",
    ];

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    headings.forEach((heading) => {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.append(th);
    });

    thead.append(headerRow);
    table.append(thead);

    const tbody = document.createElement("tbody");

    employees.forEach((employee) => {
        const row = document.createElement("tr");

        const employeeCell = document.createElement("td");
        employeeCell.textContent = formatEmployeeInformation(employee);

        const emailCell = document.createElement("td");
        emailCell.textContent = employee.email;

        const departmentCell = document.createElement("td");
        departmentCell.textContent = getDepartmentName(employee.departmentId);

        const dateCell = document.createElement("td");
        dateCell.textContent = formatDate(employee.joiningDate);

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.dataset.action = "edit";
        editButton.dataset.id = employee.id;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = employee.id;

        actionsCell.append(editButton, deleteButton);

        row.append(
            employeeCell,
            emailCell,
            departmentCell,
            dateCell,
            actionsCell
        );

        tbody.append(row);
    });

    table.append(tbody);
    container.append(table);
}
