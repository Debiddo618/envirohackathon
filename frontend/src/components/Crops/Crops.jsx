import styles from "./Crops.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Crops = (props) => {
  const [showModal, setShowModal] = useState(false);
  
  const initialState = {
    name: "",
    rain_average: 0,
    start_date: null,
    end_date: null,
    harvest_date: null,
    duration: 0,
  };

  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  );

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (props.selected) {
      props.handleUpdateCrop(formData, props.selected._id);
    } else {
      props.handleAddCrop(formData);
    }
    setFormData(initialState);
    setShowModal(false); // Close the modal after submission
  };

  return (
    <>
      <div className={styles.cropsContainer}>
        <div className={styles.text1}>Step 2:</div>
        <div className={styles.text2}>Set Your Crop Schedule!</div>
        <div className={styles.tableContainer}>
          <table className={styles.cropTable}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>CROP</th>
                <th className={styles.tableHeader}>PLANT</th>
                <th className={styles.tableHeader}>HARVEST</th>
                <th className={styles.tableHeader}>DURATION</th>
              </tr>
            </thead>
            <tbody>
              {props.crops && props.crops.length > 0 ? (
                props.crops.map((crop) => (
                  <tr key={crop._id}>
                    <td>{crop.name}</td>
                    <td>
                      {crop.start_date
                        ? new Date(crop.start_date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      {crop.harvest_date
                        ? new Date(crop.harvest_date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{crop.duration} days</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No crops available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Button className={styles.addButton} onClick={() => setShowModal(true)}>
        <ion-icon name="add-outline"></ion-icon>Add Crop
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.selected ? "Update Crop" : "Add Crop"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitForm}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRainAverage">
              <Form.Label>Average Rainfall (mm)</Form.Label>
              <Form.Control
                type="number"
                name="rain_average"
                value={formData.rain_average}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={formData.end_date || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHarvestDate">
              <Form.Label>Harvest Date</Form.Label>
              <Form.Control
                type="date"
                name="harvest_date"
                value={formData.harvest_date || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDuration">
              <Form.Label>Duration (days)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              {props.selected ? "Update Crop" : "+ Add Crop To Planner"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.buttons}>
        <Button variant="light">
          <Link to="/" className={styles.link1}>
            Back
          </Link>
        </Button>
        <Button variant="light">
          <Link to="/rain" className={styles.link2}>
            Next
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Crops;
