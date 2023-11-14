import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WithdrawCheckModal(props) {
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
          <span>회원 탈퇴</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <p style={{
            margin:"10px auto"
        }}>
          안내사항을 확인 후 진행해주세요.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WithdrawCheckModal


