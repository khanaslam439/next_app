import * as yup from "yup";
export const Validation = yup.object().shape({
  password: yup
    .string()
    .required({ ar: "يجب إدخال كلمة المرور", en: "Password is required" }),
  confirmpassword: yup
    .string()
    .required({ ar: "يجب إدخال كلمة المرور", en: "Password is required" })
    .oneOf([yup.ref("password"), null], {
      ar: "كلمتا المرور لا تتطابق",
      en: "Passwords must match",
    }),
});
