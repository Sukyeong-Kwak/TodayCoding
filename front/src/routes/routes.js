import Home from "./HOME/Home ";
import HomePage from "./HOMEPAGE/HomePage";
import LoginPage from "./HOMEPAGE/LoginPage";
import SignUpPage from "./HOMEPAGE/SignUpPage";
import MyPage from "./MYPAGE/MyPage";
import Search from "./SEARCH/Search";
import Store from "./STORE/Store";
import DiaryWrite from "../components/diary/DiaryWrite";
import DiaryView from "../components/diary/DiaryView";
import UserInfoPage from "./MYPAGE/UserInfoPage/UserInfoPage";
import ProfilePage from "./MYPAGE/UserInfoPage/ProfilePage/ProfilePage";
import WithdrawPage from "./MYPAGE/UserInfoPage/WithdrawPage/WithdrawPage";
import ChangePasswordPage from "./MYPAGE/UserInfoPage/ChangePasswordPage/ChangePasswordPage";
import DiaryEdit from "../components/diary/DiaryEdit";

export const ROUTE = {
  HOMEPAGE: {
    path: "/",
    link: "/",
    element: HomePage,
  },
  HOME: {
    path: "/home",
    link: "/home",
    element: Home,
  },
  LOGIN: {
    path: "/login",
    link: "/login",
    element: LoginPage,
  },
  SIGNUP: {
    path: "/signup",
    link: "/signup",
    element: SignUpPage,
  },
  SEARCH: {
    path: "/search",
    link: "/search",
    element: Search,
  },
  STORE: {
    path: "/store",
    link: "/store",
    element: Store,
  },
  MYPAGE: {
    path: "/mypage",
    link: "/mypage",
    element: MyPage,
  },
  DIARYWRITE: {
    path: "/DiaryWrite",
    link: "/DiaryWrite",
    element: DiaryWrite,
  },
  DIARYVIEW: {
    path: "/DiaryView",
    link: "/DiaryView",
    element: DiaryView,
  },
  USERINFO: {
    path: "/mypage/userinfo",
    link: "/mypage/userinfo",
    element: UserInfoPage,
  },
  DIARYEDIT: {
    path: "/DiaryEdit",
    link: "/DiaryEdit",
    element: DiaryEdit,
  },
  PROFILE: {
    path: "/mypage/userinfo/profile",
    link: "/mypage/userinfo//profile",
    element: ProfilePage,
  },
  WITHDRAW: {
    path: "/mypage/userinfo/withdraw",
    link: "/mypage/userinfo/withdraw",
    element: WithdrawPage,
  },

  CHANGEPASSWORD: {
    path: "/mypage/userinfo/changepassword",
    link: "/mypage/userinfo/changepassword",
    element: ChangePasswordPage,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
