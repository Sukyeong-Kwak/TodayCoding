import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { apiInstance } from "../../utils/api";
import "./DiaryView.css";

//마크다운 에디터
import MDEditor from "@uiw/react-md-editor";
import DiaryDelete from "./DiaryDelete";

function DiaryView() {
  //게시글 아이디
  const postId = useLocation().state.postId;

  // 삭제 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  //리액트 라우터 돔
  const navigate = useNavigate();

  const [post, setPost] = useState({
    diaryTitle: "",
    diaryContent: "",
  });

  const viewDiary = async () => {
    try {
      const res = await apiInstance.get(`/api/posts/${postId}`);
      setPost({ diaryTitle: res.data.title, diaryContent: res.data.content });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    viewDiary();
  }, []);

  // [목록] 버튼 클릭 시
  const handleListBtn = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <section className="diary-view-wrap">
      <div className="diary-view-box">
        <h2 className="diary-view-title">{post.diaryTitle}</h2>
        <div data-color-mode="light">
          <div className="wmde-markdown-var"></div>
          <MDEditor.Markdown
            className="diary-viewer"
            source={post.diaryContent}
          />
        </div>
        <div className="diary-view-btns">
          <button type="button" onClick={handleListBtn}>
            목록
          </button>
          <Link to={`/DiaryEdit`} state={{ postId: postId }}>
            <button type="button">수정</button>
          </Link>
          <button type="button" onClick={showModal}>
            삭제
          </button>
          {modalOpen && (
            <DiaryDelete setModalOpen={setModalOpen} postId={postId} />
          )}
        </div>
      </div>
    </section>
  );
}

export default DiaryView;
