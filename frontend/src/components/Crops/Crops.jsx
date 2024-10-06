import styles from "./Crops.module.css";
import { useState } from "react";

const Crops = (props) => {
  // Empty fields to use if a crop has not been selected
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

  // handleChange function to update formData state
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
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Step 2:</h1>
        <p>Set Your Crop Schedule!</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>CROP</th>
              <th>PLANT</th>
              <th>HARVEST</th>
              <th>DURATION</th>
              <th>DATE</th>
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
                  <td>
                    <ion-icon name="calendar-outline"></ion-icon>
                    {crop.start_date && crop.harvest_date
                      ? `${new Date(
                          crop.start_date
                        ).toLocaleDateString()} - ${new Date(
                          crop.harvest_date
                        ).toLocaleDateString()}`
                      : "No Dates Available"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No crops available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className={styles.button}>
        <ion-icon name="add-outline"></ion-icon>Add Crop
      </button>

      <div>
        <form onSubmit={handleSubmitForm}>
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
          <button type="submit">
            {props.selected ? "Update Crop" : "Add New Crop"}
          </button>
        </form>
      </div>

      <div className={styles.buttons}>
        <button>Back</button>
        <button>Next</button>
      </div>
    </>
  );
};

export default Crops;
