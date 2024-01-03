import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReviewForm from "../reviewForm/ReviewForm";
import api from "../../api/axiosConfig";
import React from "react";
import { useState } from "react";

const Reviews = () => {
  const revText = useRef();
  const params = useParams();
  const movieId = params.movieId;

  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  let [forceRerender, setForceRerender] = useState("5");

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      setMovie(response.data);
      const movieReviewIds = movie?.reviewIds || [];

      setReviews(movieReviewIds);
    } catch (err) {
      console.log(err);
    }
    console.log("hello");
    if (forceRerender) {
      setForceRerender(--forceRerender);
    }

    console.log(movie);
    console.log(reviews);
  };

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;
    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const newReview = response.data;

      setReviews((prevReviews) => [...prevReviews, newReview]);
      rev.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId, forceRerender]);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={movie?.poster} />
        </Col>
        <Col>
          <ReviewForm
            handleSubmit={addReview}
            revText={revText}
            labelText="Enter Review"
          />
          {reviews?.map((r) => {
            return (
              <React.Fragment key={`${r.id}-${r.body}`}>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
