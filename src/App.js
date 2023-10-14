import { useState, useEffect, useCallback } from "react";

import Form from "./components/form/form";

import "./App.css";
import EmployeeList from "./components/list/employeeList";

function App() {
  const [employee, setEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();

  const [originalEmploy, setOriginalEmploy] = useState([]);

  const fetchEmployeesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://employee-62eb8-default-rtdb.firebaseio.com/employee.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const loadedEmployee = [];

      for (const key in data) {
        loadedEmployee.push({
          id: key,
          name: data[key].name,
          salary: data[key].salary,
        });
      }

      setEmployee(loadedEmployee);
      setOriginalEmploy(loadedEmployee);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEmployeesHandler();
  }, [fetchEmployeesHandler]);

  const handleChange = (value) => {
    if (value === "Name") {
      const nameAscending = [...employee].sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      console.log(nameAscending);
      setEmployee(nameAscending);
    } else if (value === "ascending") {
      const numAscending = [...employee].sort((a, b) => a.salary - b.salary);
      console.log(numAscending);
      setEmployee(numAscending);
    } else if (value === "descending") {
      const numDescending = [...employee].sort((a, b) => b.salary - a.salary);
      console.log(numDescending);
      setEmployee(numDescending);
    }
  };

  async function addEmployeeHandler(employee) {
    const response = await fetch(
      "https://employee-62eb8-default-rtdb.firebaseio.com/employee.json",
      {
        method: "POST",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const onClickHandler = () => {
    const filteredEmployee = [...originalEmploy].filter(
      (employee) => +employee.salary >= minValue && +employee.salary <= maxValue
    );
    setEmployee(filteredEmployee);
  };

  return (
    <div>
      <section>
        <Form onAddEmployee={addEmployeeHandler} />
      </section>
      <section>
        <button onClick={fetchEmployeesHandler}>Fetch Employee Details</button>
      </section>
      <section>
        <div className="sortFilter">
          <div className="sorting">
          <label>
            Filter
            <br />
            <select onChange={(e) => handleChange(e.target.value)}>
              <option value="Name">Name</option>

              <option value="ascending">Low To High</option>

              <option value="descending">High To Low</option>
            </select>
            {/* <EmployeeList employees={employee} /> */}
          </label>
          <br />
          </div>
          <div className="salaryFilter">
            <label>
              Filter salary
              <br />
              <label>Min:</label>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
              ></input>
              <br />
              <label>Max:</label>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
              ></input>
              <br />
              <button onClick={onClickHandler}>Apply</button>
            </label>
          </div>
        </div>
        {!isLoading && employee.length > 0 && (
          <EmployeeList employees={employee} />
        )}
        {!isLoading && employee.length === 0 && !error && (
          <p>Found No Employee</p>
        )}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading..</p>}
      </section>
    </div>
  );
}

export default App;
