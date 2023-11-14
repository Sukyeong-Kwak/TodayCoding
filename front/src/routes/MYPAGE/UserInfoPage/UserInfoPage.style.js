import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
  
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Title = styled.h3`
  text-align: center;
  flex-grow: 2;
  font-family: fontMedium;
`;

const Spacer = styled.div`
  background-color: transparent;
  width: 55.3px;
`;

const UpperContainer = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  #logoImage {
    width: 150px;
    height: 130px;
  }

  span {
    margin-top: 10px;
    font-weight: 600;
  }
`;

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 50%;
`;

const UpperLine = styled.div`
  width: 100%;
  margin-top: 30px;
  height: 1px;
  background-color: black;
  
`;


const ListWrapper = styled.div`
  height: 180px;
  
  ul {
    line-height: 3.5;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0 auto;
    width: 100%;
  }
  li {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    &:hover {
      text-decoration: none; 
  }
`;

const UnderLine = styled.div`
  border-bottom: 1px solid #d5d5d5;
  width: 100%;
`;

const SplitLine = styled.div`
  height: 1px;
  width: 100%;
  border-top: 1px solid gray;
`
const Withdraw = styled.div`
text-decoration: none;
color: red;
cursor: pointer;
font-weight: 600;
&:hover {
  text-decoration: none;
`

export const UserInfoPageStyle = {
    Container,
    Header,
    Button,
    Title,
    Spacer,
    UpperContainer,
    MainContainer,
    UpperLine,
    ListWrapper,
    UnderLine,
    SplitLine,
    Withdraw
}

