import React, { useState, useEffect } from 'react';
import { ProfilePageStyle } from "./ProfilePage.style"
import { Link } from 'react-router-dom';
import axios from "axios"
import UserDataUpdateModal from '../../../../components/modal/UserDataUpdateModal';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const SERVER_URL =  "http://localhost:3001"


const ProfilePage = () => {

  const token = localStorage.getItem("token");
  const url = `${SERVER_URL}/api/users`;

  const [data, setData] = useState({
    nickname: "",
    aboutMe: "",
    profileImgUrl: ""
  })

  const [updateModal, setUpdateModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { nickname, aboutMe, profileImgUrl } = response.data;
        setData({
          nickname,
          aboutMe,
          profileImgUrl
        });
        setUploadedImage(data.profileImage);
      })
      .catch((error) => {
        console.error("에러 발생", error);
      });
  }, []);

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    console.log(uploadedFile)
    setUploadedImage(URL.createObjectURL(uploadedFile));
    setUploadedFile(uploadedFile);
  }

  const handleSave = () => {
    const formData = new FormData();
    formData.append('nickname', data.nickname); 
    formData.append('aboutMe', data.aboutMe);
    formData.append('image', uploadedFile);
    console.log(formData)

    axios.patch(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {

        setUpdateModal(true);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  const basicImage = () => {
    const imageUrl = "/profile.jpg";
  
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const file = new File([blob], 'profile.jpg', { type: blob.type });
  
        setUploadedImage(URL.createObjectURL(file));
        setUploadedFile(file);
  
        setData(prevData => ({
          ...prevData,
          profileImgUrl: imageUrl
        }));
      })
      .catch(error => {
        console.error("에러 발생", error);
      });
  };

  return (
    <ProfilePageStyle.Container>
      <ProfilePageStyle.Header>
        <Link to="/mypage/userInfo">
          <ProfilePageStyle.Button>뒤로가기</ProfilePageStyle.Button>
        </Link>
        <ProfilePageStyle.Title>
        </ProfilePageStyle.Title>
        <ProfilePageStyle.Button onClick={handleSave}>저장</ProfilePageStyle.Button>
      </ProfilePageStyle.Header>
      <ProfilePageStyle.Container>
      <ProfilePageStyle.ProfileImageContainer>
        <Col xs={6} md={4}>
          <Image id="profileImage" src={
             uploadedImage|| data.profileImgUrl || "/profile.jpg"
           } roundedCircle alt="프로필 이미지" />
        </Col>
      </ProfilePageStyle.ProfileImageContainer>
      <ProfilePageStyle.Temp>
          <span onClick={basicImage}>기본 이미지로 변경</span>
          <label htmlFor="fileInput">이미지 업로드</label>
          <ProfilePageStyle.ImageInput id="fileInput" type="file" accept="image/*" onChange={handleUpload} />
        </ProfilePageStyle.Temp>
    </ProfilePageStyle.Container>
      <ProfilePageStyle.Input
        type="text"
        placeholder="닉네임"
        value={data.nickname}
        onChange={(e) => setData({ ...data, nickname: e.target.value })} />
      <ProfilePageStyle.Textarea
        rows="4"
        placeholder="자기소개"
        value={data.aboutMe}
        onChange={(e) => setData({ ...data, aboutMe: e.target.value })} />
        <UserDataUpdateModal show={updateModal} onHide={() => setUpdateModal((prevModals) => ({ ...prevModals, updateModal: false }))} />
    </ProfilePageStyle.Container>
  );
};

export default ProfilePage;
