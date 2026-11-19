let employees = [
    {
        id: 1,
        name: "Ahmed Khan",
        email: "ahmed@example.com",
        departmentId: "it",
        role: "Frontend Developer",
        joiningDate: "2025-04-10",
    },
    {
        id: 2,
        name: "Sara Ali",
        email: "sara@example.com",
        departmentId: "hr",
        role: "HR Executive",
        joiningDate: "2025-06-15",
    },
    {
        id: 3,
        name: "Usman Malik",
        email: "usman@example.com",
        departmentId: "finance",
        role: "Accountant",
        joiningDate: "2025-08-20",
    },
];

let nextId = 4;

export function getEmployees() {
    return [...employees];
}

export function addEmployee(employee) {
    const newEmployee = {
        id: nextId++,
        ...employee,
    };

    employees.push(newEmployee);

    return newEmployee;
}

export function updateEmployee(id, updatedData) {
    const index = employees.findIndex((employee) => employee.id === Number(id));

    if (index === -1) {
        return null;
    }

    employees[index] = {
        ...employees[index],
        ...updatedData,
        id: Number(id),
    };

    return employees[index];
}

export function deleteEmployee(id) {
    const employeeExists = employees.some(
        (employee) => employee.id === Number(id)
    );

    if (!employeeExists) {
        return false;
    }

    employees = employees.filter((employee) => employee.id !== Number(id));

    return true;
}

export function searchEmployees(name = "", departmentId = "") {
    return employees.filter((employee) => {
        const matchesName = employee.name
            .toLowerCase()
            .includes(name.toLowerCase());

        const matchesDepartment =
            !departmentId || employee.departmentId === departmentId;

        return matchesName && matchesDepartment;
    });
}

const employeeStore = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
};

export default employeeStore;
