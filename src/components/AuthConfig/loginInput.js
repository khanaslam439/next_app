export const Inputs = [
  {
    name: "phone",
    Fieldtype: "Input",
    type: "number",
    label: { ar: "رقم الجوال", en: "Phone Number" },
    labelClassName: "login_label",
    placeholder: { ar: "+966 123456789", en: "+966 123456789" },
    col: "12",
  },

  {
    name: "password",
    Fieldtype: "Input",
    type: "password",
    label: { ar: "كلمة المرور", en: "Password" },
    labelClassName: "login_label",
    placeholder: { ar: "********", en: "*********" },
    col: "12",
  },
  {
    name: "rememberMe",
    Fieldtype: "checkbox",
    label: { ar: "تذكرنى", en: "Remember me" },
    className: "remember_check",
  },
];
