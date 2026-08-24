import { useState } from "react";
import { useNavigate } from "react-router-dom";


// ============================================================
// LOGIN COMPONENT
// ============================================================
//
// This component is responsible for:
//
// 1. Taking username and password
// 2. Calling the ASP.NET Core Login API
// 3. Checking the API response
// 4. Saving the token after successful login
// 5. Showing success/failure messages
// 6. Navigating to Dashboard after successful login
//
// ============================================================

function Login() {

  // ==========================================================
  // REACT STATE
  // ==========================================================

  // Stores the username entered by the user.
  const [username, setUsername] = useState("");

  // Stores the password entered by the user.
  const [password, setPassword] = useState("");

  // Stores the message that we want to show to the user.
  //
  // Example:
  // "Login successful!"
  // "Invalid username or password."
  // "Unable to connect to the server."
  const [message, setMessage] = useState("");

  // Controls whether the Login button is disabled.
  //
  // false = normal
  // true  = API request is running
  const [loading, setLoading] = useState(false);


  // ==========================================================
  // REACT ROUTER
  // ==========================================================

  // useNavigate comes from react-router-dom.
  //
  // We use it to move the user from Login to Dashboard
  // without refreshing the browser.
  const navigate = useNavigate();


  // ==========================================================
  // LOGIN FUNCTION
  // ==========================================================

  async function handleLogin(e) {

    // Prevent the browser from refreshing the page
    // when the form is submitted.
    e.preventDefault();


    // Remove any previous message.
    setMessage("");


    // Tell React that login/API request has started.
    setLoading(true);


    console.log("=================================");
    console.log("LOGIN STARTED");
    console.log("Username:", username);
    console.log("=================================");


    try {

      // ======================================================
      // CALL ASP.NET CORE API
      // ======================================================

      console.log("Calling Login API...");


      const response = await fetch(
        "https://localhost:7153/api/Auth/login",
        {
          // POST means we are sending data to the backend.
          method: "POST",

          // Tell ASP.NET Core that we are sending JSON.
          headers: {
            "Content-Type": "application/json",
          },

          // Convert JavaScript object into JSON.
          //
          // Backend receives:
          //
          // {
          //   "username": "...",
          //   "password": "..."
          // }
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );


      // ======================================================
      // API RESPONSE
      // ======================================================

      console.log("API response received.");
      console.log("HTTP Status:", response.status);
      console.log("HTTP OK:", response.ok);


      // Convert JSON response from ASP.NET Core
      // into a JavaScript object.
      const data = await response.json();


      // IMPORTANT:
      //
      // Keep this console.log while developing.
      // It lets us see exactly what the backend is returning.
      console.log("Complete API Response:", data);


      // ======================================================
      // CHECK LOGIN RESULT
      // ======================================================

      // Your API is expected to return something like:
      //
      // {
      //   "isSuccess": true,
      //   "message": "Login successful",
      //   "token": "..."
      // }
      //
      // We specifically check for true here.
      if (data.isSuccess === true) {

        console.log("LOGIN SUCCESSFUL");


        // ====================================================
        // SAVE TOKEN
        // ====================================================

        // Save the token returned by the backend.
        //
        // Later, we can use this token when calling
        // protected APIs.
        localStorage.setItem("token", data.token);


        console.log("Token saved successfully.");


        // ====================================================
        // SHOW SUCCESS MESSAGE
        // ====================================================

        setMessage(
          data.message || "Login successful!"
        );


        // ====================================================
        // NAVIGATE TO DASHBOARD
        // ====================================================

        // Wait for 1 second so the user can see
        // the successful login message.
        setTimeout(() => {

          navigate("/dashboard");

        }, 1000);

      }
      else {

        // ====================================================
        // LOGIN FAILED
        // ====================================================

        console.log("LOGIN FAILED");

        console.log(
          "Failure message:",
          data.message
        );


        // Display the message returned by the API.
        setMessage(
          data.message ||
          "Invalid username or password."
        );
      }

    }
    catch (error) {

      // ======================================================
      // CONNECTION / NETWORK ERROR
      // ======================================================

      console.error("LOGIN ERROR:", error);


      // This normally means React couldn't communicate
      // with the ASP.NET Core API.
      //
      // Possible reasons:
      //
      // - API is not running
      // - Wrong API URL
      // - CORS problem
      // - HTTPS certificate problem
      // - Network problem
      setMessage(
        "Unable to connect to the server."
      );

    }
    finally {

      // ======================================================
      // STOP LOADING
      // ======================================================

      // Whether login succeeds or fails,
      // stop the loading state.
      setLoading(false);

    }
  }


  // ==========================================================
  // LOGIN PAGE UI
  // ==========================================================

  return (

    <div className="login-container">

      <div className="login-box">

        {/* Page heading */}
        <h1>Login</h1>


        {/* Page subtitle */}
        <p className="subtitle">
          Welcome back! Please login to continue.
        </p>


        {/* ==================================================
            LOGIN FORM
            ================================================== */}

        <form onSubmit={handleLogin}>


          {/* ==================================================
              USERNAME
              ================================================== */}

          <div className="input-group">

            <label htmlFor="username">
              Username
            </label>


            <input
              id="username"
              type="text"
              placeholder="Enter username"

              // React gets the current username from state.
              value={username}

              // Every time the user types,
              // update the username state.
              onChange={(e) =>
                setUsername(e.target.value)
              }

              // Username cannot be empty.
              required
            />

          </div>


          {/* ==================================================
              PASSWORD
              ================================================== */}

          <div className="input-group">

            <label htmlFor="password">
              Password
            </label>


            <input
              id="password"
              type="password"
              placeholder="Enter password"

              // React gets the current password from state.
              value={password}

              // Every time the user types,
              // update the password state.
              onChange={(e) =>
                setPassword(e.target.value)
              }

              // Password cannot be empty.
              required
            />

          </div>


          {/* ==================================================
              LOGIN BUTTON
              ================================================== */}

          <button
            type="submit"

            // Disable button while API is running.
            disabled={loading}
          >

            {/* 
              Change button text depending on loading state.

              Before API call:
              Login

              During API call:
              Logging in...
            */}
            {loading
              ? "Logging in..."
              : "Login"}

          </button>


          {/* ==================================================
              MESSAGE
              ==================================================

              This section appears only when "message"
              contains some text.
          */}

          {message && (

            <p className="message">
              {message}
            </p>

          )}

        </form>

      </div>

    </div>
  );
}


// ============================================================
// EXPORT
// ============================================================
//
// This allows App.jsx to import this component:
//
// import Login from "./components/Login";
//
// ============================================================

export default Login;