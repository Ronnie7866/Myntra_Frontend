import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeItems } from '../store/slices/itemsSlice';
import HomeItem from '../components/home/HomeItem.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const itemsState = useSelector(state => state.items);

  useEffect(() => {
    if (itemsState.status === 'idle') {
      dispatch(fetchHomeItems());
    }
  }, [itemsState.status, dispatch]);

  if (itemsState.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (itemsState.status === 'failed') {
    return <div>Error: {itemsState.error}</div>;
  }

  return (
    <div>
      {itemsState.items && itemsState.items.map(item => (
        <HomeItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Home;