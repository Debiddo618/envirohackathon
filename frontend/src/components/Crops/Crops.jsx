//git test
import styles from "./Crops.module.css";
import { useState } from "react";

const Crops = (props) => {
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
  const [isFormVisible, setIsFormVisible] = useState(false);

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
    setIsFormVisible(false);
  };

  return (
    <>
      <div className={styles.cropsContainer}>
        <h1>Step 2:</h1>
        <p>Set Your Crop Schedule!</p>
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

      <button className={styles.addButton} onClick={() => setIsFormVisible(!isFormVisible)}>
        <ion-icon name="add-outline"></ion-icon>Add Crop
      </button>

      {isFormVisible && (
        <div className={styles.formContainer}>
          <form 
          className={styles.form}
          onSubmit={handleSubmitForm}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="rain_average">Average Rainfall (mm)</label>
            <input
              id="rain_average"
              name="rain_average"
              type="number"
              value={formData.rain_average}
              onChange={handleChange}
              required
            />
            <label htmlFor="start_date">Start Date</label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              value={formData.start_date || ""}
              onChange={handleChange}
            />
            <label htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              value={formData.end_date || ""}
              onChange={handleChange}
            />
            <label htmlFor="harvest_date">Harvest Date</label>
            <input
              id="harvest_date"
              name="harvest_date"
              type="date"
              value={formData.harvest_date || ""}
              onChange={handleChange}
            />
            <label htmlFor="duration">Duration (days)</label>
            <input
              id="duration"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
            />
            <button type="submit" className={styles.submitButton}>
              {props.selected ? "Update Crop" : "+ Add Crop To Planner"}
            </button>
          </form>
        </div>
      )}

      <div className={styles.navigationButtons}>
        <button className={styles.navButton}>Back</button>
        <button className={styles.navButton}>Next</button>
      </div>
    </>
  );
};

export default Crops;
