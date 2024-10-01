import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStatusActions } from "../store/slices/fetchStatusSlice.js";
import { itemsAction } from "../store/slices/itemsSlice.js";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());
    fetch("http://localhost:8080/api/products", { signal })
      .then((res) => res.json())
      .then((products) => {
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(itemsAction.addInitialItems(products)); // Assuming products is the array you want to store
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("");
        } else {
          dispatch(fetchStatusActions.markFetchingFailed());
        }
      });

    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;
