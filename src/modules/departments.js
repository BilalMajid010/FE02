export const departments = [
    { id: "it", name: "Information Technology" },
    { id: "hr", name: "Human Resources" },
    { id: "finance", name: "Finance" },
    { id: "marketing", name: "Marketing" },
    { id: "sales", name: "Sales" },
];

export function getDepartmentName(departmentId) {
    const department = departments.find((item) => item.id === departmentId);

    return department ? department.name : "Unknown";
}

export default departments;
