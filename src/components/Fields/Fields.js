import React, { useContext, Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Col, label } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import Lottie from "react-lottie";

import LangContext from "../../store/LangContext";
import btnLottie from "../../Assets/Lottie/loading.json";
import strings from "../../Assets/Local/Local";
import styles from "./fields.module.css";

const Field = (props) => {
  const { lang } = useContext(LangContext);
  const [options, setOptions] = useState([]);
  const [imgUrl, setImgUrl] = useState({});
  const [isUploadImage, setIsUploadImage] = useState({});
  const inputsField = props.inputs;
  const btnOptions = {
    loop: true,
    autoplay: true,
    animationData: btnLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  strings.setLanguage(lang);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(props.validation),
    mode: "all",
  });

  console.log("input field errors", errors);
  //************************************************** */

  const fileUploadHandle = (e, name, el) => {
    console.log("fileUploadHandle", name, el);
    if (!el.isUploaded && e.target.files[0]) {
      const data = { ...imgUrl };
      data[name] = URL.createObjectURL(e.target.files[0]);
      setImgUrl({ ...data });
    } else if (e.target.files[0]) {
      let data = new FormData();
      data.append("image", e.target.files[0]);
      uploadedImage(data, name);
    }
  };

  const deleteImageHandle = (name) => {
    const data = { ...imgUrl };
    data[name] = "";
    setImgUrl({ ...data });
    props.deleteImageUrls(name);
  };
  // ************************************************** /
  const TextFieldInput = (element) => {
    return (
      <Col lg={element.col} style={{ textAlign: "start" }}>
        <div
          className={` ${styles[`Input_container_${lang}`]} form-group ${
            element.InputContainer ? element.InputContainer : ""
          } ${errors[element.name] ? styles.invalid_input : ""}`}
        >
          {!isUploadImage[element.name] ? (
            <>
              {element.icon ? element.icon : null}
              {element.label ? (
                <label
                  htmlFor={element.id}
                  className={`${styles[element.labelClassName]} px-3`}
                >
                  {!imgUrl[element.name] ? element.uploadIcon : null}
                  <span>{element.label[lang]}</span>
                </label>
              ) : null}
              {imgUrl[element.name] && element.type === "file" ? (
                <span className={`img_preview_container_${lang}`}>
                  <img
                    src={imgUrl[element.name]}
                    alt="upload image"
                    className={styles.upload_img}
                  />
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-x"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: "absolute",
                      top: "-4px",
                      left: "-1px",
                      color: "red",
                      padding: "1px",
                      fontSize: "20px",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteImageHandle(element.name)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              ) : null}
            </>
          ) : (
            <Lottie options={btnOptions} height="90%" width="80%" />
          )}

          <input
            type={element.type}
            {...register(element.name)}
            className="form-control"
            aria-describedby={element.name}
            placeholder={element.placeholder ? element.placeholder[lang] : null}
            id={element.id ? element.id : null}
            accept={element.acceptFile ? element.acceptFile : null}
            onChange={
              element.type === "file"
                ? (e) => fileUploadHandle(e, element.name, element)
                : null
            }
          />
          {element.activePhone ? (
            <button
              className={`${element.activePhoneClass}_${lang}`}
              onClick={props.activeHandel}
            >
              {" "}
              {element.activePhone[lang]}
            </button>
          ) : null}
        </div>
        {errors[element.name] && (
          <p className={`${styles.ErrorStyle} px-3`}>
            {errors[element.name]["message"][lang]}
          </p>
        )}
      </Col>
    );
  };

  //*************************************** */
  const CheckboxInput = (element, lang) => {
    return (
      <Col lg={element.col ? element.col : "12"}>
        <div
          className={`form-check ${
            element.className && styles[`${element.className}_${lang}`]
          }`}
        >
          <input
            type="checkbox"
            {...register(element.name)}
            className="form-check-input"
            id={element.name}
          />
          <span
            className={styles.checkmark}
            onClick={() => setValue(element.name, !getValues(element.name))}
          ></span>
          <label
            className={`form-check-label ${
              getValues(element.name) ? styles.label_checked : ""
            }`}
            htmlFor={element.name}
          >
            {element.label[lang]}
          </label>
        </div>
      </Col>
    );
  };
  //*************************************** */

  //*************************************** */

  const TextAreaInput = (element, register, errors, lang) => {
    return (
      <Col lg="12" className="w-100">
        <div
          className={`${element.InputContainer ? element.InputContainer : ""} ${
            styles.textArea_container
          } form-group`}
        >
          <textarea
            rows={element.rows}
            {...register(element.name)}
            placeholder={element.placeholder[lang]}
            className="form-control"
          ></textarea>
          {errors[element.name] && (
            <p className={`${styles.ErrorStyle} px-3`}>
              {errors[element.name]["message"][lang]}
            </p>
          )}
        </div>
      </Col>
    );
  };
  //*************************************** */
  const SelectWithOptions = (element, register, errors, lang) => {
    return (
      <Col lg={element.col}>
        <div
          className={` ${styles[`select_container_${lang}`]} ${
            element.InputContainer ? element.InputContainer : ""
          }  form-group`}
        >
          {element.label ? (
            <label className={`${element.labelClassName} px-3`}>
              <span>{element.label[lang]}</span>
            </label>
          ) : null}

          <select
            {...register(element.name)}
            className={`form-control`}
            defaultValue=""
          >
            <option value="" hidden>
              {element.defaultOption[lang]}
            </option>
            {options.length &&
              options.map((el, index) => (
                <option value={el[element.keyId]} key={index}>
                  {el[element.keyElement]}
                </option>
              ))}
          </select>
          {errors[element.name] && (
            <p className={`${styles.ErrorStyle} px-3`}>
              {errors[element.name]["message"][lang]}
            </p>
          )}
        </div>
      </Col>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(props.submitHandle)}
      autoComplete="off"
      className="row"
    >
      {inputsField.map((element, index) => {
        return (
          <Fragment key={index}>
            {element.Fieldtype === "Input"
              ? TextFieldInput(element, register, errors, lang)
              : element.Fieldtype === "checkbox"
              ? CheckboxInput(element, lang)
              : element.Fieldtype === "textarea"
              ? TextAreaInput(element, register, errors, lang)
              : SelectWithOptions(element, register, errors, lang)}
          </Fragment>
        );
      })}
      {props.config.btns.map((item, index) => (
        <Col
          lg={item.col}
          key={index}
          className={`${item.btnContainer ? item.btnContainer : ""} `}
        >
          <button
            type="submit"
            className={`${item.btnClass} btn`}
            disabled={props.isDisabled}
          >
            {!props.isLoading ? (
              <>
                {item.btnIcon ? <span>{item.btnIcon}</span> : null}
                <span>{item.btnName[lang]}</span>
              </>
            ) : (
              <Lottie options={btnOptions} height="35px" width="80%" />
            )}
          </button>
        </Col>
      ))}
    </form>
  );
};
export default Field;
