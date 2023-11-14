import React, { useState, useEffect } from "react";
import "./Header.css";
import { apiInstance } from "../../utils/api";

function Header() {
  const [data, setData] = useState({
    name: "",
    nickname: "",
    profileImgUrl: ""
  })
  useEffect(() => {
    //사용자 정보 조회 get 요청
    apiInstance
      .get("/api/users", {})
      .then((response) => {
        const { name, nickname, profileImgUrl } = response.data
        setData(response.data);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중에 오류가 발생했습니다.:", error);
      });
  }, []);
  return (
    <div className="headerWrap">
      <img className="logo" src="/feed-logo.png" alt="logo" />
      <div className="userWrap">
        <div className="personUser">
        <img className="profile-icon" src={data.profileImgUrl ||"profile-icon.png"} alt="profile-icon" />
          {/* 데이터가 있으면 name표시 */}
          <span className="userName">{data?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
