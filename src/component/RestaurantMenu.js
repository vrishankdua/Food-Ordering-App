import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { menuApi } from "../utils/constants";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState([]);
  const [itemCards, setitemCards] = useState([]);
  const { resId } = useParams();
  
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(menuApi + resId);
    const res = await data.json();

    setitemCards(
      res.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
        .itemCards
    );
    setResInfo(res);
  };

  if (itemCards.length === 0) return <Shimmer />;

  const { name, cuisines, avgRating } = resInfo.data.cards[2].card.card.info;

  const categories =
    resInfo.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  

  return (
    <div className="restaurant">
      <div className="res-details">
        <h2>{name}</h2>
        <h2>{cuisines.join(",")}</h2>
        <h3>{avgRating}</h3>
      </div>

        <div>
           {categories.map((c)=><RestaurantCategory key={c.card.card.itemCards.title} resCategory={c}/>)}
        </div>
      
    </div>
  );
};

export default RestaurantMenu;
