import { LangContextProvider } from "../store/LangContext";
import { FavoriteProductProvider } from "../store/FavoriteProductContext";
import { FavoriteStoreProvider } from "../store/FavoriteStoreContext";
import { FollowingStoreProvider } from "../store/FollowingStoreContext";
import { GeneralPathProvider } from "../store/GeneralPath";
import { UserContextProvider } from "../store/UserContext";
import { TempShareData } from "../store/TempShareData";
import { HeaderFilterContextProvider } from "../store/HeaderFilterContext";
import MainTheme from "../components/MainTheme/MainTheme";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ pageProps, Component }) {
  return (
    <TempShareData>
      <HeaderFilterContextProvider>
        <GeneralPathProvider>
          <FavoriteProductProvider>
            <FavoriteStoreProvider>
              <FollowingStoreProvider>
                <LangContextProvider>
                  <UserContextProvider>
                    <MainTheme Component={Component} pageProps={pageProps} />
                  </UserContextProvider>
                </LangContextProvider>
              </FollowingStoreProvider>
            </FavoriteStoreProvider>
          </FavoriteProductProvider>
        </GeneralPathProvider>
      </HeaderFilterContextProvider>
    </TempShareData>
  );
}

export default MyApp;
