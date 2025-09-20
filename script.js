document.addEventListener("DOMContentLoaded", function() {

  // 1️⃣ Animate welcome button when clicked
  const welcomeBtn = document.getElementById('welcome-btn');
  if (welcomeBtn) {
    welcomeBtn.addEventListener('click', () => {
      alert("Welcome! Scroll to see available jobs!");
      welcomeBtn.style.transform = "scale(1.1)";
      setTimeout(() => welcomeBtn.style.transform = "scale(1)", 300);
    });
  }

  // 2️⃣ Job Card click - store selected job and open apply page
  const jobCards = document.querySelectorAll('.job-card');
  jobCards.forEach(card => {
    card.addEventListener('click', () => {
      const jobTitle = card.getAttribute('data-job');
      localStorage.setItem('selectedJob', jobTitle);
      window.location.href = 'apply.html';
    });
  });

  // 3️⃣ Apply Page - Show selected job
  const selectedJobEl = document.getElementById('selectedJob');
  if (selectedJobEl) {
    const selectedJob = localStorage.getItem('selectedJob') || "None";
    selectedJobEl.textContent = "Selected Job: " + selectedJob;
  }

  // 4️⃣ Form Validation Function
  const form = document.getElementById('applyForm');
  if (!form) return;

  const inputs = form.querySelectorAll('input');

  inputs.forEach(input => {
    input.addEventListener('input', () => validateField(input));
    input.addEventListener('blur', () => validateField(input));
  });

  function validateField(input) {
    const errorSpan = input.nextElementSibling;
    if (!errorSpan) return true;

    errorSpan.textContent = '';
    input.classList.remove('invalid');

    if (input.hasAttribute('required') && !input.value.trim()) {
      errorSpan.textContent = "This field is required.";
      input.classList.add('invalid');
      return false;
    }

    if (input.type === 'text' && input.value.trim().length < 3) {
      errorSpan.textContent = "Name must be at least 3 characters.";
      input.classList.add('invalid');
      return false;
    }

    if (input.type === 'email') {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
      if (!emailPattern.test(input.value.trim())) {
        errorSpan.textContent = "Enter a valid email address.";
        input.classList.add('invalid');
        return false;
      }
    }

    if (input.type === 'tel') {
      const phonePattern = /^[0-9]{10,15}$/;
      if (!phonePattern.test(input.value.trim())) {
        errorSpan.textContent = "Phone must be 10-15 digits.";
        input.classList.add('invalid');
        return false;
      }
    }

    if (input.type === 'file') {
      const file = input.files[0];
      if (!file) {
        errorSpan.textContent = "Please upload your resume.";
        input.classList.add('invalid');
        return false;
      } else if (file.size > 2 * 1024 * 1024) {
        errorSpan.textContent = "Resume must be less than 2MB.";
        input.classList.add('invalid');
        return false;
      }
    }

    return true;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    inputs.forEach(input => {
      if (!validateField(input)) valid = false;
    });
    if (valid) {
      alert("Application submitted successfully!");
      form.reset();
      inputs.forEach(input => input.classList.remove('invalid'));
      form.querySelectorAll('.error-msg').forEach(span => span.textContent = '');
    }
  });

});
