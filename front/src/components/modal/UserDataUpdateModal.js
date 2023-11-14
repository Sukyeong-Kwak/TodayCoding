import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"

function UserDataUpdateModal(props) {
  const handleWithdraw = () => {
    props.onWithdraw();
    props.onHide();
  };

  const nav = useNavigate()
    const handleMypage = () => {
        nav("/mypage")
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
        <img src="/check.png" style={{
            width:"30px",
            marginBottom:"5px",
            marginRight:"10px"
        }}/>
          <span>정보 변경 완료</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <p style={{
            margin:"10px auto"
        }}>
            회원 정보가 변경되었습니다.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleMypage}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDataUpdateModal


