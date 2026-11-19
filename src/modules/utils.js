import { getDepartmentName } from "./departments.js";

export function formatDate(date) {
    if (!date) {
        return "Not provided";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function formatEmployeeInformation(employee) {
    return `${employee.name} (${employee.role}) - ${getDepartmentName(employee.departmentId)}`;
}
