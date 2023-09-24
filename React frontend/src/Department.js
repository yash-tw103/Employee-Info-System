import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import  AddDepModal  from './AddDepModal';
import  EditDepModal  from './EditDepModal';

function Department() {
  const [deps, setDeps] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [depid, setDepId] = useState(null);
  const [depname, setDepName] = useState('');

  const url = 'http://127.0.0.1:8000/'
  const refreshList = () => {
    fetch(`${url}department/`)
      .then((response) => response.json())
      .then((data) => {
        setDeps(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const deleteDep = (depid) => {
    if (window.confirm('Are you sure?')) {
      fetch(`${url}department/${depid}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
  };

  const addModalClose = () => setAddModalShow(false);
  const editModalClose = () => setEditModalShow(false);

  return (
    <div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>DepartmentId</th>
            <th>DepartmentName</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {deps.map((dep) => (
            <tr key={dep.DepartmentId}>
              <td>{dep.DepartmentId}</td>
              <td>{dep.DepartmentName}</td>
              <td>
                <ButtonToolbar>
                  <Button
                    className="mr-2"
                    variant="info"
                    onClick={() => {
                      setEditModalShow(true);
                      setDepId(dep.DepartmentId);
                      setDepName(dep.DepartmentName);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={() => deleteDep(dep.DepartmentId)}
                  >
                    Delete
                  </Button>

                  <EditDepModal
                    show={editModalShow}
                    onHide={editModalClose}
                    depid={depid}
                    depname={depname}
                  />
                </ButtonToolbar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => setAddModalShow(true)}
        >
          Add Department
        </Button>

        <AddDepModal
          show={addModalShow}
          onHide={addModalClose}
        />
      </ButtonToolbar>
    </div>
  );
}

export default Department;
