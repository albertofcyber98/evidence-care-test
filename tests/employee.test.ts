import { Employee,EmployeeHierarchy } from "../src/app";
import correctEmployeesJson from '../src/mock-data/correct-employees.json'
describe("Employee Hierarchy", () => {
  const correctEmployees: Employee[] = correctEmployeesJson;

  it("should find an employee", () => {
    const hierarchy = new EmployeeHierarchy(correctEmployees);
    const employee = hierarchy.findEmployee("evelina");
    expect(employee?.name).toBe("evelina");
  });
  
  it("should handle employee not found", () => {
    const hierarchy = new EmployeeHierarchy(correctEmployees);
    const employee = hierarchy.findEmployee("martin");
    expect(employee).toBeUndefined();
  });
  
  it("should get managers hierarchy", () => {
    const hierarchy = new EmployeeHierarchy(correctEmployees);
    const employee = hierarchy.findEmployee("evelina");
    const managers = hierarchy.getManagersHierarchy(employee!);
    expect(managers.map((m) => m.name)).toEqual(["eveleen", "kacie", "raelynn"]);
  });

  it("should get direct reports count", () => {
    const hierarchy = new EmployeeHierarchy(correctEmployees);
    const employee = hierarchy.findEmployee("kacie");
    const count = hierarchy.getDirectReportsCount(employee!);
    expect(count).toBe(12);
  });
  
  it("should get indirect reports count", () => {
    const hierarchy = new EmployeeHierarchy(correctEmployees);
    const employee = hierarchy.findEmployee("darin");
    const count = hierarchy.getIndirectReportsCount(employee!);
    expect(count).toBe(15);
  });
});