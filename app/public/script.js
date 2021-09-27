// client-side js, loaded by index.html
// run by the browser each time the page is loaded




console.log("hello world :o");

// user sign up validity check
var form = document.getElementById("signup-form");
if (form!=null) {
  // console.log(form);
  var username_input = form.elements["username"];
  var password_input = form.elements["password"];
  var email_input = form.elements["email"];

  var username = "";
  var password = "";
  var email = "";

  var submit_button = document.getElementById("submit-signup");

  function check() {
    if (
      username_input.checkValidity() &&
      password_input.checkValidity() &&
      email_input.checkValidity()
    ) {
      return true;
    } else {
      return false;
    }
  }

  username_input.addEventListener("input", function(event) {
    if (username_input.validity.valueMissing) {
      username_input.setCustomValidity("Please input User Name!");
      $("#uname-t").text("Please input User Name!");
    } else {
      username_input.setCustomValidity("");
      $("#uname-t").text("");
      username = username_input.value;
    }
  });
  password_input.addEventListener("input", function(event) {
    if (password_input.validity.valueMissing) {
      password_input.setCustomValidity("Please input Password!");
      $("#pwd-t").text("Please input Password!");
    } else {
      password_input.setCustomValidity("");
      $("#pwd-t").text("");
      password = password_input.value;
    }
  });
  email_input.addEventListener("input", function(event) {
    if (email_input.validity.valueMissing ||
       email_input.validity.patternMismatch) {
      email_input.setCustomValidity("Please input email!");
      $("#email-t").text("Please input email as 123@abc.com !");
    } else {
      email_input.setCustomValidity("");
      $("#email-t").text("");
      email = email_input.value;
    }
  });

  form.addEventListener("change", function(event) {
    console.log(check());
    submit_button.disabled = !check();
  });
}

// signup button at login page
$("#signup-l")
.click(function() {
  window.location.href="/signup";
})


// login with github function
function github_login() {
  window.location.href="/github/auth";
};

// change user profile
$("#name-form")
.click(function() {
  $("#displayname").prop("disabled", false);
  $("#change").prop("disabled",false);
});

$("#email-form")
.click(function() {
  $("#email").prop("disabled", false);
  $("#change").prop("disabled",false);
});

$("#bio-form")
.click(function() {
  $("#bio").prop("disabled", false);
  $("#change").prop("disabled",false);
});
$("#notchange")
.click(function() {
  // $("#displayname").val(""); // Will be replaced with the original data.
  $("#displayname").prop("disabled", true);
  $("#email").prop("disabled", true);
  // $("#email").val("");
  $("#bio").prop("disabled", true);
  // $("#bio").val("");
  $("#change").prop("disabled",true);
});