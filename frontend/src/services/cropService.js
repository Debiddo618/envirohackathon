const BACKEND_URL = 'http://localhost:3000/api';

// Show All Crops
const index = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/crops`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

export { index }; 