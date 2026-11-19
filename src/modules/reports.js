export function generateDepartmentReport(employees, departments) {
    const report = departments.map((department) => {
        const count = employees.filter(
            (employee) => employee.departmentId === department.id
        ).length;

        return `${department.name}: ${count} employee(s)`;
    });

    return [
        "EMPLOYEE DEPARTMENT REPORT",
        `Generated: ${new Date().toLocaleDateString("en-GB")}`,
        "",
        ...report,
        "",
        `Total Employees: ${employees.length}`,
    ].join("\n");
}
