import React from 'react';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SignUpCompleteModal(props) {
  const nav = useNavigate()
  
  return (
    <Modal
      style={{
        display: "flex"
      }}
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      <img src="check.png" style={{
            width:"30px",
            marginRight: "10px"
        }} />
        <Modal.Title id="contained-modal-title-vcenter">
          회원가입 완료
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <p style={{
            margin:"10px 10px"
        }}>
          회원가입이 완료되었습니다.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
        props.onHide(); // 모달 닫기
        nav('/'); // /home 페이지로 이동
        }}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpCompleteModal

