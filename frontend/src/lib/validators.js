const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value) => EMAIL_PATTERN.test(String(value ?? "").trim());

/** Returns a field→message map; empty means the form is valid. */
export const validateCredentials = ({ email, password }) => {
    const errors = {};
    if (!email?.trim()) errors.email = "Enter your email";
    else if (!isValidEmail(email)) errors.email = "That does not look like an email";
    if (!password) errors.password = "Enter your password";
    return errors;
};
