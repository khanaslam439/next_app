import * as yup from "yup";
export const Validation = yup.object().shape({
  name: yup
    .string()
    .required({ ar: " يجب إدخال الاسم بالكامل", en: "Full name is required" }),

  email: yup
    .string()
    .required({ ar: "يجب إدخال البريد الإلكترونى", en: "Email is required" }),

  phone: yup
    .string()
    .required({ ar: "يجب إدخال رقم الجوال", en: "Phone number is required" }),
});
//
export const PasswordValidations = yup.object().shape({
  newPassword: yup.string().required({
    ar: "يجب إدخال كلمة المرور الجديدة",
    en: "New password is required",
  }),

  currentPassword: yup.string().required({
    ar: " يجب إدخال كلمة المرور الحالية",
    en: "Current password is required",
  }),

  Confirmpassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], {
      ar: "كلمتا المرور لا تتطابق",
      en: "Passwords must match",
    })
    .required({ ar: "يجب إدخال كلمة المرور", en: "Password is required" }),
});
