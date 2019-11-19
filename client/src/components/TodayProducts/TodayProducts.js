import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getTodayProducts,
  loadMoreTodayProducts,
  loadLessTodayProducts,
  getNrOfTodayProducts
} from "../../store/actions/product";
import Spinner from "../Spinner/Spinner";
import TodayProductCard from "../TodayProductCard/TodayProductCard";
import "./TodayProducts.css";

class TodayProducts extends Component {
  state = {
    page: 2
  };

  componentDidMount() {
    this.props.getTodayProducts(this.state.page);
    this.props.getNrOfTodayProducts();
  }

  loadMore = async page => {
    await this.props.loadMoreTodayProducts(page);
    this.setState({ page: this.state.page + 2 });
  };

  loadLess = async page => {
    await this.props.loadLessTodayProducts(page);
    this.setState({ page: this.state.page - 2 });
  };

  render() {
    const { todayProducts } = this.props.product;
    if (todayProducts === null) return <Spinner />;
    if (todayProducts.length === 0) return <div>No products found today</div>;
    const {nrTodayProducts} = this.props.product
    if(nrTodayProducts === null) return null;
  
    return (
      <div className="today__products">
        <div className="grid2">
          {todayProducts.map(product => (
            <TodayProductCard key={product._id} product={product} />
          ))}
        </div>
        <div>
           <button
           disabled={this.state.page === 2}
           className="load__less"
           onClick={() => this.loadLess(this.state.page - 2)}
         >
           Load Less
         </button>
       
          <button
            disabled={(nrTodayProducts - this.state.page) <= 0 }
            className="load__more"
            onClick={() => this.loadMore(this.state.page + 2)}
          >
            Load More
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, {
  getTodayProducts,
  loadMoreTodayProducts,
  loadLessTodayProducts,
  getNrOfTodayProducts
})(TodayProducts);
