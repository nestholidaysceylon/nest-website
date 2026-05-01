(function () {
  emailjs.init("UKbWUQAnsAcBvYYBP"); // EmailJS public key
})();

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Show loading state
    const submitBtn = document.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    console.log('form data', formData)
    // First send to EmailJS
    emailjs
      .send("service_8zn2qso", "template_wj6loed", formData)
      .then(function (response) {
        // After EmailJS success, send to Google Sheets
        return fetch(
          "https://script.google.com/macros/s/AKfycbwCgfxGAMXncE-Rc7OdGgdgxwc4ZvAOA4wbgto4c8sAs2RnYeUdbN0LlkENvdtq3uBi/exec",
          {
            // Google Script URL
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors",
          }
        );
      })
      .then(() => {
        alert("Message sent successfully!");
        document.querySelector(".contact-form").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send message. Please try again.");
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
