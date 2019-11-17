import React, { Component } from "react";
import Moment from 'react-moment';

import "./ProductCard.css";

class ProductCard extends Component {
  render() {
    const product = this.props.product;
    console.log(product);

    const randomNumber = () => {
      return Math.floor(Math.random() * 3);
    };

    let image =
      "https://1740009751.rsc.cdn77.org/sites/balkanbaba/docs/al/image_1430320148_32.png";

    let classNames = [
      "card__side",
      "card__side__back",
      `card__side__back__${randomNumber()}`
    ];
    classNames = classNames.join(" ");

    return (
      <div className="col-1-of-3">
        <div className="card">
          <div className="card__side card__side__front">
            <div
              className="card__picture"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "14.375rem"
              }}
            >
              &nbsp;
            </div>
            <div className="card__heading">
              <span
                style={{
                  fontSize: "1.1rem",
                  color: "rgb(197, 187, 187)"
                }}
              >
                Name:
              </span>
              {product.name}
            </div>
            <div className="card__detail">
              <ul>
                <li>Small Price: {product.smallPrice}</li>
                <li >Big Price: {product.bigPrice}</li>
                <li>Medium Price: {product.medPrice}</li>
                <li>Quantity: {product.quantity}</li>
                <li>Date: <Moment format='dd-mm-yyyy'> {product.date}</Moment></li>
              </ul>
            </div>
          </div>
          <div className={classNames}>back</div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
