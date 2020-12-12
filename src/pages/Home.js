import React from "react";
import RecordListPage from "./RecordListPage";


function Home() {
  return (
    <div>
      <h1 className = "indeepTitle">Indeep Records</h1>
      {/* get records list  */}
      <RecordListPage />
    </div>
  );
}

export default Home;
