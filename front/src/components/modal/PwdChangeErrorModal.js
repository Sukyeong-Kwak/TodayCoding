import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PwdChangeErrorModal(props) {
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
        <img src="/!.png" style={{
            width:"30px",
            marginBottom:"5px",
            marginRight:"10px"
        }}/>
          정보 변경 오류
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{
            margin:"10px auto"
        }}>
          비밀번호를 확인해주세요.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PwdChangeErrorModal


