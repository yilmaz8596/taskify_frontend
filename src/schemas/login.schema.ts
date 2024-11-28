import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { LoginUserProps } from "../types/types";
import { login } from "../api/auth.apis";

export const formikLoginValidationSchema = () => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log("User logged in successfully");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const { isSuccess, isError, error } = mutation;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values: LoginUserProps) => {
      mutation.mutate(values);
    },
  });
  return { formik, isSuccess, isError, error };
};
