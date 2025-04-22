import React from "react";
import RoomsList from "../components/Customer/RoomsList";

const CustomerPage = () => {
  return (
    <div className="App">
      <div className="glass-effect"></div>

      {/* Main content */}
      <div className="content">
        <RoomsList />
      </div>
    </div>
  );
};

export default CustomerPage;
