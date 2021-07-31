import { createContext, useState, useEffect } from "react";
import cookie from "react-cookies";
import sessionstorage from "sessionstorage";
const UserContext = createContext({
  user: {},
  token: {},
  cookieUserHandel: (newUser, newToken) => {},
  userSessionHandel: (newUser, newToken) => {},
  updateUserHandel: (newUser) => {},
  clearUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const getUser = cookie.load("tajawalUser")
    ? cookie.load("tajawalUser")
    : JSON.parse(sessionstorage.getItem("tajawalUser"))
    ? JSON.parse(sessionstorage.getItem("tajawalUser"))
    : {};
  const getToken = cookie.load("tajawalToken")
    ? cookie.load("tajawalToken")
    : JSON.parse(sessionstorage.getItem("tajawalToken"))
    ? JSON.parse(sessionstorage.getItem("tajawalToken"))
    : {};

  const [user, setUser] = useState(getUser);
  const [token, setToken] = useState(getToken);

  console.log("getUser", getUser);

  const cookieUserHandel = (newUser, newToken) => {
    cookie.save("tajawalUser", newUser, { path: "/" });
    cookie.save("tajawalToken", newToken, { path: "/" });
    setUser(newUser);
    setToken(newToken);
  };

  const userSessionHandel = (newUser, newToken) => {
    sessionStorage.setItem("tajawalUser", JSON.stringify(newUser));
    sessionStorage.setItem("tajawalToken", JSON.stringify(newToken));
    setUser(newUser);
    setToken(newToken);
  };

  const updateUserHandel = (newUser) => {
    const userInCookie = cookie.load("tajawalUser") ? true : false;
    if (userInCookie) {
      cookie.save("tajawalUser", newUser, { path: "/" });
      setUser(newUser);
    } else {
      sessionStorage.setItem("tajawalUser", JSON.stringify(newUser));
      setUser(newUser);
    }
  };
  const clearUser = () => {
    sessionstorage.removeItem("tajawalUser");
    sessionstorage.removeItem("tajawalToken");
    cookie.remove("tajawalUser");
    cookie.remove("tajawalToken");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        cookieUserHandel: cookieUserHandel,
        userSessionHandel: userSessionHandel,
        updateUserHandel,
        clearUser: clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
