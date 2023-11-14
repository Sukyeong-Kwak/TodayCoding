import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WithdrawCompleteModal(props) {
  const nav = useNavigate()
  const handleHome = () => {
    nav("/home")
    props.onHide()
  }

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
        <img src="/delete.png" style={{
            width:"30px",
            marginBottom:"5px",
            marginRight:"10px"
        }}/>
          <span>회원탈퇴</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 style={{
            marginBottom:"20px"
        }}>탈퇴 처리가 완료되었습니다.</h4>
        <p style={{
            margin:"10px auto"
        }}>
          이용해주셔서 감사합니다.
          앞으로 더 좋은 서비스를 제공할수 있도록 노력하겠습니다.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleHome}>홈으로</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WithdrawCompleteModal


