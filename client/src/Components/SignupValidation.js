import React from 'react';


function SignupValidation({ signupData }) {
    let errors = {};
  
    if (!signupData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      errors.email = "Email is invalid";
    }
  
    if (!signupData.password) {
      errors.password = "Password is required";
    } else if (signupData.password.length < 5) {
      errors.password = "Password must be more than 5 character";
    }
    return errors;
}

export default SignupValidation