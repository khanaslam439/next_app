import { useState, useContext, useEffect } from "react";
import userCommentImg from "../../../Assets/Images/store/userCommentImg.png";
import classes from "../../../styles/storesDetails.module.css";
import titleImg from "../../../Assets/Images/store/titleImg.png";
import { InputGroup, FormControl } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import strings from "../../../Assets/Local/Local";
import axios from "axios";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import UserCtx from "../../../store/UserContext";
import Moment from "react-moment";
import { useRouter } from "next/router";

function StoreComments(props) {
  const { token } = useContext(UserCtx);
  const [commentVal, setCommentVal] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsLength, setCommentslength] = useState();
  const [flag, setFlag] = useState(false);

  const router = useRouter();

  function loginFirst() {
    console.log("Testing...");
    router.push({
      pathname: "/Tajawal/login",
    });
  }

  function getCommentVal(e) {
    setCommentVal(e.target.value);
  }

  function validateComment() {
    if (commentVal !== "" || Object.keys(token).length !== 0) {
      addNewComment();
    } else if (Object.keys(token).length === 0) {
      loginFirst();
    }
  }

  function addNewComment() {
    let url = `${API_END_POINT}/comments/trader`;
    let dataBody = {
      trader: props.traderId,
      comment: commentVal,
    };
    axios
      .post(url, dataBody, {
        headers: {
          "Accept-Language": props.lang,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCommentVal("");
        console.log("success Request", response);
        fetchComments(props.traderId);
      })
      .catch((error) => {
        console.log("error request", error.response);
      });
  }

  function fetchComments(id) {
    let url = `${API_END_POINT}/comments?trader=${id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": props.lang,
        },
      })
      .then((response) => {
        setCommentslength(response.data.totalCount);
        if (flag) {
          setComments(response.data.data);
        } else {
          let newComments = response.data.data.splice(0, 3);
          setComments(newComments);
        }
      });
  }

  useEffect(() => {
    fetchComments(props.traderId);
  }, [flag]);

  strings.setLanguage(props.lang);

  return (
    <div className="mt-5">
      <h4
        className={
          `${
            props.lang === "ar"
              ? classes.storeDivTitleAR
              : classes.storeDivTitleEN
          }` + " mb-4 position-relative d-flex align-items-center"
        }
      >
        <img src={titleImg} alt="title img" className="position-absolute" />
        <span>{strings.commentsAndRates}</span>
      </h4>
      <div className={classes.allComments}>
        {comments.map((comment, index) => {
          return (
            <div
              className={classes.userComment + " bg-white mb-3 py-3 px-4"}
              key={index}
            >
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className={classes.userImg}>
                    <img
                      src={userCommentImg}
                      alt="user img"
                      className="img-fluid"
                    />
                  </div>
                  <div
                    className={
                      classes.userName +
                      ` ${props.lang === "ar" ? " mr-2" : " ml-2"}`
                    }
                  >
                    <span className="d-block">{comment.user.name}</span>
                    <span className="text-muted">
                      <Moment fromNow locale={props.lang}>
                        {comment.createdAt}
                      </Moment>{" "}
                    </span>
                  </div>
                </div>
                {comment.user.rate !== 0 && (
                  <div className={classes.rating}>
                    <ReactStars
                      count={5}
                      size={22}
                      activeColor="#F15A24"
                      value={comment.user.rate}
                    />
                  </div>
                )}
              </div>
              <p className="mt-3">{comment.comment}</p>
            </div>
          );
        })}
      </div>

      {commentsLength > 3 && (
        <div
          onClick={() => {
            setFlag(true);
          }}
          className={classes.showAllComments + " mx-auto py-2 px-4 my-4"}
          style={{ display: flag ? "none" : "flex" }}
        >
          <span>{strings.showAllComments}</span>{" "}
          <i
            className={
              props.lang === "ar"
                ? "fas fa-sort-down mr-3"
                : "fas fa-sort-down ml-3"
            }
          ></i>
        </div>
      )}
      <div>
        <InputGroup className={classes.addCommentInput + " mt-4"}>
          <FormControl
            placeholder={strings.addYourComment}
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={commentVal}
            onChange={getCommentVal}
          />
          <InputGroup.Prepend>
            <InputGroup.Text
              className={
                classes.addCommentBTN +
                " text-white d-flex justify-content-center shadow-sm"
              }
              id="basic-addon1"
              onClick={validateComment}
            >
              {strings.sendBTN}
            </InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </div>
    </div>
  );
}

export default StoreComments;
