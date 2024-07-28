import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { withPromotedLabel } from "./RestaurantCard";
const Body = () => {
  const Api =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5312211&lng=77.1384496&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

    
    
    const [listOfRestaurants, setlistOfRestaurants] = useState([]);
    const [filteredRestaurants, setfilteredRestaurants] = useState([]);
    const [searchInput,setSearchInput]=useState("")
    
   const RestaurantCardPromoted=withPromotedLabel(RestaurantCard);

    const fetchData = async () => {
      const res = await fetch(Api);
      const newdata = await res.json();
      setlistOfRestaurants(newdata.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
      setfilteredRestaurants(newdata.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    };
  
  useEffect(() => {
    console.log("Body useeffect");
    fetchData();
  },[]);
  
  if(listOfRestaurants.length===0)
  return(
    //  <FaSpinner className="spinner" />  Incase you want to see loading icon uncomment
     <Shimmer/>
  )

  const handleChange=(e)=>{
    setSearchInput(e.target.value)
  }
  const filterSearch=()=>{
    const searchRestaurant=listOfRestaurants.filter((res)=>res.info.name.toLowerCase().includes(searchInput.toLowerCase()))
    setfilteredRestaurants(searchRestaurant);
    setSearchInput("");
  }
  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input onChange={handleChange} type="text" className="search-box" value={searchInput}/>
            <button onClick={filterSearch}>search</button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter((ele) => {
              return ele.info.avgRating >= 4.1;
            });

            setfilteredRestaurants(filteredList);
            
          }}
        >
          Top rated Restaurants
        </button>
      </div>
      <div className="res-container">
  {filteredRestaurants.map((ele) => (
    <Link key={ele.info.id} to={"/restaurants/" + ele.info.id}>
      {ele.info.veg ? (
        <RestaurantCard resData={ele} />
      ) : (
        <RestaurantCardPromoted resData={ele} />
      )}
    </Link>
  ))}
</div>

    </div>
  );
};

export default Body;
