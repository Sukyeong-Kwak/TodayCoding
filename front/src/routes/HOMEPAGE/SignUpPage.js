import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpPageStyles from "./SignUpPage.styles";
import { Button } from "react-bootstrap";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import IdEmptyModal from "../../components/modal/IdEmptyModal";
import IdCheckedModal from "../../components/modal/IdCheckedModal";
import IdDuplicatedModal from "../../components/modal/IdDuplicatedModal";
import SignUpCompleteModal from "../../components/modal/SignUpCompleteModal";
import SignUpFailModal from "../../components/modal/SignUpFailModal";
import SignUpErrorModal from "../../components/modal/SignUpErrorModal";
import axios from "axios";

const SERVER_URL = "http://localhost:3001"

const SignUpPage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  const idInput = useRef(null);
  useEffect(() => {
    idInput.current.focus();
  }, []);

  const [modals, setModals] = useState({
    emptyModal: false,
    checkedModal: false,
    duplicatedModal: false,
    signUpFailModal: false,
    signUpErrorModal: false,
    signUpModal: false,
  });

  const [userData, setUserData] = useState({
    name: "",
    id: "",
    email: "",
    nickname: "",
    gender: "",
    birthDate: "",
    aboutMe: "자기소개를 입력해보세요.",
    password: "",
  });

  const [userInfo, setUserInfo] = useState({
    name: "",
    nameCheck: false,
    id: "",
    idChecked: false,
    password: "",
    confirmPassword: "",
    passwordChecked: false,
    email: "",
    emailTested: true,
    emailChecked: false,
  });

  const {
    emptyModal,
    checkedModal,
    duplicatedModal,
    signUpFailModal,
    signUpErrorModal,
    signUpModal,
  } = modals;

  const handleNameCheck = (event) => {
    const newName = event.target.value;

    if (newName.length >= 2) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        name: newName,
        nameCheck: true,
      }));
      setUserData((prevUserData) => ({
        ...prevUserData,
        name: newName,
      }));
    }
  };

  const handleIdCheck = () => {
    const url = `${SERVER_URL}/api/users/register/${userData.id}`;
    const requestData = {
      id: userData.id,
    };
    if (userData.id.length === 0) {
      setModals((prevModals) => ({
        ...prevModals,
        emptyModal: true,
      }));
      return;
    }
    axios
      .post(url, requestData)
      .then((response) => {
        const responseMessage = response.data.message;
        if (responseMessage === "다른 아이디를 사용해주세요.") {
          setModals((prevModals) => ({
            ...prevModals,
            duplicatedModal: true,
          }));
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            idChecked: false,
          }));
        } else {
          setModals((prevModals) => ({
            ...prevModals,
            checkedModal: true,
          }));
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            idChecked: true,
          }));
        }
      })
      .catch((error) => {
        setModals((prevModals) => ({
          ...prevModals,
          signUpErrorModal: true,
        }));
        console.error("아이디 중복 확인 오류:", error);
      });
  };

  const handleId = (event) => {
    const newId = event.target.value;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      id: newId,
    }));
    setUserData((prevUserData) => ({
      ...prevUserData,
      id: newId,
    }));
  };

  const handlePassWord = (event) => {
    const newPassword = event.target.value;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      password: newPassword,
    }));
    setUserData((PrevUserData) => ({
      ...PrevUserData,
      password: newPassword,
    }));
    if (newPassword === userInfo.confirmPassword) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        passwordChecked: true,
      }));
    }
  };

  const handleConfirmPassWord = (event) => {
    const newConfirmPassword = event.target.value;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      confirmPassword: newConfirmPassword,
    }));
    if (userData.password === newConfirmPassword) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        passwordChecked: true,
      }));
    }
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;

    if (inputEmail.length >= 8) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const newEmailTested = emailPattern.test(inputEmail);
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        email: inputEmail,
        emailTested: newEmailTested,
        emailChecked: newEmailTested,
      }));
      setUserData((prevUserData) => ({
        ...prevUserData,
        email: inputEmail,
      }));
    } else {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        email: "",
        emailTested: true,
        emailChecked: false,
      }));
    }
  };

  const handleGender = (selectedOption) => {
    if (selectedOption) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        gender: selectedOption.value,
      }));
    }
  };
  const handleBirth = (event) => {
    const selectedBirth = event.target.value;
    const birthWithoutHyphens = selectedBirth.replace(/-/g, "");
    setUserData((prevUserData) => ({
      ...prevUserData,
      birthDate: birthWithoutHyphens,
    }));
  };

  const handleNickname = (event) => {
    const newNickname = event.target.value;
    setUserData((prevData) => ({
      ...prevData,
      nickname: newNickname,
    }));
  };
  const signUpCheck = () => {
    return (
      userInfo.idChecked && userInfo.passwordChecked && userInfo.emailChecked
    );
  };

  const handleSignUp = () => {
    const jsonUserData = JSON.stringify(userData);
    console.log(jsonUserData);
    const url = `${URL}/api/users/register`;

    axios
      .post(url, jsonUserData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setModals((prevModals) => ({
            ...prevModals,
            signUpModal: true,
          }));
        } else {
          setModals((prevModals) => ({
            ...prevModals,
            signUpErrorModal: true,
          }));
        }
      })
      .catch((err) => {
        console.error("요청 에러", err);
        setModals((prevModals) => ({
          ...prevModals,
          signUpErrorModal: true,
          signUpModal: false,
        }));
      });
  };

  return (
    <div>
      <SignUpPageStyles.UpperContainer>
        <h1 onClick={handleHome}>오늘도 코딩</h1>
      </SignUpPageStyles.UpperContainer>
      <SignUpPageStyles.LowerContainer>
        <SignUpPageStyles.Sign>회원가입</SignUpPageStyles.Sign>
        <SignUpPageStyles.Underline></SignUpPageStyles.Underline>
      </SignUpPageStyles.LowerContainer>
      <SignUpPageStyles.MainContainer>
        <Form className="form">
          <Form.Group className="idInput">
            <Form.Label className="idLabel">아이디</Form.Label>
            <SignUpPageStyles.IdContainer>
              <Form.Control
                id="userIdInput"
                className="customInput"
                type="text"
                placeholder="아이디"
                ref={idInput}
                onChange={handleId}
              />
              <Button
                id="idCheckButton"
                style={{ width: "90px", height: "40px" }}
                variant="primary"
                onClick={handleIdCheck}
              >
                중복 확인
              </Button>
            </SignUpPageStyles.IdContainer>
          </Form.Group>
          <Form.Group className="pwdInput">
            <Form.Label className="pwdLabel">비밀번호</Form.Label>
            <Form.Control
              className="customInput"
              type="password"
              placeholder="비밀번호"
              onChange={handlePassWord}
            />
          </Form.Group>
          <Form.Group className="pwdInput">
            <Form.Label className="pwdConfirmLabel">비밀번호 확인</Form.Label>
            <Form.Control
              className="customInput"
              type="password"
              placeholder="비밀번호 확인"
              onChange={handleConfirmPassWord}
            />
            {userInfo.password === userInfo.confirmPassword ? (
              ""
            ) : (
              <SignUpPageStyles.VerifyPwd>
                비밀번호가 일치하지 않습니다.
              </SignUpPageStyles.VerifyPwd>
            )}
          </Form.Group>
          <Form.Group className="emailInput">
            <Form.Group className="idInput">
              <Form.Label className="idLabel">이름</Form.Label>
              <SignUpPageStyles.IdContainer>
                <Form.Control
                  id="userNameInput"
                  className="customInput"
                  type="text"
                  placeholder="이름"
                  onChange={handleNameCheck}
                />
              </SignUpPageStyles.IdContainer>
            </Form.Group>
            <Form.Group className="nicknameInput">
              <Form.Label className="nicknameLabel">닉네임</Form.Label>
              <SignUpPageStyles.IdContainer>
                <Form.Control
                  id="userNickNameInput"
                  className="customInput"
                  type="text"
                  placeholder="닉네임"
                  onChange={handleNickname}
                />
              </SignUpPageStyles.IdContainer>
            </Form.Group>
            <Form.Group className="genderInput">
              <Form.Label className="genderLabel">성별</Form.Label>
              <SignUpPageStyles.IdContainer>
                <Select
                  className="customSelect"
                  onChange={handleGender}
                  options={[
                    { value: "", label: "성별을 선택해주세요." },
                    { value: "남성", label: "남성" },
                    { value: "여성", label: "여성" },
                  ]}
                />
              </SignUpPageStyles.IdContainer>
            </Form.Group>
            <Form.Group className="birthInput">
              <Form.Label className="birthLabel">생년월일</Form.Label>
              <Form.Control
                className="birthInput"
                type="date"
                placeholder="생년월일"
                onChange={handleBirth}
              />
            </Form.Group>
            <Form.Label className="emailLabel">이메일</Form.Label>
            <Form.Control
              className="customInput"
              type="email"
              placeholder="이메일"
              onChange={handleEmailChange}
            />
            {userInfo.emailTested ? (
              ""
            ) : (
              <SignUpPageStyles.VerifyEmail>
                이메일 형식이 올바르지 않습니다.
              </SignUpPageStyles.VerifyEmail>
            )}
          </Form.Group>
          <SignUpPageStyles.ButtonContainer>
            <Button
              style={{ width: "100px", height: "50px" }}
              id="SignUpButton"
              variant="primary"
              onClick={() => {
                if (!signUpCheck()) {
                  setModals((prevModals) => ({
                    ...prevModals,
                    signUpFailModal: true,
                  }));
                } else {
                  handleSignUp();
                }
              }}
            >
              가입하기
            </Button>
          </SignUpPageStyles.ButtonContainer>
        </Form>
      </SignUpPageStyles.MainContainer>
      <div>
        <IdEmptyModal
          show={emptyModal}
          onHide={() =>
            setModals((prevModals) => ({ ...prevModals, emptyModal: false }))
          }
        />
        <IdCheckedModal
          show={checkedModal}
          onHide={() =>
            setModals((prevModals) => ({ ...prevModals, checkedModal: false }))
          }
        />
        <IdDuplicatedModal
          show={duplicatedModal}
          onHide={() =>
            setModals((prevModals) => ({
              ...prevModals,
              duplicatedModal: false,
            }))
          }
        />
        <SignUpFailModal
          show={signUpFailModal}
          onHide={() =>
            setModals((prevModals) => ({
              ...prevModals,
              signUpFailModal: false,
            }))
          }
        />
        <SignUpErrorModal
          show={signUpErrorModal}
          onHide={() =>
            setModals((prevModals) => ({
              ...prevModals,
              signUpErrorModal: false,
            }))
          }
        />
        <SignUpCompleteModal
          show={signUpModal}
          onHide={() =>
            setModals((prevModals) => ({ ...prevModals, signUpModal: false }))
          }
        />
      </div>
    </div>
  );
};

export default SignUpPage;
