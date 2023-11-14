import styled from "styled-components";

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin: 15vh auto 3vh auto;
  width: 40vh;
  height: 40vh;
  cursor: pointer;
`;
const UpperContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 40px; /* 여기서 수정 */

  h1 {
    font-size: 45px;
    letter-spacing: 0px;
    cursor: pointer;
    &:hover {
      color: gray;
      transition: color 0.3s ease;
    }
  }

  h1 > a {
    text-decoration: inherit;
    color: inherit;
  }
`;
const LowerContainer = styled.div`
  width: 15%;
  margin: 0 auto;
`;
const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const LoginPageStyles = {
  Logo,
  UpperContainer,
  LowerContainer,
  ButtonContainer,
};

export default LoginPageStyles;
