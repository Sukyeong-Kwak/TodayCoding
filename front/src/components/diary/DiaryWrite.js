import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiInstance } from "../../utils/api";
import "./DiaryWrite.css";

//마크다운 에디터
import MDEditor from "@uiw/react-md-editor";

function DiaryWrite() {
  //날짜
  const date = useLocation().state.date;

  //글 제목
  const titleRef = useRef();

  //글 내용
  const [diaryContent, setDiaryContent] = useState("");

  //리액트 라우터 돔
  const navigate = useNavigate();

  // [취소] 버튼 클릭 시
  const handleCancelBtn = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  // [등록] 버튼 클릭 시
  const handleSubmitBtn = (e) => {
    e.preventDefault();

    //글 제목을 string으로 저장
    const diaryTitle = titleRef.current?.value;

    async function writeDiary() {
      try {
        const res = await apiInstance.post("/api/posts", {
          date: date,
          title: diaryTitle,
          content: diaryContent,
        });
        navigate("/DiaryView", { state: { postId: res.data._id } });
      } catch (e) {
        console.error(e);
      }
    }

    writeDiary();
  };

  return (
    <section className="diary-write-wrap">
      <div className="diary-write-box">
        <input className="diary-write-title" ref={titleRef}></input>
        <div data-color-mode="light">
          <div className="wmde-markdown-var"></div>
          <MDEditor
            height={400}
            value={diaryContent}
            onChange={setDiaryContent}
          />
        </div>
        <div className="diary-write-btns">
          <button type="button" onClick={handleCancelBtn}>
            취소
          </button>
          <button type="submit" onClick={handleSubmitBtn}>
            등록
          </button>
        </div>
      </div>
    </section>
  );
}

export default DiaryWrite;
