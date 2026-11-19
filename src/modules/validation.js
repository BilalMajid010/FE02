export function validateName(name) {
    return name.trim().length >= 3;
}

export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

export function validateEmployee(employee) {
    const errors = {};

    if (!validateName(employee.name)) {
        errors.name = "Name must contain at least 3 characters.";
    }

    if (!validateEmail(employee.email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!employee.departmentId) {
        errors.departmentId = "Please select a department.";
    }

    if (!employee.role.trim()) {
        errors.role = "Job role is required.";
    }

    if (!employee.joiningDate) {
        errors.joiningDate = "Joining date is required.";
    }

    return errors;
}
