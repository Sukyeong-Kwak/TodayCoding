import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import "./CalendarFunc.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiMehBlank } from "react-icons/bi";
import { apiInstance } from "../../utils/api";

function CalendarFunc({ sendDataToParent, date }) {
  const dateString = date.toString();
  const formattedDate =
    dateString.slice(0, 4) +
    "-" +
    dateString.slice(4, 6) +
    "-" +
    dateString.slice(6, 8);
  const [selectedEmoji, setSelectedEmoji] = useState(); //선택한 이모지를 저장할 상태
  const [showPicker, setShowPicker] = useState(false);
  const endOfMonth = moment(date).endOf("month").format("YYYYMMDD"); //클릭한 날짜 달의 마지막날짜
  const startOfMonth = moment(date).startOf("month").format("YYYYMMDD"); //매월 1일
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(); // patch로 받아온 데이터(선택한 날짜에 저장된 이모지)
  const [data, setData] = useState([]); // get으로 받아온 데이터(달력 전체의 날짜와 이모지 배열)

  //이모지 클릭하면 나타나게 하는 함수
  const onEmojiClick = (emojiObject, e) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowPicker(false);
  };
  //선택된 이모지, 선택이 아무것도 안되었으면 <BiMehBlank />
  const selectedEmojiSave = selectedEmoji ? selectedEmoji : <BiMehBlank />;
  //클라이언트가 클릭한 날짜 clickedDate에 저장
  const saveDate = (date) => {
    const onClickDayClickedDate = moment(date).format("YYYYMMDD");
    // 클릭한 날짜를 상위 컴포넌트로 전달
    sendDataToParent(onClickDayClickedDate);
  };

  // GET 요청을 보내고 데이터를 받아옴
  useEffect(() => {
    //기존에 저장된 이모지 get요청
    apiInstance
      .get("/api/days/imogies", {
        params: {
          startDate: startOfMonth,
          endDate: endOfMonth,
        },
      })
      .then((response) => {
        setData(response.data); // get 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중에 오류가 발생했습니다.:", error);
      });
  }, [fetchedData]); //sendDataToServer함수 호출을 통해 변경된 fetchedData 값이 변하면 실행

  // 클라이언트에서 선택한 날짜와 이모지를 서버로 전송
  const sendDataToServer = async (selectedEmoji) => {
    setLoading(true);
    setError(null);
    if (date && selectedEmoji) {
      // patch 요청 전송
      const patch = {
        date: date,
        emoji: selectedEmoji,
      };
      try {
        const response = await apiInstance.patch("/api/days", patch, {});

        if (response.status >= 200 && response.status < 300) {
          // 서버 응답이 성공인 경우
          setFetchedData(response.data); // 받아온 데이터를 상태에 업데이트
        } else {
          // 서버 응답이 실패인 경우
          setError("Failed to fetch data");
        }
        console.log(fetchedData); //응답 데이터를 설정
      } catch (error) {
        // 예외 처리
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
      console.error(error);
    }
  };
  // sendDataToServer()를 원하는 시점에 호출하여 데이터를 받아오기.
  useEffect(() => {
    // date
    sendDataToServer(selectedEmoji);
  }, [selectedEmoji]); // 이모지를 새로 선택할 때 마다 호출.

  // 각 날짜별로 이모지 추가
  const addEmoji = ({ date }) => {
    const EmojiDateAdded = []; //추가된 이모지 날짜
    for (let i = 0; i < data.length; i++) {
      if (data[i].date === moment(date).format("YYYYMMDD") && data[i].emoji) {
        EmojiDateAdded.push(
          <div key={`${data[i].date}-${i}`} className="savedEmoji">
            {data[i].emoji}
          </div>
        );
      }
    }

    return <div>{EmojiDateAdded}</div>;
  };
  console.log(data.emoji);
  return (
    <div className="wrap" style={{ float: "left" }}>
      <div className="EmojiSelection">
        <span style={{ fontSize: 50 }}>{selectedEmojiSave}</span>
        <button
          className="openEmojiPicker"
          onClick={() => setShowPicker(!showPicker)}
        >
          {" "}
          +{" "}
        </button>
      </div>
      {showPicker && (
        <div className="EmojiPickerContainer">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <Calendar
        onClickDay={saveDate}
        // todo: date에 "-"" 추가하기
        value={formattedDate}
        locale="en"
        formatDay={(locale, date) => moment(date).format("D")}
        tileContent={addEmoji}
      />
    </div>
  );
}

export default CalendarFunc;
