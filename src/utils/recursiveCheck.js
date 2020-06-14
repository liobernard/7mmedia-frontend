export const recursiveCheck = (
  conditionFunction,
  onSuccess,
  onTimeout,
  // Timeout in seconds
  timeout = 20
) => {
  if (typeof conditionFunction !== "function") {
    throw new Error("Invalid or missing conditionFunction.");
  }

  if (typeof onSuccess !== "function") {
    throw new Error("Invalid or missing onSuccess.");
  }

  const check = (n) => {
    setTimeout(() => {
      if (!!conditionFunction()) {
        onSuccess();
        return;

      // Checks 5 times per second until timeout
      } else if (n === timeout * 5) {
        if (typeof onTimeout === "function") {
          onTimeout();
        }
        console.error("Error - recursive check timed out.");
        return;
      } else {
        check(n + 1);
      }
    }, 200);
  };
  check(0);
};
