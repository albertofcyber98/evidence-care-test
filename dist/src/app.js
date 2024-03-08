class Employee {
    constructor(id, name, managerId) {
        this.id = id;
        this.name = name;
        this.managerId = managerId;
        this.directReports = [];
    }
}
class EmployeeHierarchy {
    constructor(employees) {
        this.employees = employees;
        this.employees.forEach((employee) => {
            if (employee.managerId !== null) {
                const manager = this.employees.find((e) => e.id === employee.managerId);
                if (manager) {
                    manager.directReports.push(employee);
                }
                else {
                    throw new Error('Invalid manager found in the employee hierarchy.');
                }
            }
        });
    }
    findEmployee(name) {
        return this.employees.find((employee) => employee.name.toLowerCase() === name.toLowerCase());
    }
    getManagersHierarchy(employee) {
        const managers = [];
        let currentEmployee = employee;
        while (currentEmployee.managerId !== null) {
            const manager = this.employees.find((e) => e.id === currentEmployee.managerId);
            if (manager) {
                managers.push(manager);
                currentEmployee = manager;
            }
            else {
                throw new Error(`Invalid manager found in the employee hierarchy.`);
            }
        }
        return managers;
    }
    getDirectReportsCount(employee) {
        return employee.directReports.length;
    }
    getIndirectReportsCount(employee) {
        let count = 0;
        function countAllReports(emp) {
            count += emp.directReports.length;
            emp.directReports.forEach(countAllReports);
        }
        countAllReports(employee);
        return count;
    }
}
export { Employee, EmployeeHierarchy };
