import { useState } from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const RestaurantCategory = ({ resCategory }) => {
  const { title } = resCategory.card.card;
  const itemCards = resCategory.card.card.itemCards;
   
  const [showItems, setShowItems] = useState(false);
  const handleChange = () => {
    setShowItems(!showItems);
  };

  const dispatch=useDispatch()
  
  const handleAddItem=(item)=>{
    dispatch(addItem(item))
  }
  return (
    <div className="res-menu-container">
      <div className="res-category" onClick={handleChange}>
        <div className="res-title">
          <h2>
            {title} ({itemCards.length})
          </h2>
        </div>
        <div>
          <span className="down">⬇️</span>
        </div>
      </div>
      <div className="res-menu">
        {showItems &&
          itemCards.map((item) => {
            return (
              <div className="menu" key={item.card.info.id}>
              
                <img
                  className="items-dishImage"
                  src={CDN_URL + item.card.info.imageId}
                  alt={item.card.info.name}
                />
              
              
                <div>
                  <h3>{item.card.info.name}</h3>
                  <p>{item.card.info.description}</p>
                  <button className="btn-menu-add" onClick={()=>{handleAddItem(item)}}>Add</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};


export default RestaurantCategory;

