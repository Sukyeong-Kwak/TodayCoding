import React, { useState } from 'react';
import styled from 'styled-components';
import Nav from "../../components/nav/Nav";


const Container = styled.div`
  text-align: center;
  width: 60%;
  flex-direction: column;
  padding: 40px 40px 150px 40px;
  align-items: center;
  margin: 0 auto;
  
`;

const LogoSection = styled.div`
  width: 100%;
 margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 100%;
`;

const StickerList = styled.ul`
  padding: 0;
  margin: 0;
`;

const StickerItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  font-family: fontMedium;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    color: #555;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StickerImage = styled.img`
  width: 100px;
  height: 100px;
`;
const StickerImagePack = styled.img`
  width: 500px;
  height: 400px;
`;

const StickerInfo = styled.div`
  margin-left: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    margin-bottom: 4px;
  }

  div:first-child {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  div:last-child {
    font-size: 14px;
    font-weight: 400;
    color: #888;
  }

`;


const SplitLine = styled.div`
  width: 100%;
  border-top: 1px solid black;
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 80%;
  border-radius: 10px;
  max-width: 600px;

  div:nth-child(2) {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  div:nth-child(3) {
    font-size: 14px;
    font-weight: 400;
    color: #888;
  }
`;

const Button = styled.button`
  margin: 5px 5px;
  background-color: #4f4f4f; /* 무채색 배경 */
  border: none; /* 테두리 제거 */
  color: #ffffff; /* 글자 색 */
  padding: 5px 10px; //패딩
  border-radius: 6px; //둥근 모서리
  transition: background-color 0.3s, color 0.3s; /* 애니메이션 효과 */

  &:hover {
    background-color: #6f6f6f;  /* 마우스를 올렸을 때의 배경색 */
    color: #fff;  /* 마우스를 올렸을 때의 글자색 */
  }
}`;

const Store = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);

  const stickers = [
    { id: 1, name: '열공 모드', price: '2000 point', img: 'sticker1.png', imgPack: 'stickerpack1.png' },
    { id: 2, name: '동물 친구들', price: '2500 point', img: 'sticker2.png', imgPack: 'stickerpack2.png' },
    { id: 3, name: '레터링', price: '3000 point', img: 'sticker3.png', imgPack: 'stickerpack1.png'},
    { id: 4, name: '매일의 감정', price: '3000 point', img: 'sticker4.png', imgPack: 'stickerpack1.png'},
    { id: 5, name: '오늘 내 표정', price: '3000 point', img: 'sticker5.png', imgPack: 'stickerpack1.png'},   
  ];

  const openModal = (sticker) => {
    setSelectedSticker(sticker);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <Container>
      <LogoSection>
        <Logo src="stickershop_logo.png" alt="Sticker Shop Logo" />
      </LogoSection>
      <SplitLine />
      <StickerList>
        {stickers.map((sticker) => (
          <StickerItem key={sticker.id} onClick={() => openModal(sticker)}>
            <StickerImage src={sticker.img} alt={sticker.name} />
            <StickerInfo>
              <div>{sticker.name}</div>
              <div>{sticker.price}</div>
            </StickerInfo>
          </StickerItem>
          
        ))}
      </StickerList>
      <SplitLine />
      {showModal && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <StickerImagePack src={selectedSticker.imgPack} alt={selectedSticker.name} />
            <div>{selectedSticker.name}</div>
            <div>{selectedSticker.price}</div>
            <Button onClick={closeModal}>닫기</Button>
            <Button>구입</Button>
          </ModalContent>
        </Modal>
      )}
      <Nav />
    </Container>
  );
};

export default Store;