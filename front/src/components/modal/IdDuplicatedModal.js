import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function IdDuplicatedModal(props) {
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
        <Modal.Title id="contained-modal-title-vcenter">
        <img src="/!.png" style={{
            width:"30px",
            marginBottom:"5px",
            marginRight:"10px"
        }}/>
          아이디 중복
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{
            margin:"10px auto"
        }}>
          이미 사용중인 아이디입니다.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default IdDuplicatedModal


