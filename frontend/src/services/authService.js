const BACKEND_URL = "http://localhost:3000/api";

// return the user
const getUser = () => {
  // if there is no token, then no user, then return null
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = JSON.parse(atob(token.split(".")[1]));
  return user;
};

//gets the signup route from the backend
const signup = async (formData) => {
  try {
    //fetch the backend sign up route
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    // json is the token
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    // setting the token inside the local storage as "token"
    localStorage.setItem("token", json.token);
    return json;
  } catch (err) {
    throw new Error(err);
  }
};
//Gets the signin route from the backend and return user object
const signin = async (user) => {
  try {
    //fetch the signin post route
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    //creating a json object from response
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    //if their is a token return, store in local token
    if (json.token) {
      localStorage.setItem("token", json.token);
      const user = JSON.parse(atob(json.token.split(".")[1]));
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signout = () => {
  localStorage.removeItem("token");
};

export { signup, signin, getUser, signout };
