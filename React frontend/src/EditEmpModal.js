import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

function EditEmpModal(props) {
  const [deps, setDeps] = useState([]);
//   const [photofilename, setPhotoFilename] = useState('anonymous.png');
//   const [imagesrc, setImageSrc] = useState(
//     process.env.REACT_APP_PHOTOPATH + photofilename
//   );
const url = 'http://127.0.0.1:8000/'

  useEffect(() => {
    fetch(url + 'department')
      .then((response) => response.json())
      .then((data) => {
        setDeps(data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'employee', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        EmployeeId: event.target.EmployeeId.value,
        EmployeeName: event.target.EmployeeName.value,
        Department: event.target.Department.value,
        DateOfJoining: event.target.DateOfJoining.value,
        // PhotoFileName: photofilename,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert('Failed');
        }
      );
  };

//   const handleFileSelected = (event) => {
//     event.preventDefault();
//     setPhotoFilename(event.target.files[0].name);
//     const formData = new FormData();
//     formData.append('myFile', event.target.files[0], event.target.files[0].name);

//     fetch(process.env.REACT_APP_API + 'Employee/SaveFile', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setImageSrc(process.env.REACT_APP_PHOTOPATH + result);
//         },
//         (error) => {
//           alert('Failed');
//         }
//       );
//   };

  return (
    <div className="container">
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="EmployeeId">
                  <Form.Label>EmployeeId</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeId"
                    required
                    placeholder="EmployeeId"
                    disabled
                    defaultValue={props.empid}
                  />
                </Form.Group>

                <Form.Group controlId="EmployeeName">
                  <Form.Label>EmployeeName</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeName"
                    required
                    defaultValue={props.empname}
                    placeholder="EmployeeName"
                  />
                </Form.Group>

                <Form.Group controlId="Department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control as="select" defaultValue={props.depmt}>
                    {deps.map((dep) => (
                      <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="DateOfJoining">
                  <Form.Label>DateOfJoining</Form.Label>
                  <Form.Control
                    type="date"
                    name="DateOfJoining"
                    required
                    defaultValue={props.doj}
                  />
                </Form.Group>

                <Form.Group>
                  <Button variant="primary" type="submit">
                    Update Employee
                  </Button>
                </Form.Group>
              </Form>
            </Col>

            {/* <Col sm={6}>
              <Image width="200px" height="200px" src={imagesrc} />
              <input onChange={handleFileSelected} type="File" />
            </Col> */}
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditEmpModal;
