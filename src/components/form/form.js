import { useRef } from "react";

import classes from "./form.module.css";

const Form = (props) => {
  const nameRef = useRef("");
  const salaryRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const employee = {
      name: nameRef.current.value,
      salary: salaryRef.current.value,
    };

    props.onAddEmployee(employee);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="Name" ref={nameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="salary">Salary: </label>
        <input type= 'number' id="opening-text" ref={salaryRef}></input>
      </div>
      <button>Add Employee</button>
    </form>
  );
};

export default Form;
