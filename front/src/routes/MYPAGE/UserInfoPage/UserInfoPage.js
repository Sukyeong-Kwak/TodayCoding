import React from "react";
import { UserInfoPageStyle } from "./UserInfoPage.style";
import { useNavigate } from "react-router-dom";
import Nav from "../../../components/nav/Nav";

const UserInfo = () => {
  const nav = useNavigate();
  const handleProfile = () => {
    nav("/mypage/userinfo/profile");
  };
  const handleWithdraw = () => {
    nav("/mypage/userinfo/withdraw");
  };
  const handleBack = () => {
    nav("/mypage");
  };
  const handlePassword = () => {
    nav("/mypage/userinfo/changepassword");
  };
  return (
    <UserInfoPageStyle.Container>
      <UserInfoPageStyle.Header>
        <UserInfoPageStyle.Button onClick={handleBack}>
          뒤로가기
        </UserInfoPageStyle.Button>
        <UserInfoPageStyle.Title>회원정보</UserInfoPageStyle.Title>
        <UserInfoPageStyle.Spacer />
      </UserInfoPageStyle.Header>
      <UserInfoPageStyle.UpperContainer>
        <img id="logoImage" src="/main-logo.png" alt="로고" />
      </UserInfoPageStyle.UpperContainer>
      <UserInfoPageStyle.MainContainer>
        <UserInfoPageStyle.UpperLine />
        <UserInfoPageStyle.ListWrapper>
          <ul>
            <li onClick={handleProfile}>프로필 설정</li>
            <UserInfoPageStyle.UnderLine />
            <li onClick={handlePassword}>비밀번호 변경</li>
            <UserInfoPageStyle.UnderLine />
            <UserInfoPageStyle.Withdraw onClick={handleWithdraw}>
              회원 탈퇴
            </UserInfoPageStyle.Withdraw>
          </ul>
          <UserInfoPageStyle.SplitLine />
        </UserInfoPageStyle.ListWrapper>
      </UserInfoPageStyle.MainContainer>
      <Nav></Nav>
    </UserInfoPageStyle.Container>
  );
};

export default UserInfo;
