import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth.apis";
import { RegisterUserProps } from "../types/types";
import { RegisterUserValues } from "../types/types";
const formikValidationSchema = () => {
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("User registered successfully");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const { isSuccess } = mutation;

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      firstname: Yup.string().required("First Name is required"),
      lastname: Yup.string().required("Last Name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), undefined],
        "Passwords must match"
      ),
    }),
    onSubmit: (values: RegisterUserProps) => {
      const { confirmPassword, ...rest } = values;

      mutation.mutate(rest as RegisterUserValues);
    },
  });
  return { formik, isSuccess };
};

export default formikValidationSchema;
