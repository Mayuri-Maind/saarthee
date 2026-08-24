function Dashboard() {

  // ----------------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------------
  //
  // This function runs when the user clicks Logout.
  //
  // For now, our token is stored in localStorage.
  // So logout simply removes the token.
  //
  const handleLogout = () => {

    // Remove login token from browser storage.
    localStorage.removeItem("token");

    // Send user back to Login page.
    window.location.href = "/";
  };


  // ----------------------------------------------------------
  // START INTERVIEW
  // ----------------------------------------------------------
  //
  // For now we simply navigate to the Interview page.
  //
  // The Interview page will be responsible for
  // calling the .NET API.
  //
  const handleStartInterview = () => {

    window.location.href = "/interview";
  };


  return (
    <div className="dashboard">


      {/* ======================================================
          HEADER
          ====================================================== */}

      <header className="dashboard-header">

        <h1>My Dashboard</h1>


        {/* Logout button */}
        <button onClick={handleLogout}>
          Logout
        </button>

      </header>


      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <main className="dashboard-content">

        <h2>Welcome!</h2>

        <p>
          You have successfully logged in.
        </p>


        {/* ==================================================
            DASHBOARD CARDS
            ================================================== */}

        <div className="dashboard-cards">


          {/* ------------------------------------------------
              USERS
              ------------------------------------------------ */}

          <div className="card">

            <h3>Users</h3>

            <p>
              Manage users
            </p>

          </div>


          {/* ------------------------------------------------
              PROFILE
              ------------------------------------------------ */}

          <div className="card">

            <h3>Profile</h3>

            <p>
              View your profile
            </p>

          </div>


          {/* ------------------------------------------------
              SETTINGS
              ------------------------------------------------ */}

          <div className="card">

            <h3>Settings</h3>

            <p>
              Application settings
            </p>

          </div>


          {/* ------------------------------------------------
              AI INTERVIEW
              ------------------------------------------------ */}

          <div className="card">

            <h3>AI Interview</h3>

            <p>
              Practice your interview with AI.
            </p>


            {/* 
              This button takes the user to:

              /interview

              The Interview component will then
              call our ASP.NET Core API.
            */}
            <button onClick={handleStartInterview}>
              Start Interview
            </button>

          </div>


        </div>

      </main>

    </div>
  );
}


// Export component so App.jsx can import it.
export default Dashboard;