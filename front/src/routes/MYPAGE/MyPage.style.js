import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
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

const LowerContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 30px auto;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px ridge gray;
  width: 100%;
  height: 120px;

  #profileImage {
    margin-left: 30px;
    width: 80px;
    height: 80px;
  }
  #userName {
    margin-left: 30px;
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
  disply: flex;
  border: 1px solid black;
  width: 100%;
`;
const LowerLine = styled.div`
  disply: flex;
  border: 1px solid black;
  width: 100%;
`;

const ListWrapper = styled.div`
  display: flex;
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
  width: 100%;
  border-bottom: 2px solid black;
`;

export const MyPageStyle = {
  UpperContainer,
  LowerContainer,
  ProfileWrapper,
  MainContainer,
  UpperLine,
  LowerLine,
  ListWrapper,
  UnderLine,
  SplitLine,
};
