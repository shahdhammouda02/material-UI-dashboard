import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDelivery,
  fetchDeliveries,
} from "../../../Store/Slices/deliverySlice/deliveryAction";

function UpdateShipping({ initialRows, ShippingId, onUpdate }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.deliveries);
  const [shipping, setShipping] = useState({
    id: ShippingId || null,
    user_id: "",
    product_id: "",
    shipping_type: "",
    cost: "",
    address: "",
  });

  useEffect(() => {
    if (!ShippingId) {
      console.error("Invalid ShippingId");
      return;
    }

    // Search for the selected shipping
    const existingShipping = initialRows.find((row) => row.id === ShippingId);
    console.log("Existing Shipping:", existingShipping);

    if (existingShipping) {
      setShipping({
        id: existingShipping.id,
        user_id: existingShipping.user_id || "",
        product_id: existingShipping.product_id || "",
        shipping_type: existingShipping.shipping_type || "",
        cost: existingShipping.cost || "",
        address: existingShipping.address || "",
      });
    } else {
      console.error(`Shipping with ID ${ShippingId} not found`);
    }
  }, [initialRows, ShippingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipping((prevShipping) => ({
      ...prevShipping,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !shipping.user_id ||
      !shipping.product_id ||
      !shipping.shipping_type ||
      !shipping.cost ||
      !shipping.address
    ) {
      return;
    }

    console.log("Submitting shipping data:", shipping);

    dispatch(updateDelivery({ id: shipping.id, updatedData: shipping })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        onUpdate(shipping); // Update data in UI
        dispatch(fetchDeliveries()); // Reload data after update
      }
    });
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        تعديل معلومات التوصيل
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput label="رقم الشحنة" name="id" value={shipping.id} disabled fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="رقم المستخدم"
            name="user_id"
            value={shipping.user_id}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="رقم المنتج"
            name="product_id"
            value={shipping.product_id}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="طريقة الشحن"
            name="shipping_type"
            value={shipping.shipping_type}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="السعر"
            name="cost"
            value={shipping.cost}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="العنوان"
            name="address"
            value={shipping.address}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        {error && (
          <MDBox mb={2}>
            <MDTypography color="error">{error}</MDTypography>
          </MDBox>
        )}
        <MDBox display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="success" type="submit" disabled={loading}>
            {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
          </MDButton>
          <MDButton variant="gradient" color="error" onClick={() => onUpdate(null)}>
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
}

UpdateShipping.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user_id: PropTypes.string.isRequired,
      product_id: PropTypes.string.isRequired,
      shipping_type: PropTypes.string.isRequired,
      cost: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
  ShippingId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateShipping;
