import * as yup from "yup";
export const Validation = yup.object().shape({
  description: yup
    .string()
    .required({ ar: "يجب إدخال  الوصف", en: "Description is required" }),
  category: yup
    .string()
    .required({ ar: "يجب إدخال  النشاط", en: "Activity is required" }),

  region: yup
    .string()
    .required({ ar: "يجب إدخال الحى", en: "Region is required" }),
  market: yup
    .string()
    .required({ ar: "يجب إدخال السوق", en: "Market is required" }),
  type: yup
    .string()
    .required({ ar: "يجب إدخال الصنف", en: "type is required" }),
});
//
