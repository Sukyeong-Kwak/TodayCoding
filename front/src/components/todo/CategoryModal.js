import React, { useState, useEffect } from "react";
import { apiInstance } from "../../utils/api";
import {
  ModalOverlayStyles,
  ModalContentStyles,
} from "./Styles/CategoryModalStyles";

function CategoryModal({ sendDataToParent, todoChanger, clickedDate }) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(); //TodoComponent로 넘길 값
  const [newCategory, setNewCategory] = useState(""); //사용자가 추가하는 새 카테고리 input 값
  const [error, setError] = useState();

  //카테고리 추가 버튼 누르면 input 내용 서버로 전송
  //put 요청 보내는 함수
  const addCategoryListToServer = async () => {
    // 카테고리 추가
    const addCategoryList = {
      categoryName: newCategory,
    };
    try {
      const response = await apiInstance.put(
        `/api/users/categories`,
        addCategoryList
      );
      if (response.status >= 200 && response.status < 300) {
        // 서버 응답이 성공인 경우
        setNewCategory(response.data); // 받아온 데이터를 상태에 업데이트
      } else {
        // 서버 응답이 실패인 경우
        setError("Failed to fetch data");
      }
      // console.log(newCategory); //응답 데이터를 설정
    } catch (error) {
      console.error("에러발생:", error);
    }
  };

  //모달창 닫기
  const handleButtonClick = () => {
    // 하위 컴포넌트에서 상위 컴포넌트로 데이터 전달
    setIsCategoryModalOpen(!isCategoryModalOpen);
    sendDataToParent(isCategoryModalOpen);
    addCategoryListToServer(); // 카테고리 추가 요청 보내기
  };

  return (
    <ModalOverlayStyles>
      <ModalContentStyles>
        <div>
          <input
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="새 카테고리"
          />
          <button
            onClick={async () => {
              handleButtonClick();
              const response = await apiInstance.get(
                `/api/todos/${clickedDate}`
              );
              todoChanger(response.data);
            }}
          >
            카테고리 추가
          </button>
        </div>
        <button
          onClick={async () => {
            handleButtonClick();
            const response = await apiInstance.get(`/api/todos/${clickedDate}`);
            todoChanger(response.data);
          }}
        >
          닫기
        </button>
      </ModalContentStyles>
    </ModalOverlayStyles>
  );
}

export default CategoryModal;
