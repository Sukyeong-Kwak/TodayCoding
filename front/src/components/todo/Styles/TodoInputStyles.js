import styled from "styled-components";

// 입력 필드와 저장 버튼을 포함하는 컨테이너의 스타일 설정
export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

// 할 일을 입력하는 텍스트 필드의 스타일 설정
export const Input = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// 저장 버튼의 스타일 설정
export const SaveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #888;
  margin-left: 10px;
  &:hover {
    color: #555;
  }
`;
