import styled from "styled-components";

export const TodoContainer = styled.div`
  /* TodoContainer 스타일링 */
  width: 33%;
  max-width: 600px;
  padding: 20px;
  position: relative;
`;

export const Title = styled.h1`
  /* Title 스타일링 */
  text-align: left;
  font-family: "fontBold";
`;

export const ModalOverlay = styled.div`
  /* ModalOverlay 스타일링 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  /* ModalContent 스타일링 */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

export const CategoryIcon = styled.img`
  /* CategoryIcon 스타일링 */
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
`;
