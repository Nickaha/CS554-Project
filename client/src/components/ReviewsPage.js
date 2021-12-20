import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../App.css";
import { AuthContext } from "../firebase/Auth";

function ReviewsPage() {
  const [reviewsData, setReviewsData] = useState(undefined);
  let review_card = null;
  const [flag, setFlag] = useState(0);
  const { currentUser } = useContext(AuthContext);

  const submit_review = async (event) => {
    event.preventDefault();

    if (currentUser === null) {
      alert("Error:Please login first!");
    } else {
      let { textarea } = event.target.elements;

      try {
        var myDate = new Date();
        let time_str =
          myDate.getMonth() +
          1 +
          "/" +
          myDate.getDate() +
          "/" +
          myDate.getFullYear() +
          "  " +
          myDate.getHours() +
          ":" +
          myDate.getMinutes();
        reviewsData.push({
          name: currentUser.email,
          review: textarea.value,
          date: time_str,
        });
        setFlag(flag + 1);
        console.log(flag);
        setReviewsData(reviewsData);
        await axios.post("http://localhost:3001/reviews/post", {
          name: currentUser.email,
          review: textarea.value,
          date: time_str,
        });
        //window.location.reload();
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:3001/reviews`);
        setReviewsData(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  review_card =
    reviewsData &&
    reviewsData.map((reviewdata, index) => {
      return (
        <div key={index} className="w75">
          <div className="card" style={{ width: "20rem" }}>
            <div>
              <div className="profile">
                <img
                  src="/imgs/default_profile.png"
                  alt="default"
                  className="rounded-circle"
                  height="50"
                  width="50"
                ></img>
              </div>
              <div className="profile_name">
                <p>{reviewdata.name}</p>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text">{reviewdata.review}</p>
              <p className="card-text">{reviewdata.date}</p>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div>
      <form onSubmit={submit_review}>
        <div className="form-group">
          <label className="w75">Post your review here!</label>
          <br />
          <label className="w75">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="textarea"
            ></textarea>
          </label>
        </div>
        <button type="submit" className="btn btn-primary w75">
          Submit
        </button>
      </form>
      <br />
      <br />

      {review_card}
    </div>
  );
}

export default ReviewsPage;
