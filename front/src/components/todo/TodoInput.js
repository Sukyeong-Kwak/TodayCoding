import React, { useState } from "react";
import { InputContainer, Input, SaveButton } from "./Styles/TodoInputStyles";
import { apiInstance } from "../../utils/api";

function TodoInput({ sendDataToParent, categroyId, clickedDate, todoChanger }) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(); //카테고리 아이템으로 넘길 값
  const [addTodoList, setAddTodoList] = useState();
  const [error, setError] = useState(null);

  //새로운 등록 input 닫기
  const handleButtonClick = () => {
    // 하위 컴포넌트에서 상위 컴포넌트로 데이터 전달
    setIsCategoryModalOpen(!isCategoryModalOpen);
    sendDataToParent(isCategoryModalOpen);

    //post 요청 보내는 함수
    const addTodoListToServer = async () => {
      // todo 추가
      const todoAdd = {
        date: clickedDate,
        completed: false,
        text: addTodoList,
        originalIndex: 0,
      };
      try {
        const response = await apiInstance.post(
          `/api/todos/${categroyId}`,
          todoAdd
        );
        if (response.status >= 200 && response.status < 300) {
          // 서버 응답이 성공인 경우
          setAddTodoList(response.data); // 받아온 데이터를 상태에 업데이트
        } else {
          // 서버 응답이 실패인 경우
          setError("Failed to fetch data");
        }
        // console.log(addTodoList); //응답 데이터를 설정
      } catch (error) {
        console.error("에러발생:", error);
      }
    };
    addTodoListToServer();
  };

  return (
    <InputContainer>
      <Input
        onChange={(e) => setAddTodoList(e.target.value)}
        type="text"
        placeholder="새로운 할 일을 입력하세요"
      />
      <SaveButton
        onClick={async () => {
          handleButtonClick();
          const response = await apiInstance.get(`/api/todos/${clickedDate}`);
          todoChanger(response.data);
        }}
      >
        저장
      </SaveButton>
    </InputContainer>
  );
}

export default TodoInput;
