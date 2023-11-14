import React from "react";
import { Link } from "react-router-dom";
import "./DiaryHome.css";

//마크다운 에디터
import MDEditor from "@uiw/react-md-editor";

function DiaryList({ listItemData }) {
  if (listItemData.length === 0) {
    return <h5>작성된 글이 없습니다.</h5>;
  } else {
    return listItemData.map((diaryListItem) => (
      // map 함수로 데이터 출력
      <Link to={`/DiaryView`} state={{ postId: diaryListItem._id }}>
        <li className="diary-list-item" key={diaryListItem.idx}>
          <h4 className="diary-list-title">{diaryListItem.title}</h4>
          <div data-color-mode="light">
            <div className="wmde-markdown-var"></div>
            <MDEditor.Markdown
              className="diary-list-content"
              source={diaryListItem.content}
            />
          </div>
        </li>
      </Link>
    ));
  }
}

export default DiaryList;
