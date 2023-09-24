import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

function EditDepModal(props) {
    const url = 'http://127.0.0.1:8000/'
  const handleSubmit = (event) => {
    // event.preventDefault();
    fetch(`${url}department/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        DepartmentId: event.target.DepartmentId.value,
        DepartmentName: event.target.DepartmentName.value,
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

  return (
    <div className="container">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="DepartmentId">
                  <Form.Label>DepartmentId</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartmentId"
                    required
                    disabled
                    defaultValue={props.depid}
                    placeholder="DepartmentId"
                  />
                </Form.Group>

                <Form.Group controlId="DepartmentName">
                  <Form.Label>DepartmentName</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartmentName"
                    required
                    defaultValue={props.depname}
                    placeholder="DepartmentName"
                  />
                </Form.Group>

                <Form.Group>
                  <Button variant="primary" type="submit">
                    Update Department
                  </Button>
                </Form.Group>
              </Form>
            </Col>
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

export default EditDepModal;
