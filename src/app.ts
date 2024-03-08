class Employee {
  id: number;
  name: string;
  managerId: number | null;
  directReports: Employee[];

  constructor(id: number, name: string, managerId: number | null) {
    this.id = id;
    this.name = name;
    this.managerId = managerId;
    this.directReports = [];
  }
}

class EmployeeHierarchy {
  employees: Employee[];

  constructor(employees: Employee[]) {
    this.employees = employees;

    this.employees.forEach((employee) => {
      if (employee.managerId !== null) {
        const manager = this.employees.find((e) => e.id === employee.managerId);
        if (manager) {
          manager.directReports.push(employee);
        } else {
          throw new Error('Invalid manager found in the employee hierarchy.');
        }
      }
    });
  }

  findEmployee(name: string): Employee | undefined {
    return this.employees.find((employee) => employee.name.toLowerCase() === name.toLowerCase());
  }

  getManagersHierarchy(employee: Employee): Employee[] {
    const managers: Employee[] = [];
    let currentEmployee = employee;

    while (currentEmployee.managerId !== null) {
      const manager = this.employees.find((e) => e.id === currentEmployee.managerId);
      if (manager) {
        managers.push(manager);
        currentEmployee = manager;
      } else {
        throw new Error(`Invalid manager found in the employee hierarchy.`);
      }
    }

    return managers;
  }

  getDirectReportsCount(employee: Employee): number {
    return employee.directReports.length;
  }

  getIndirectReportsCount(employee: Employee): number {
    let count = 0;

    function countAllReports(emp: Employee): void {
      count += emp.directReports.length;
      emp.directReports.forEach(countAllReports);
    }

    countAllReports(employee);

    return count;
  }
}

export {Employee, EmployeeHierarchy}