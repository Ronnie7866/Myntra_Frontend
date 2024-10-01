import { useSelector } from "react-redux";

export default function BagSummary() {
  // This should return an array of bag item IDs, assuming it's stored as an array in the bag slice.
  const bagItemIds = useSelector((state) => state.bag);

  // This should return an array of item objects containing the necessary fields (id, price, discountedPercentage, etc.)
  const items = useSelector((state) => state.items);

  // Filter items to find those in the bag
  const finalItems = items.filter((item) => bagItemIds.includes(item.id));
  console.log(finalItems);

  const CONVENIENCE_FEES = 99;
  let totalItem = bagItemIds.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  finalItems.forEach((bagItem) => {
    totalMRP += bagItem.price;

    // Calculate the discounted amount
    const discountAmount = (bagItem.price * (bagItem.discountedPercentage || 0)) / 100;
    totalDiscount += discountAmount;

    console.log("Discount for item", bagItem.id, "is", discountAmount);
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  return (
      <div className="bag-summary">
        <div className="bag-details-container">
          <div className="price-header">PRICE DETAILS ({totalItem} Items)</div>
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
