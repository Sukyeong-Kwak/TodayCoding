import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiInstance } from "../../utils/api";
import DiaryList from "./DiaryList";
import "./DiaryHome.css";

function DiaryHome({ date }) {
  //목록
  const [diaryList, setDiaryList] = useState([]);

  const viewDiaryList = async () => {
    try {
      const res = await apiInstance.get(`/api/posts/?date=${date}`);
      setDiaryList(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  //목록 조회 함수 호출
  useEffect(() => {
    viewDiaryList();
  }, [date]);

  return (
    <section className="wrapper">
      <Link to={`/DiaryWrite`} state={{ date: date }}>
        <button className="diary-write-btn" type="button">
          글쓰기
        </button>
      </Link>
      <ul className="diary-list">
        <DiaryList listItemData={diaryList}></DiaryList>
      </ul>
    </section>
  );
}

export default DiaryHome;
