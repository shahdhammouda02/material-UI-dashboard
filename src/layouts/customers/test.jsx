// Customers.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCustomers, loadCustomerOrders } from "../../Store/Slices/customerSlice/customerAction";

const Customers = () => {
  const dispatch = useDispatch();
  const { customers, orders, loading, error } = useSelector((state) => state.customers);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  const toggleRow = (customerId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [customerId]: !prev[customerId],
    }));
    if (!orders[customerId]) {
      dispatch(loadCustomerOrders(customerId));
    }
  };

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p>خطأ: {error}</p>;

  return (
    <div>
      <h1>قائمة العملاء</h1>
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الإيميل</th>
            <th>الطلبات</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <React.Fragment key={customer.id}>
              <tr onClick={() => toggleRow(customer.id)}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{expandedRows[customer.id] ? "إخفاء" : "عرض الطلبات"}</td>
              </tr>
              {expandedRows[customer.id] && orders[customer.id] && (
                <tr>
                  <td colSpan="3">
                    <ul>
                      {orders[customer.id].map((order) => (
                        <li key={order.id}>
                          {order.name} - {order.total} $
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
