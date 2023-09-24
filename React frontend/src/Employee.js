import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import  AddEmpModal  from './AddEmpModal';
import  EditEmpModal  from './EditEmpModal';

function Employee() {
  const [emps, setEmps] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [empDetails, setEmpDetails] = useState({
    empid: null,
    empname: '',
    depmt: '',
    photofilename: '',
    doj: '',
  });

  const url = 'http://127.0.0.1:8000/'
  const refreshList = () => {
    fetch(url+'employee')
      .then((response) => response.json())
      .then((data) => {
        setEmps(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const deleteEmp = (empid) => {
    if (window.confirm('Are you sure?')) {
      fetch(`${url}employee/${empid}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
    }
  };

  const editModalClose = () => {
    setEditModalShow(false);
  };

  return (
    <div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>EmployeeId</th>
            <th>EmployeeName</th>
            <th>Department</th>
            <th>DOJ</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((emp) => (
            <tr key={emp.EmployeeId}>
              <td>{emp.EmployeeId}</td>
              <td>{emp.EmployeeName}</td>
              <td>{emp.Department}</td>
              <td>{emp.DateOfJoining}</td>
              <td>
                <ButtonToolbar>
                  <Button
                    className="mr-2"
                    variant="info"
                    onClick={() =>
                      setEmpDetails({
                        empid: emp.EmployeeId,
                        empname: emp.EmployeeName,
                        depmt: emp.Department,
                        photofilename: emp.PhotoFileName,
                        doj: emp.DateOfJoining,
                      })
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={() => deleteEmp(emp.EmployeeId)}
                  >
                    Delete
                  </Button>

                  <EditEmpModal
                    show={editModalShow}
                    onHide={editModalClose}
                    empid={empDetails.empid}
                    empname={empDetails.empname}
                    depmt={empDetails.depmt}
                    photofilename={empDetails.photofilename}
                    doj={empDetails.doj}
                  />
                </ButtonToolbar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonToolbar>
        <Button variant="primary" onClick={() => setAddModalShow(true)}>
          Add Employee
        </Button>

        <AddEmpModal show={addModalShow} onHide={() => setAddModalShow(false)} />
      </ButtonToolbar>
    </div>
  );
}

export default Employee;
