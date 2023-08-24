import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required.")
    .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed.")
    .min(2, "Name must be between 2 and 16 characters.")
    .max(16, "Name must be between 2 and 16 characters."),
  email: Yup.string()
    .trim()
    .required("Email address is required")
    .email("Invalid email"),
  status: Yup.string()
    .trim()
    .max(64, "Status must be less than 64 characters."),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-y])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Email address is required")
    .email("Invalid email"),
  password: Yup.string().required("Password is required."),
});
