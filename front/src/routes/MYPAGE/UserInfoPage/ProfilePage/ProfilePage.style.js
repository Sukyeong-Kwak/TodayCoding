import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
  flex-grow: 2;
  font-family: fontMedium;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ProfileImageContainer = styled.div`
  
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: white;
  left: 15px;
  margin-bottom: 30px;

  #profileImage {
    width: 130px;
    height: 130px;
  }


  `;

  const ImageInput = styled.input`
  margin-top: 20px;
  font-size: 12px;
   display: none;
  `

const Input = styled.input`
  width: 40%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 40%;
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  resize: vertical;
`;

const Temp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span, label {
    display: flex; 
    cursor: pointer;
    margin-top: 20px;
    justify-content: center;
    border: 1px groove #E0E0E0;
    border-radius: 16px;
    background: #E0E0E0;
    padding: 0 10px;
  }

  span {
    margin-top: 0px;
  }
`

export const ProfilePageStyle = {
    Container,
    Header,
    Title,
    Button,
    ProfileImageContainer,
    Input,
    Textarea,
    ImageInput,
    Temp
}