const OrderAssignment = require("../models/OrderAssignment");

const createOrderAssignment = async (orderAssignmentData) => {
  const orderAssignment = new OrderAssignment(orderAssignmentData);
  return await orderAssignment.save();
};

const getAllOrderAssignments = async () => {
  return await OrderAssignment.find().populate("user", "name email");
};

const getOrderAssignmentById = async (id) => {
  return await OrderAssignment.findById(id).populate("user", "name email");
};

const updateOrderAssignment = async (id, updateData) => {
  return await OrderAssignment.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate("user", "name email");
};

const deleteOrderAssignment = async (id) => {
  return await OrderAssignment.findByIdAndDelete(id);
};

module.exports = {
  createOrderAssignment,
  getAllOrderAssignments,
  getOrderAssignmentById,
  updateOrderAssignment,
  deleteOrderAssignment,
};
