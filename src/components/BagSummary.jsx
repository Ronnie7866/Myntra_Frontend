import React from "react";
import { useSelector } from "react-redux";

function BagSummary() {
  const bagItemIds = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);

  const finalItems = items.filter((item) => bagItemIds.includes(item.id));

  let totalMRP = 0;
  let totalDiscount = 0;
  const CONVENIENCE_FEES = 99;

  finalItems.forEach((item) => {
    totalMRP += item.price;
    const discountAmount = (item.price * item.discountedPercentage) / 100;
    totalDiscount += discountAmount;
  });

  const finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({bagItemIds.length} Items)</div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP.toFixed(2)}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{totalDiscount.toFixed(2)}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹{CONVENIENCE_FEES}</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment.toFixed(2)}</span>
        </div>
      </div>
      <button className="btn-place-order">
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
}

export default BagSummary;
