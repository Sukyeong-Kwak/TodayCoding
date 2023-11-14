import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"



function PwdChangeSuccessModal(props) {
  const nav = useNavigate()
  
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent:"center"
      }}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <img src="/check.png" style={{
            width:"30px",
            marginBottom:"5px",
            marginRight:"10px"
        }}/>
          변경 완료
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{
            margin:"10px auto"
        }}>
          비밀번호가 변경되었습니다.
        </p>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={() => {
        props.onHide(); 
        nav('/mypage'); 
        }}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PwdChangeSuccessModal

