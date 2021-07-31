import * as yup from "yup";
export const Validation = yup.object().shape({
  name: yup.string().required({ ar: "يجب إدخال الإسم", en: "Name is rquired" }),
  email: yup
    .string()
    .required({ ar: "يجب إدخال البريد الإلكترونى", en: "Email is required" })
    .email({
      ar: "يجب إدخال البريد الإلكترونى الصحيح",
      en: "Email is invalid",
    }),

  phone: yup
    .string()
    .required({ ar: "يجب إدخال رقم الهاتف", en: "Phone number is required" }),
  password: yup
    .string()
    .required({ ar: "يجب إدخال كلمة المرور", en: "Password is required" }),
  Confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], {
      ar: "كلمتا المرور لا تتطابق",
      en: "Passwords must match",
    })
    .required({ ar: "يجب إدخال كلمة المرور", en: "Password is required" }),
});
