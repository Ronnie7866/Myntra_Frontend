import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStatusActions } from "../../store/slices/fetchStatusSlice.js";
import { fetchHomeItems, addInitialItems } from "../../store/slices/itemsSlice.js";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const itemsStatus = useSelector((store) => store.items.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone || itemsStatus !== 'idle') return;

    dispatch(fetchStatusActions.markFetchingStarted());
    dispatch(fetchHomeItems())
      .unwrap()
      .then((products) => {
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(addInitialItems(products));
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        dispatch(fetchStatusActions.markFetchingFailed());
      });

  }, [fetchStatus, itemsStatus, dispatch]);

  return <></>;
};

export default FetchItems;