import styled from "styled-components";

const UpperContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 10vh;

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
  display: flex;
  flex-direction: column;
  width: 70%;
  min-width: 550px;
  max-width: 700px;
  margin: 0 auto;
`;

const Sign = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
`;

const Underline = styled.div`
  border-top: 2px solid gray;
  width: 100%;
  margin: 20px 0;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 150px;
  width: 70%;
  min-width: 550px;
  max-width: 700px;

  .idLabel,
  .pwdLabel,
  .pwdConfirmLabel,
  .emailLabel,
  .genderLabel,
  .birthLabel,
  .nicknameLabel,
  .custom-option {
    display: flex;
    margin-left: 10px;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    color: gray;
  }

  #userIdInput {
    display: flex;
    width: 70%;
    margin-right: 15px;
  }

  .customInput::placeholder {
    font-size: 12px;
  }

  .form {
    margin: 0 auto;
    position: relative;
    width: 100%;
  }

  .customInput {
    max-width: 100% !important;
  }

  #SignUpButton {
    font-size: 16px;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .customSelect {
    width: 170px;
  }
  .birthInput::placeholder {
    font-size: 12px;
  }
`;
const IdContainer = styled.div`
  display: flex;
  #customButton {
    font-weight: 500;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  padding: 10px 50px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const VerifyPwd = styled.div`
  color: red;
  font-size: 12px;
  margin: 5px 10px auto;
`;
const VerifyEmail = styled.div`
  color: red;
  font-size: 12px;
  margin: 5px 10px auto;
`;

const SignUpPageStyles = {
  UpperContainer,
  LowerContainer,
  Sign,
  Underline,
  MainContainer,
  IdContainer,
  ButtonContainer,
  VerifyEmail,
  VerifyPwd,
};

export default SignUpPageStyles;
