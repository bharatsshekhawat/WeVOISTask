import Employee from "./employee";
import classes from "./employee.module.css";

const EmployeeList = (props) => {
  return (
    <ul className={classes["employee-list"]}>
      {props.employees.map((employee) => (
        <Employee
          key={employee.id}
          name={employee.name}
          salary={employee.salary}
        />
      ))}
    </ul>
  );
};

export default EmployeeList;
