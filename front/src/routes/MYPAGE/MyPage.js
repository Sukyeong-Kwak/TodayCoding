import React, { useState, useEffect } from "react";
import { MyPageStyle } from "./MyPage.style";
import { ROUTE } from "../routes";
import { Link } from "react-router-dom";
import { apiInstance } from "../../utils/api";
import Nav from "../../components/nav/Nav";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [data, setData] = useState({
    name: "",
    nickname: "",
    profileImgUrl: ""
  }); 

  useEffect(() => {
    apiInstance
      .get("/api/users", {})
      .then((response) => {
        const { name, nickname, profileImgUrl } = response.data
        setData(response.data); // get 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중에 오류가 발생했습니다.:", error);
      });
  }, []);
 
  const nav = useNavigate();
  const handleHome = () => {
    nav("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleHome();
  };

  return (
    <div style={{ paddingBottom: "150px" }}>
      <MyPageStyle.UpperContainer>
        <img id="logoImage" src="/main-logo.png" alt="로고" />
      </MyPageStyle.UpperContainer>
      <MyPageStyle.LowerContainer>
        <MyPageStyle.ProfileWrapper>
          <img id="profileImage" src={data.profileImgUrl || "/profile.jpg"} />
          {/* 데이터가 있으면 name표시 */}
          <span id="userName">
            {data?.name}({data?.nickname})
          </span>
        </MyPageStyle.ProfileWrapper>
      </MyPageStyle.LowerContainer>
      <MyPageStyle.MainContainer>
        <MyPageStyle.UpperLine />
        <MyPageStyle.ListWrapper>
          <ul>
            <Link to={ROUTE.USERINFO.link}>
              <li>회원정보</li>
            </Link>
            <MyPageStyle.UnderLine />
            <li>공지사항</li>
            <MyPageStyle.UnderLine />
            <li>버전</li>
            <MyPageStyle.UnderLine />
            <Link to={`/mypage/setting/darkmode`}>
              <li>설정</li>
            </Link>
            <MyPageStyle.UnderLine />
            <li onClick={handleLogout}>로그아웃</li>
          </ul>
        </MyPageStyle.ListWrapper>
        <MyPageStyle.SplitLine />
      </MyPageStyle.MainContainer>
      <Nav></Nav>
    </div>
  );
};

export default MyPage;
