import HomeCarousel from "../components/HomeCarousel.jsx";
import HomeItem from "../components/HomeItem.jsx";
import { useSelector } from "react-redux";
import styles from "../components/HomeCarousel.module.css";

export default function Home() {
  const items = useSelector((store) => store.items);

  return (
    <main>
      <div className={styles.carouselContainer}>
        <HomeCarousel />
      </div>
      <div className="items-container">
        {items.map((item) => (
          <HomeItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
