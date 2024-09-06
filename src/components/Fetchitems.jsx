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
    fetch("http://localhost:8080/products", { signal })
      .then((res) => res.json())
      .then((products) => {
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(itemsAction.addInitialItems(products)); // Assuming products is the array you want to store
        console.log(products);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
        } else {
          console.error("Fetch error:", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchStatusActions } from "../store/slices/fetchStatusSlice.js";
// import { itemsAction } from "../store/slices/itemsSlice.js";
//
// const FetchItems = () => {
//   const fetchStatus = useSelector((store) => store.fetchStatus);
//   const dispatch = useDispatch();
//   const [backendUnavailable, setBackendUnavailable] = useState(false);
//
//   useEffect(() => {
//     if (fetchStatus.fetchDone) return;
//
//     // If backend is unavailable, use mock data
//     if (backendUnavailable) {
//       const mockProducts = [
//         { id: 1, name: "Mock Product 1", price: 100 },
//         { id: 2, name: "Mock Product 2", price: 150 },
//       ];
//
//       dispatch(fetchStatusActions.markFetchingStarted());
//       dispatch(itemsAction.addInitialItems(mockProducts));
//       dispatch(fetchStatusActions.markFetchDone());
//       dispatch(fetchStatusActions.markFetchingFinished());
//       console.log("Using mock data:", mockProducts);
//       return;
//     }
//
//     // Attempt to fetch from the backend
//     const controller = new AbortController();
//     const signal = controller.signal;
//
//     dispatch(fetchStatusActions.markFetchingStarted());
//     fetch("http://localhost:8080/products", { signal })
//         .then((res) => res.json())
//         .then((products) => {
//           dispatch(fetchStatusActions.markFetchDone());
//           dispatch(fetchStatusActions.markFetchingFinished());
//           dispatch(itemsAction.addInitialItems(products));
//           console.log(products);
//         })
//         .catch((error) => {
//           if (error.name !== "AbortError") {
//             console.error("Fetch error:", error);
//             setBackendUnavailable(true); // If backend fails, use mock data
//           }
//         });
//
//     // Cleanup on component unmount
//     return () => {
//       controller.abort();
//     };
//   }, [fetchStatus, backendUnavailable, dispatch]);
//
//   return <></>;
// };
//
// export default FetchItems;
