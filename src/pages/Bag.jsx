import BagSummary from "../components/BagSummary.jsx";
import BagItem from "../components/BagItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import axiosInstance from "../utils/api.js";

export default function Bag() {
  const dispatch = useDispatch();
  const bagItems = useSelector((store) => store.bag);
  const items = useSelector((store) => store.items);
  const finalItems = items.filter((item) => bagItems.includes(item.id));
  const user = useSelector((state) => state.auth);


  useEffect(() => {
    async function fetchCardItems() {
      try {
        const response = await axiosInstance.get(`/api/cart/getCartByUserId/1`);

        const data = response.data;

        console.log("DATA", data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    fetchCardItems();
  }, [dispatch]);


  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {finalItems.map((item) => (
            <BagItem key={item.id} item={item}/>
          ))}
        </div>
        <BagSummary/>
      </div>
    </main>
  );
};
