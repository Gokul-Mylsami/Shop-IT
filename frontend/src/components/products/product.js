import React from "react";
import { Link } from "react-router-dom";

const Product = ({ pr, col }) => {
  return (
    <div key={pr._id} className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={pr.images[0].url}
          alt="product"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${pr._id}`}>{pr.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(pr.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({pr.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${pr.price}</p>
          <Link
            to={`/product/${pr._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
