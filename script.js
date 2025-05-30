function showSection(sectionId) {
  const titleMap = {
    about: "About Me",
    resume: "Resume",
    portfolio: "Portfolio",
    blog: "Miles",
    contact: "Contact Me",
  };

  // Update the heading
  document.getElementById("section-title").textContent = titleMap[sectionId];

  // Update active tab
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelector(`.tab[onclick="showSection('${sectionId}')"]`)
    .classList.add("active");

  // Show only the selected section
  document
    .querySelectorAll(".section")
    .forEach((sec) => sec.classList.remove("active"));
  const targetSection = document.getElementById(sectionId);
  if (targetSection) targetSection.classList.add("active");

  if (sectionId === "portfolio")
    document.getElementById("portfolio").style.display = "grid";
  else document.getElementById("portfolio").style.display = "none";
}







document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input, textarea");
  const sendButton = form.querySelector("button[type='submit']");

  disableButton();

  inputs.forEach(input => {
    input.addEventListener("input", validateForm);
  });

  function validateForm() {
    const isValid = [...inputs].every(input => input.checkValidity());
    if (isValid) enableButton();
    else disableButton();
    
  }

  function disableButton() {
    sendButton.disabled = true;
    sendButton.style.pointerEvents = "none";
    sendButton.style.opacity = "0.5";
    sendButton.style.cursor = "not-allowed";
  }

  function enableButton() {
    sendButton.disabled = false;
    sendButton.style.pointerEvents = "auto";
    sendButton.style.opacity = "1";
    sendButton.style.cursor = "pointer";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm('service_6o0rlni', 'template_c9x4o1o', form)
      .then(function () {
        alert("Mail sent successfully!");
        form.reset();
        disableButton(); 
      }, function (error) {
        console.error("EmailJS Error:", error);
        alert("Failed to send email.");
      });
  });
});
