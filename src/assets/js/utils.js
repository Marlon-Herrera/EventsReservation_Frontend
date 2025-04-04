// Check emails format
export function checkEmail(data) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data);
  }
  
  // Check numbers format
  export function checkNumber(data) {
    return /^\d*$/.test(data);
  }
  
  // Check passwords format
  export function checkPwd(data) {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,50}$/.test(data);
  }
  

  
  // Check texts format
  export function checkText(data) {
    return /^[\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,50}$/.test(data);
  }
  

  export function isValidText(text) {
    return /^[a-zA-Z0-9\s\-_,.()/]+$/.test(text);
  }

  

  