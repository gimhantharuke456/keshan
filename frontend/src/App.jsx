import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ShiftSchedulePage from "./pages/ShiftSchedulePage";
import UserOrders from "./pages/UserOrders";
import UserWorkingHours from "./pages/UserWorkingHours";
import CustomerPage from "./pages/CustomerPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route element={<HomePage />} path="/" />
        <Route element={<AdminDashboard />} path="/admin-dashboard" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />

        {/* Working Hours Routes */}
        <Route element={<UserWorkingHours />} path="/working-hours" />
        <Route element={<div>Clock In Page</div>} path="/clock-in" />
        <Route element={<div>Clock Out Page</div>} path="/clock-out" />
        <Route element={<div>View Hours Page</div>} path="/view-hours" />

        {/* Order Management Routes */}
        <Route element={<div>Order Management Page</div>} path="/orders" />
        <Route element={<UserOrders />} path="/my-orders" />
        <Route element={<div>Order Details Page</div>} path="/orders/:id" />

        {/* Shift Management Routes */}
        <Route element={<ShiftSchedulePage />} path="/shifts" />
        <Route element={<div>My Shifts Page</div>} path="/my-shifts" />
        <Route
          element={<div>Request Shift Change Page</div>}
          path="/request-shift-change"
        />

        {/* Overtime Routes */}
        <Route element={<div>Overtime Tracking Page</div>} path="/overtime" />
        <Route
          element={<div>Request Overtime Page</div>}
          path="/request-overtime"
        />
        <Route
          element={<div>Overtime History Page</div>}
          path="/overtime-history"
        />

        {/* Profile Routes */}
        <Route element={<div>Profile Page</div>} path="/profile" />
        <Route element={<div>Edit Profile Page</div>} path="/edit-profile" />
        <Route element={<CustomerPage />} path="/customer" />

        {/* Fallback Route */}
        <Route element={<div>404 Not Found</div>} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
