import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormData from "form-data";
import Snackbar from "@material-ui/core/Snackbar";
import Lottie from "react-lottie";
import { useRouter } from "next/router";
import btnLottie from "../../../Assets/Lottie/loading.json";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../Assets/Local/Local";
import LangCtx from "../../../store/LangContext";
import TempShareData from "../../../store/TempShareData";
import UserCtx from "../../../store/UserContext";
import { Validation } from "../../../components/Validations/askStoreValidation";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import styles from "../../../styles/askStore.module.css";
const AskMarkets = () => {
  const { lang } = useContext(LangCtx);
  const { token, user } = useContext(UserCtx);
  const { activities } = useContext(TempShareData);
  const [markets, setMarkets] = useState([]);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imgError, setImgError] = useState("");
  const [hint, setHint] = useState("");
  const [show, setShow] = useState(false);
  const [isErrorHint, setIsErrorHint] = useState(false);
  const [region, setRegion] = useState();
  const [activity, setActivity] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formData = new FormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Validation),
    mode: "onBlur",
  });
  const btnOptions = {
    loop: true,
    autoplay: true,
    animationData: btnLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  console.log("activities", activities);

  useEffect(() => {
    if (!Object.keys(user).length) {
      router.replace("/Tajawal/login");
    }
  }, []);
  const fetchMarkets = (url) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
          Authorization: token,
        },
      })
      .then((res) => {
        setMarkets(res.data.data);
        console.log("market", res.data.data);
      })
      .catch((error) => console.log("error in markets", error.response));
  };
  const fetchCities = () => {
    axios
      .get(`${API_END_POINT}/city?removeLanguage=true`, {
        headers: { "Accept-Language": lang },
      })
      .then((res) => {
        setCities(res.data.data);
        console.log("cities", res.data.data);
      })
      .catch((error) => {
        console.log("error in cities", error.response);
      });
  };
  const fetchRegions = (id) => {
    axios
      .get(`${API_END_POINT}/region?removeLanguage=true&city=${id}`, {
        headers: { "Accept-Language": lang },
      })
      .then((res) => {
        console.log("regions", res.data.data);
        setRegions(res.data.data);
      })
      .catch((error) => console.log("error in regions", error.response));
  };
  useEffect(() => {
    fetchCities();
  }, [lang]);
  useEffect(() => {
    let url = "";
    if (activity && region) {
      url = `${API_END_POINT}/allUsers?type=MARKET&region=${region}&marketsByCategory=${activity}`;
      fetchMarkets(url);
    } else if (activity) {
      url = `${API_END_POINT}/allUsers?type=MARKET&marketsByCategory=${activity}`;
      fetchMarkets(url);
    } else if (region) {
      url = `${API_END_POINT}/allUsers?type=MARKET&region=${region}`;
      fetchMarkets(url);
    }
  }, [activity, region]);

  const handleFiles = (newFiles) => {
    const tempimgs = [];
    const tempImgsUrl = [];
    for (const key of Object.keys(newFiles)) {
      let imgUrl = {
        url: URL.createObjectURL(newFiles[key]),
        file: newFiles[key],
      };
      let img = newFiles[key];
      tempImgsUrl.push(imgUrl);
      tempimgs.push(img);
    }
    setFiles(tempImgsUrl);
    setImages(tempimgs);
  };

  const imgHandel = (name) => {
    const newImgs = files.filter((file) => file.file.name !== name);
    const tempimgs = images.filter((img) => img.name !== name);
    setFiles(newImgs);
    setImages(tempimgs);
  };
  const submitHandle = (values) => {
    console.log("values", values);
    Object.keys(values).forEach((item) => {
      if (values[item]) formData.append(item, values[item]);
    });

    if (images.length) {
      setIsLoading(true);
      formData.append("images", images);
      axios
        .post(`${API_END_POINT}/askStore`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": lang,
          },
        })
        .then((res) => {
          console.log("ask store sent success", res.data);
          reset();
          setFiles([]);
          setImages([]);
          setIsErrorHint(false);
          setHint(strings.sentSuccess);
          setShow(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error in ask store", error.response);
          setIsErrorHint(true);

          if (!error.response) {
            setHint(strings.interneterror);
          } else if (error.response.status === 422) {
            setHint(error.response.data.errors[0].message);
          } else {
            setHint(error.response.data.errors);
          }
          setIsLoading(false);
          setShow(true);
        });
    } else {
      setImgError(strings.imgError);
    }
  };
  strings.setLanguage(lang);
  return (
    <>
      <MetaDecartor />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={show}
        onClose={() => setShow(false)}
        message={hint}
        className={isErrorHint ? "alert__danger" : "alert__success"}
        autoHideDuration={4000}
      />
      <div className={`container-fluid ${styles.ask__store_page}`}>
        <form
          className="row justify-content-center"
          onSubmit={handleSubmit(submitHandle)}
        >
          <section className={`col-md-5 col-xs-12 ${styles.first_section} `}>
            <div>
              <div className={styles.input_container}>
                <div className="form-group">
                  <label htmlFor="activity">{strings.activity}</label>
                  <select
                    className="form-control"
                    id="activity"
                    onChange={(e) => setActivity(e.target.value)}
                    {...register("category")}
                    defaultValue=""
                  >
                    <option value="" hidden>
                      {strings.activity}
                    </option>
                    {activities.length ? (
                      activities.map((activity) => (
                        <option value={activity.id} key={activity.id}>
                          {activity.name[lang]}
                        </option>
                      ))
                    ) : (
                      <option disabled>{strings.noActivity}</option>
                    )}
                  </select>
                  {errors["category"] && (
                    <p className={`${styles.ErrorStyle} px-3`}>
                      {errors["category"]["message"][lang]}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="store">{strings.market}</label>

                  <select
                    className="form-control"
                    id="store"
                    {...register("market")}
                  >
                    <option value="" hidden>
                      {strings.market}
                    </option>
                    {markets.length ? (
                      markets.map((market) => (
                        <option value={market.id} key={market.id}>
                          {market.username}
                        </option>
                      ))
                    ) : (
                      <option disabled>{strings.nomarkets}</option>
                    )}
                  </select>
                  {errors["market"] && (
                    <p className={`${styles.ErrorStyle} px-3`}>
                      {errors["market"]["message"][lang]}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="category">{strings.category}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder={strings.category}
                    {...register("type")}
                  />
                  {errors["type"] && (
                    <p className={`${styles.ErrorStyle} px-3`}>
                      {errors["type"]["message"][lang]}
                    </p>
                  )}
                </div>
              </div>
              <div className={`form-group ${styles.upload_input}`}>
                <label htmlFor="uploadFile">
                  <span>{strings.uploadImages}</span>
                  <span className={styles.upload_icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.33"
                      height="18.472"
                      viewBox="0 0 19.33 23.472"
                    >
                      <path
                        fill="#fff"
                        d="M13.023 22.449h8.284v-8.284h5.523L17.165 4.5 7.5 14.165h5.523zM7.5 25.211h19.33v2.761H7.5z"
                        data-name="Icon material-file-upload"
                        transform="translate(-7.5 -4.5)"
                      ></path>
                    </svg>
                  </span>
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="uploadFile"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                />
                {imgError && (
                  <p className={`${styles.ErrorStyle} px-3`}>{imgError}</p>
                )}
              </div>
              {files.length ? (
                <div className={styles.img_previews_container}>
                  {files.map((img, index) => (
                    <div
                      className={styles[`img_container_${lang}`]}
                      key={index}
                    >
                      <img src={img.url} alt={img.file.name} />
                      <i
                        className="fas fa-times"
                        onClick={() => imgHandel(img.file.name)}
                      ></i>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
          <section className={`col-md-5 col-xs-12 ${styles.address_section}`}>
            <div>
              <div className={styles.input_container}>
                <div className="form-group">
                  <label htmlFor="cities">{strings.city}</label>
                  <select
                    className="form-control"
                    id="cities"
                    onChange={(e) => fetchRegions(e.target.value)}
                  >
                    <option value="" hidden>
                      {strings.city}
                    </option>
                    {cities.length ? (
                      cities.map((city) => (
                        <option value={city.id} key={city.id}>
                          {city.name[lang]}
                        </option>
                      ))
                    ) : (
                      <option disabled>{strings.nocities}</option>
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="regions">{strings.region}</label>

                  <select
                    className="form-control"
                    id="regions"
                    {...register("region")}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="" hidden>
                      {strings.region}
                    </option>
                    {regions.length ? (
                      regions.map((region) => (
                        <option value={region.id} key={region.id}>
                          {region.name[lang]}
                        </option>
                      ))
                    ) : (
                      <option disabled>{strings.noregions}</option>
                    )}
                  </select>
                  {errors["region"] && (
                    <p className={`${styles.ErrorStyle} px-3`}>
                      {errors["region"]["message"][lang]}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description">{strings.description}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder={strings.description}
                    {...register("description")}
                  />
                  {errors["description"] && (
                    <p className={`${styles.ErrorStyle} px-3`}>
                      {errors["description"]["message"][lang]}
                    </p>
                  )}
                </div>
              </div>
              <button
                className={styles.btn_send}
                type="submit"
                disabled={isLoading}
              >
                {!isLoading ? (
                  strings.sendBTN
                ) : (
                  <Lottie options={btnOptions} height="35px" width="80%" />
                )}
              </button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default AskMarkets;
