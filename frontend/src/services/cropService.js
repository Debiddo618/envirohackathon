const BACKEND_URL = "/api";

// Show All Crops
const index = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/crops`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (formData) => {
  try {
    // Create a POST request thaty sends JSONified form data to the backend
    const res = await fetch(`${BACKEND_URL}/crops/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    // Return the response we get back from the backend
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { index, create };
