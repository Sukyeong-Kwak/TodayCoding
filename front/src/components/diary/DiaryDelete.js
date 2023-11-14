import React from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../../utils/api";
import "./DiaryDelete.css";

function DiaryDelete({ setModalOpen, postId }) {
  //게시글 아이디
  console.log(`아이디 ${postId}`);

  //리액트 라우터 돔
  const navigate = useNavigate();

  //게시글 삭제
  const deleteDiary = async () => {
    setModalOpen(false);
    try {
      const res = await apiInstance.delete(`/api/posts/${postId}`);
      alert("삭제되었습니다.");
      navigate("/home");
    } catch (e) {
      console.error(e);
    }
  };

  //[취소] 버튼 클릭 : 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="diary-delete-wrap">
      <div className="diary-delete-box">
        <p className="diary-delete-warning">
          삭제 시 복구할 수 없습니다.
          <br />
          삭제하시겠습니까?
        </p>
        <div className="diary-delete-btns">
          <button type="button" onClick={deleteDiary}>
            확인
          </button>
          <button type="button" onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiaryDelete;
