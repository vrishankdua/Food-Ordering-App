import { CDN_URL } from "../utils/constants";
const RestaurantCard=({resData})=>{

    const{name,cuisines,cloudinaryImageId,avgRating}=resData.info;
    console.log(name);
    return (
      <div className='res-card'>
         
        <img id="res-logo" src={CDN_URL+ cloudinaryImageId}/>      
        <h3>{name}</h3>
        <p>{cuisines.join(' , ')}</p>
        <p>{avgRating} stars</p>
        

      </div>
    )
  }

  export const withPromotedLabel=(RestaurantCard)=>{
       return (props)=>{
          return(
            <div>
              <label>Non veg</label>
              <RestaurantCard {...props}/>
            </div>
          ) 
       }
  }

  export default RestaurantCard;