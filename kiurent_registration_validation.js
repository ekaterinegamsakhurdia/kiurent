
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".registration-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent form from submitting if validation fails

    // Clear old errors
    document.querySelectorAll(".error-message").forEach(el => el.remove());

    let isValid = true;

    // Get form fields
    const firstName = form.querySelector('input[name="first_name"]');
    const lastName = form.querySelector('input[name="last_name"]');
    const phone = form.querySelector('input[name="phone"]');
    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="password"]'); // If you add a password field later
    const status = form.querySelectorAll('input[name="status[]"]');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@kiu\.edu\.ge$/;

    // Helper function to show error
    function showError(input, message) {
      const error = document.createElement("div");
      error.classList.add("error-message");
      error.style.color = "red";
      error.style.fontSize = "0.8rem";
      error.style.margintop="0.1rem"
      error.style.marginLeft="15%"
      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
      isValid = false;
    }
    //different for status error not to mess up the design
    function showErrorForStatus(input, message) {
      const error = document.createElement("div");
      error.classList.add("error-message");
      error.style.color = "red";
      error.style.fontSize = "0.8rem";
      error.style.margintop="0.1rem"

      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
      isValid = false;
    }

    // Validate required text fields
    if (!firstName.value.trim()) showError(firstName, "First name is required.");
    if (!lastName.value.trim()) showError(lastName, "Last name is required.");
    if (!phone.value.trim()) showError(phone, "Phone number is required.");
    if (!email.value.trim()) showError(email, "Email address is required.");
     else if (!emailPattern.test(email.value.trim())) {
      showError(email, "Only KIU student emails are allowed.");
    }
    if (!password.value.trim()) showError(password, "Password is required."); else   
      if (password && password.value.length < 8) {
      showError(password, "Password must be at least 8 characters long.");
    }



    // Validate status checkboxes
    const statusSelected = Array.from(status).some(input => input.checked);
    if (!statusSelected) {
      showErrorForStatus(status[3].parentNode, "Please select at least one status.");
    }

    

    if (isValid) {
      form.submit();
    }
  });
});

