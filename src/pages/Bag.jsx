import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BagSummary from "../components/bag/BagSummary.jsx";
import BagItem from "../components/bag/BagItem.jsx";
import { fetchCart } from "../store/slices/bagSlice.js";

export default function Bag() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id || 1; // Use 1 as default if user id is not available
  const bagState = useSelector((state) => state.bag);
  const items = bagState?.items || [];
  const status = bagState?.status || 'idle';
  const error = bagState?.error || null;

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {items.map((item) => (
            <BagItem key={item.id} item={item.product} cartProductId={item.id} quantity={item.quantity} />
          ))}
        </div>
        <BagSummary />
      </div>
    </main>
  );
}