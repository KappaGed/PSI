setTimeout(function() {
  var errorMessageDiv = document.getElementById('alert');
  errorMessageDiv.classList.add('fade-slower');
  errorMessageDiv.classList.remove('show');

  errorMessageDiv.addEventListener('animationend', function() {
    errorMessageDiv.classList.remove('fade-slower');
  });
}, 3000);
