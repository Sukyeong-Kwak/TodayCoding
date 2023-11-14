import styled from "styled-components";

export const TodoContent = styled.div`
  display: flex;
  align-items: center;
`;

export const TodoFunc = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  font-family: "fontMedium";
`;

export const Button = styled.button`
  background-color: transparent;
  font-family: "fontLight";
  margin-left: 5px;
  font-size: 10pt;
  border: none;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #555;
  }
`;
