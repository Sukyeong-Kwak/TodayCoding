import React from "react";
import "./Nav.css";
import { BiCart, BiHomeAlt, BiSolidUser, BiLogOut } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom"; // useLocation를 추가로 import(선택된 메뉴는 파란색으로 바꾸기위해)
import { ROUTE } from "../../routes/routes";

function Nav() {
  const nav = useNavigate();
  const location = useLocation(); // 현재 경로 정보를 가져옴.

  const handleHome = () => {
    nav("/");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    handleHome();
  };

  return (
    <div className="navWrap">
      <Link to={ROUTE.HOME.link}>
        <div className={`feed ${location.pathname === ROUTE.HOME.link ? 'selected' : ''}`}> 
        {/*useLocation 훅을 사용하여 현재 경로 (pathname)를 가져온 다음, 각 메뉴 링크의 경로와 비교. 일치하는 경우, 해당 메뉴 아이템에 selected 클래스가 적용  */}
          <BiHomeAlt></BiHomeAlt>
          <span>피드</span>
        </div>
      </Link>
      <Link to={ROUTE.STORE.link}>
        <div className={`store ${location.pathname === ROUTE.STORE.link ? 'selected' : ''}`}>
          <BiCart></BiCart>
          <span>스티커샵</span>
        </div>
      </Link>
      <Link to={ROUTE.MYPAGE.link}>
        <div className={`myPage ${location.pathname === ROUTE.MYPAGE.link ? 'selected' : ''}`}>
          <BiSolidUser></BiSolidUser>
          <span>My</span>
        </div>
      </Link>
      <div className="logout" onClick={handleLogout} style={{cursor:"pointer"}}>
        <BiLogOut></BiLogOut>
        <span>Logout</span>
      </div>
    </div>
  );
}

export default Nav;