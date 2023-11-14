import styled from 'styled-components';


export const ModalOverlayStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7); /* 어두운 배경 */
`;

export const ModalContentStyles = styled.div`
  background-color: #ffffff;
  padding: 20px;
  width: 350px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;

  input[type="text"],{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .button-group {
    display: flex;
    gap: 10px;
  }

  button {
    cursor: pointer;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #333;  /* 다크 그레이 */
    color: #ffffff;
    transition: background-color 0.3s;

    &:hover {
      background-color: #555;  /* 라이트 그레이 */
    }
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    font-size: 16px;
    color: #333;  /* 다크 그레이 */
  }
`;

