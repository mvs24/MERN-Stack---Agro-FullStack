import React, { Component } from "react";
import { connect } from "react-redux";

import { getTodayProducts } from "../../store/actions/product";
import Spinner from "../Spinner/Spinner";
import TodayProductCard from "../TodayProductCard/TodayProductCard";
import './TodayProducts.css';

class TodayProducts extends Component {
  componentDidMount() {
    this.props.getTodayProducts(Date.now());
  }
  render() {
    const { todayProducts } = this.props.product;
    if (todayProducts === null) return <Spinner />;
    if (todayProducts.length === 0) return <div>No products found today</div>;
    let minHeight = Math.ceil(todayProducts.length / 3) * 100;

    return (
      <div className='today__products' >
        <span>Today's Products</span>
        <div className='grid2'>
          {todayProducts.map(product => (
            <TodayProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getTodayProducts })(TodayProducts);
