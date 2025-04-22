// RoomsList.js
import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import FilterBar from "./FilterBar";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Sample data
  const initialRooms = [
    {
      id: 1,
      name: "Deluxe Room",
      image:
        "https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg",
      floor: "1st Floor",
      price: 30000,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Mountain View Room",
      image:
        "https://www.vanorohotel.com/wp-content/uploads/2021/07/drz-vanoro_6737.jpg",
      floor: "4th Floor",
      price: 35000,
      rating: 4.8,
    },
    {
      id: 3,
      name: "VIP Room",
      image:
        "https://media.designcafe.com/wp-content/uploads/2023/07/05141750/aesthetic-room-decor.jpg",
      floor: "5th Floor",
      price: 40000,
      rating: 5,
    },
  ];

  useEffect(() => {
    setRooms(initialRooms);
    setFilteredRooms(initialRooms);
  }, []);

  const handleSearch = (term) => {
    const filtered = initialRooms.filter((room) =>
      room.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handlePriceFilter = (filter) => {
    let sortedRooms = [...rooms];
    if (filter === "lowToHigh") {
      sortedRooms = sortedRooms.sort((a, b) => a.price - b.price);
    } else if (filter === "highToLow") {
      sortedRooms = sortedRooms.sort((a, b) => b.price - a.price);
    }
    setFilteredRooms(sortedRooms);
  };

  const handleRatingFilter = (filter) => {
    const filtered = initialRooms.filter(
      (room) => room.rating >= parseFloat(filter)
    );
    setFilteredRooms(filtered);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Your Dream Stay</h1>
      <FilterBar
        onSearch={handleSearch}
        onPriceFilter={handlePriceFilter}
        onRatingFilter={handleRatingFilter}
      />
      <div style={styles.roomGrid}>
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  roomGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
};

export default RoomsList;
