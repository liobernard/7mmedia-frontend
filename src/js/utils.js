import isEmail from "validator/lib/isEmail";

export const isNameValid = name => {
  if (!name) {
    return false;
  }
  return true;
}

export const isEmailValid = email => {
  if (!email || !isEmail(email)) {
    return false;
  }
  return true;
}

export const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
};

export const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += " " + className;
  }
};

export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
};

export const getScrollY = () => {
  let scrOfY = 0;

  if (typeof window.pageYOffset == "number") {
    scrOfY = window.pageYOffset;
  } else if (document.body && document.body.scrollTop) {
    scrOfY = document.body.scrollTop;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    scrOfY = document.documentElement.scrollTop;
  }
  return scrOfY;
};

export const getDocHeight = () => {
  const D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
};

export const recursiveCheck = (conditionFunction, onSuccess, onTimeout, timeout=20) => {
  if (typeof conditionFunction !== "function") {
    throw new Error("Invalid or missing conditionFunction.");
  }

  if (typeof onSuccess !== "function") {
    throw new Error("Invalid or missing onSuccess.");
  }

  const check = n => {
    setTimeout(() => {
      if (!!conditionFunction()) {
        onSuccess();
        return;
      } else if (n === timeout * 5) { 
        if (typeof onTimeout === "function") {
          onTimeout();
        }
        console.error(`Error - recursive check timed out.`);
        return;
      } else {
        check(n + 1);
      }
    }, 200);
  };
  check(0);
}
