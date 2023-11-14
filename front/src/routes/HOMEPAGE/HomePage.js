import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components"


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 85vh;

`;

const Logo = styled.img`
    width: 400px;
    height: 350px;
`;

const UpperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
 `;

const LowerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  font-size: 18px;
  letter-spacing: 1.1px;
  font-weight: 600;

  .loginBtn {
    margin-right: 20px;
  }
`;


const HomePage = () => {
    const navigate = useNavigate(); 

    const handleLogin = () => {
        navigate("/login"); 
    }
    const handleSignUp = () => {
        navigate("/signup")
    }
    return (
        <div>
            <Container>
            <UpperContainer>
            <Logo src='/main-logo.png' alt='logo' />
            </UpperContainer>
             <LowerContainer> 
                <Button variant="secondary" className="loginBtn" onClick={handleLogin}>로그인</Button>{' '}
                <Button variant="secondary" className="signUpBtn" onClick={handleSignUp}>회원가입</Button>{' '}
             </LowerContainer>
            </Container>
            
        </div>
    )
}


export default HomePage