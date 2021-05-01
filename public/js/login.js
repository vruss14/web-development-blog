const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect the user's input values from the login form
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (username && password) {
        
    // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert("Your username and/or password were entered correctly. If you have not yet created an account, choose the 'Sign Up' button instead.");
      }
    } else {
        console.log("Failed");
    }
  };
  

  
  document.getElementById('login-btn').addEventListener('click', loginFormHandler);
