import BagSummary from "../components/BagSummary.jsx";
import BagItem from "../components/BagItem.jsx";
import { useSelector } from "react-redux";

export default function Bag() {
  const bagItems = useSelector((store) => store.bag);
  const items = useSelector((store) => store.items);
  const finalItems = items.filter((item) => bagItems.includes(String(item.id)));

  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {finalItems.map((item) => (
            <BagItem key={item.id} item={item} />
          ))}
        </div>
        <BagSummary />
      </div>
    </main>
  );
}
