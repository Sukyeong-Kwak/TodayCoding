import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";

function CategoryList({ data, clickedDate, todoChanger }) {
  // data를 로컬 상태로 관리
  const [categoryData, setCategoryData] = useState(data);

  // data의 변경을 감지하여 categoryData를 업데이트
  useEffect(() => {
    setCategoryData(data);
  }, [data]);

  console.log("data", data);
  return (
    <div>
      {categoryData.map((category, index) => (
        <CategoryItem
          key={category.categoryId}
          categroyId={category.categoryId}
          name={category.categoryName}
          todos={category.todos}
          clickedDate={clickedDate}
          todoChanger={todoChanger}
        />
      ))}
    </div>
  );
}

export default CategoryList;
