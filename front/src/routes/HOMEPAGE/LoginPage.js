import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginPageStyles from "./LoginPage.styles";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import LoginFailModal from "../../components/modal/LoginFailModal";
import LoginErrorModal from "../../components/modal/LoginErrorModal";
import axios from "axios";

const SERVER_URL = "http://localhost:3001"



const LoginPage = () => {
  const navigate = useNavigate();
  const handleHome= () => {
    navigate("/")
}
 
const [id, setId] = useState("");
const [password, setPassword] = useState("");

const idInput = useRef();
useEffect(() => {
    idInput.current.focus()
}, [])

//모달
const [failModal, setFailModal] = useState(false);
const [errorModal, setErrorModal] = useState(false);

const handleId = (event) => {
    setId(event.target.value)
}

const handlePassword = (event) => {
    setPassword(event.target.value)
}

const handleLogin = () => {
    const url = `${SERVER_URL}/api/auth/login`;
    const data = {
      id: id,
      password: password
    };
    const requestData = JSON.stringify(data);
    axios
      .post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.accessToken) {
          const token = response.data.accessToken;
          localStorage.setItem("token", token);          
          setFailModal(false);
          setErrorModal(false);
          navigate("/home")
          console.log("로그인 성공:", response.data);
        } else {
            console.log(requestData, "아이디 또는 비밀번호가 일치하지 않습니다.");
            setFailModal(true);
        }
      })
      .catch((error) => {
        console.error(requestData, error);
        setErrorModal(true);
      });
  };


    return(
        <div>
            <LoginPageStyles.Logo><img src="/main-logo.png" onClick={handleHome} /></LoginPageStyles.Logo>
            <LoginPageStyles.LowerContainer>
            <FloatingLabel controlId="floatingInput" label="아이디" className="mb-3">
                <Form.Control type="text" placeholder="" ref={idInput} onChange={handleId} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="비밀번호">
                <Form.Control type="password" placeholder="" onChange={handlePassword} />
            </FloatingLabel>
            </LoginPageStyles.LowerContainer>
            <LoginPageStyles.ButtonContainer>
                <Button id="loginButton"variant="primary" onClick={handleLogin}>로그인</Button>
            </LoginPageStyles.ButtonContainer>
            <LoginFailModal show={failModal} onHide={() => setFailModal(false)}/>
            <LoginErrorModal show={errorModal} onHide={() => setErrorModal(false)}/>
        </div>
    )
}

export default LoginPage