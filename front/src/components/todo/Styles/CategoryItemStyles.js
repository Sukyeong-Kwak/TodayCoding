import styled from "styled-components";
// styled-components를 사용해 각 UI 요소의 스타일 정의
export const CategoryItemContainer = styled.div`
  margin-top: 20px;
`;

export const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin-bottom: 10px;
`;

export const CategoryTitle = styled.h2`
  margin: 0;
  padding: 7px;
  font-size: 1.5em;
  font-family: "fontMedium";
  font-weight: 600;
  display: inline-block;
  background-color: #eee;
  border-radius: 5px;
`;

export const PlusButton = styled.button`
  background-color: transparent;
  font-faminly: "fontLight";
  margin-left: 5px;
  font-size: 1em;
  border: none;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #555;
`

export const DeleteCategoryButton = styled.button`
  background-color: transparent;
  font-faminly: "fontLight";
  padding: 5px 7px;
  margin-left: 5px;
  font-size: 15px;
  border: none;
  cursor: pointer;
  background-color: #4f4f4f;
  color: #fff;
  border-radius: 5px;
`