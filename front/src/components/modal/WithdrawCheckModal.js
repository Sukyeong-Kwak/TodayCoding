import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function WithdrawCheckModal(props) {
  const handleWithdraw = () => {
    props.onWithdraw();
    props.onHide();
  };

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
          확인 버튼 클릭시, 계정은 삭제되며 복구되지 않습니다.<br />
          정말 탈퇴하시겠습니까?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>취소</Button>
        <Button variant="danger" onClick={handleWithdraw}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WithdrawCheckModal


