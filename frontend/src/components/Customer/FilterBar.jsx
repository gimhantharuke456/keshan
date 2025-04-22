import React, { useState } from "react";
import { Input, Select, Space } from "antd";

const FilterBar = ({ onSearch, onPriceFilter, onRatingFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handlePriceChange = (value) => {
    setPriceFilter(value);
    onPriceFilter(value);
  };

  const handleRatingChange = (value) => {
    setRatingFilter(value);
    onRatingFilter(value);
  };

  return (
    <Space direction="horizontal" style={{ marginBottom: "20px" }}>
      <Input
        placeholder="Search by Hotel Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onPressEnter={handleSearch}
        style={{ width: "300px" }}
      />
      <Select
        placeholder="Filter by Price"
        value={priceFilter}
        onChange={handlePriceChange}
        style={{ width: "200px" }}
      >
        <Select.Option value="lowToHigh">Low to High</Select.Option>
        <Select.Option value="highToLow">High to Low</Select.Option>
      </Select>
      <Select
        placeholder="Filter by Rating"
        value={ratingFilter}
        onChange={handleRatingChange}
        style={{ width: "200px" }}
      >
        <Select.Option value="4">4 Stars and Above</Select.Option>
        <Select.Option value="3">3 Stars and Above</Select.Option>
        <Select.Option value="2">2 Stars and Above</Select.Option>
      </Select>
    </Space>
  );
};

export default FilterBar;
