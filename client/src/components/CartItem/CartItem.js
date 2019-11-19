import React, { Component } from "react";

import { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../../store/actions/user';
import './CartItem.css';
import { connect } from "react-redux";

class CartItem extends Component {

  decreaseQuantity = itemToDecrease => {
    this.props.decreaseItemQuantity(itemToDecrease);
  }
  increaseQuantity = itemToIncrease => {
    this.props.increaseItemQuantity(itemToIncrease);
  }
  removeItem = itemToRemove => {
    this.props.removeItemFromCart(itemToRemove);

  }

  render() {
    const { item } = this.props;
   
    let image = undefined;

    if(item.image) {
      image = item.image;
    } else {
      image = 
      "https://1740009751.rsc.cdn77.org/sites/balkanbaba/docs/al/image_1430320148_32.png";

    }

    return (
      <div className='cartItem'>
        <div className='img__container'>
          <img src={image} alt="" />
        </div>
        <div className='productName'>{item.nameOfProduct}</div>
        <div>
          <div className='flex'>
           <div onClick={() => this.decreaseQuantity(item)} > <i className="fas fa-chevron-left link"></i></div>
           <p className='quantity'>Quantity: {item.quantity}</p>
           <div onClick={() => this.increaseQuantity(item)} > <i className="fas fa-chevron-right link"></i></div>
          </div>
        </div>
        <div><span className='price'>Price: {item.price}</span></div>
        <div onClick={() => this.removeItem(item)} >
          <i className="fas fa-trash-alt link"></i>
        </div>
      </div>
    );
  }
}

export default connect(null, { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart })(CartItem);

