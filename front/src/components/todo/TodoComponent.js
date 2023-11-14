import React, { useState, useEffect } from "react";
import { apiInstance } from "../../utils/api";
import CategoryList from "./CategoryList";
import CategoryModal from "./CategoryModal";
import {
  TodoContainer,
  ModalOverlay,
  ModalContent,
  CategoryIcon,
} from "./Styles/TodoStyles";

function TodoComponent({ clickedDate }) {
  const [data, setData] = useState([]); // get으로 받아온 데이터(카테고리 조회)
  // console.log("Todocompo", data);
  const [_id, _setId] = useState([]); //서버에서 온 _id값 저장할 상태
  const [_name, _setName] = useState([]); //카테고리 이름을 저장할 상태
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // 카테고리 모달의 열림/닫힘 상태를 관리

  // GET 요청을 보내고 데이터를 받아옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(`/api/todos/${clickedDate}`);
        setData(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중에 오류가 발생했습니다.:", error);
      }
    };

    fetchData(); // 비동기 함수 실행
  }, [clickedDate]);

  //모달창
  // 하위 컴포넌트로 전달할 함수
  const handleDataFromChild = (data) => {
    // 받은 데이터를 상태에 업데이트
    setIsCategoryModalOpen(data);
  };

  return (
    <TodoContainer style={{ float: "left" }}>
      <div style={{ textAlign: "right" }}>
        <CategoryIcon
          src="/CategorySetting.png"
          onClick={() => setIsCategoryModalOpen(true)}
        />
      </div>

      {isCategoryModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CategoryModal
              sendDataToParent={handleDataFromChild}
              categoryName={_name}
              todoChanger={setData}
              clickedDate={clickedDate}
            ></CategoryModal>
          </ModalContent>
        </ModalOverlay>
      )}

      {data.length === 0 ? (
        <div>추가한 카테고리가 없습니다.</div>
      ) : (
        <CategoryList
          clickedDate={clickedDate}
          data={data}
          categoryId={_id}
          todoChanger={setData}
        />
      )}
    </TodoContainer>
  );
}

export default TodoComponent;
