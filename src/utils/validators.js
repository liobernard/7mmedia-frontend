import isEmail from "validator/lib/isEmail";

export const validate = (str, quote = false) => {
  if (!str || typeof str !== "string") {
    return null;
  }

  let n = str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;");

  if (quote === true) {
    n = n.replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  return n;
};

export const isEmailValid = (email) => {
  if (!email || typeof email !== "string" || !isEmail(email)) {
    return false;
  }
  return true;
};
