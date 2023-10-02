const form = document.forms.regform;
const formArray = Array.from(form);
const input = document.getElementsByTagName("input");
const inputsArray = Array.from(input);
const select = form.elements.occupation;

formArray.forEach((element) => {
  element.addEventListener("change", () => {
    const spanError = document.getElementById(element.name + "-error");
    if (element.validity.tooShort) {
      spanError.textContent = "Слишком мало символов";
    } else if (!element.validity.tooShort) {
      spanError.textContent = "";
    } else if (element.validity.patternMismatch) {
      spanError.textContent = "Введите корректное значение";
      console.log("Введите корректное значение");
    } else if (!element.validity.patternMismatch) {
      spanError.textContent = "";
    }
  });
});

function validateField(input) {
  const validity = input.validity;
  let spanError = document.getElementById(input.name + "-error");

  if (validity.valueMissing) {
    spanError.textContent = "Заполните это поле, пожалуйста";
  }
}

function isCorrectSelect(select) {
  const occupationError = document.getElementById("occupation-error");
  occupationError.textContent = "";
  if (select.value === "") {
    occupationError.textContent = "Выберите профессию";
    return false;
  } else if (select.value !== "") {
    return true;
  }
}

const password = document.getElementById("password");
const reppassword = document.getElementById("reppassword");

reppassword.addEventListener("keyup", function isCorrectPassword() {
  const reppasswordError = document.getElementById("reppassword-error");
  if (password.value === reppassword.value) {
    reppasswordError.textContent = "пароли совпали, все хорошо";
    return true;
  } else if (password.value !== reppassword.value) {
    reppasswordError.textContent = "Пароли не совпали, попробуйте ещё раз";
    return false;
  }
  console.log(password.value);
});

function checkAll() {
  const inputs = document.querySelectorAll("input");

  for (const input of inputs) {
    validateField(input);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  isCorrectSelect(select);
  checkAll();
  if (checkAll() && isCorrectSelect(select) && isCorrectPassword())
    form.reset();
});
