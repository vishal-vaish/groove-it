import * as yup from "yup";

export const editProfileValidation = yup
   .object({
     email: yup.string().trim().email(),
     username: yup
        .string()
        .trim()
        .min(3, { message: "Minimum 3 characters." })
        .max(50, { message: "Maximum 50 characters." })
        .matches(/^[^@]+$/, "Input should not contain symbols.")
        .required(),
     imageUrl: yup.string().trim().nullable(),
   })
   .required();

export const updatePasswordValidation = yup
   .object({
     currentPassword: yup
        .string()
        .min(3, { message: "Minimum 3 characters." })
        .max(250, { message: "Maximum 250 characters." })
        .required("Current Password is required"),
     newPassword: yup
        .string()
        .min(3, { message: "Minimum 3 characters." })
        .max(250, { message: "Maximum 250 characters." })
        .required("New Password is required"),
     confirmNewPassword: yup
        .string()
        .min(3, { message: "Minimum 3 characters." })
        .max(250, { message: "Maximum 250 characters." })
        .oneOf([yup.ref("newPassword")], "Passwords do not match")
        .required("Confirm Password is required"),
   })
   .required();
