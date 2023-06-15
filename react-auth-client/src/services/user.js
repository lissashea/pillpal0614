// import api from "./apiConfig";

// const getToken = () => {
//   return new Promise((resolve) => {
//     resolve(`Token ${localStorage.getItem("token") || null}`);
//   });
// };

// const SignUp = () => {
//   fetch("http://localhost:8000/api/register/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(serializedData),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       navigate("/signin"); // Navigate to the sign-in page ("/signin")
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

// const SignIn = () => {
//   fetch("http://localhost:8000/api/login/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(signInData),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Sign-in successful. Response data:", data);
//       const { token } = data;
//       localStorage.setItem("token", token);
//       onSignIn(); // Call the callback to update isLoggedIn in App.js
//       navigate("/profile");
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

// export const signOut = async () => {
//   try {
//     localStorage.removeItem("token");
//     return true;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getUser = async () => {
//   fetch("http://localhost:8000/api/profile/?cache=" + Date.now(), {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Profile data received:", data);
//       setProfileData(data);
//       setIsLoggedIn(true);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }, [navigate, setProfileData, setIsLoggedIn, token]);

// useEffect(() => {
//   if (token && username) {
//     localStorage.setItem("token", token);
//     localStorage.setItem("username", username);
//   }
// }, [token, username]);
//   try {
//     let token = await getToken();

//     if (token === "Token null") {
//       return null;
//     }

//     console.log(token);

//     const headers = {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: token,
//     };

//     const response = await api.get("/api/profile", { headers });
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
