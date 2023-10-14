import { useState } from "react";

import classes from "./employee.module.css";

const Employee = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    setIsClicked(current => !current);
  };

  return (
    <li className={classes.employee} onClick={clickHandler}>
      <h2>Name: {props.name}</h2>
      {isClicked && <h3>Salary: {props.salary}</h3>}
    </li>
  );
};

export default Employee;
