import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function App({ placeId, avgrating }) {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    avgrating(placeId._id)
    fetchdata(user, placeId)

  }, [rating]);

  const fetchdata = async (user,placeId) => {
    if(user){
      
      const res = await axios.post("http://localhost:4000/rating/userrated", {
      user: user.id,
      bookedPlaces: placeId._id,
    });
    if(res.data){
      setRating(res.data.rating)

    }
    }
    
  }

  const handleRating = async (currentRating) => {
    setRating(currentRating);
    await axios
      .post("http://localhost:4000/rating/userrating", {
        rating: currentRating,
        user: user.id,
        bookedPlaces: placeId._id,
      })
      .then((res) => {
        // window.location.reload()
        console.log(res.data)
        toast.success("Rated Successfully");

      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => handleRating(currentRating)}
              className={`hidden`}
              disabled={rating === null}
            />
            <span
              className="cursor-pointer mr-[5px] text-3xl"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
}
