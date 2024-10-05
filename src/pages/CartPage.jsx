import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import axiosInstance from "../utils/api.js";
import BagItem from "../components/BagItem.jsx";
import {useParams} from "react-router-dom";
import BagSummary from "../components/BagSummary.jsx";

function CartPage() {
  const dispatch = useDispatch();
  const bagItems = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  const finalItems = items.filter((item) => bagItems.includes(item.id));
  const {userId} = useParams();
  console.log("UserId", userId);
  console.log('ITEMS', items)

  useEffect(() => {
    async function fetchCardItems() {
      try {
        const response = await axiosInstance.get(`/api/cart/getCartByUserId/${userId}`);

        const data = response.data;

        console.log("DATA", data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    fetchCardItems();
  }, [dispatch, userId])
  return (<div>
    <h1>Your Shopping Cart</h1>
    <div>
      {finalItems.map((item) => (<BagItem key={item.id} item={item}/>))}
    </div>
    <BagSummary/>
  </div>);
}

export default CartPage;