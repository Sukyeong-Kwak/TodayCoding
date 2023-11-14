import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiInstance } from "../../utils/api";
import "./DiaryWrite.css";

//마크다운 에디터
import MDEditor from "@uiw/react-md-editor";

function DiaryEdit() {
  //리액트 라우터 돔
  const navigate = useNavigate();

  //게시글 아이디
  const postId = useLocation().state.postId;

  //글 제목
  const titleRef = useRef();
  const [writtenDiaryTitle, setWrittenDiaryTitle] = useState("");

  //글 내용
  const [diaryContent, setDiaryContent] = useState("");

  //글 불러오기
  const viewDiary = async () => {
    try {
      const res = await apiInstance.get(`/api/posts/${postId}`);
      setWrittenDiaryTitle(res.data.title);
      setDiaryContent(res.data.content);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    viewDiary();
  }, []);

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

    async function editDiary() {
      try {
        const res2 = await apiInstance.patch(`/api/posts/${postId}`, {
          title: diaryTitle,
          content: diaryContent,
        });
        navigate("/DiaryView", { state: { postId: res2.data.id } });
      } catch (e) {
        console.error(e);
      }
    }

    editDiary();
  };

  return (
    <section className="diary-write-wrap">
      <div className="diary-write-box">
        <input
          className="diary-write-title"
          defaultValue={writtenDiaryTitle}
          ref={titleRef}
        ></input>
        <div data-color-mode="light">
          <div className="wmde-markdown-var"> </div>
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

export default DiaryEdit;
