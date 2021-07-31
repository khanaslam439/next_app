import * as yup from "yup";
export const Validation = yup.object().shape({
  phone: yup
    .string()
    .required({ ar: "يجب إدخال رقم الهاتف", en: "Phone number is required" }),
  password: yup
    .string()
    .required({ ar: "يجب إدخال كلمة المرور", en: "Password is required" }),
});
