import React from 'react';
import Button from '../button/button';
import './collectionItem.scss';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
function CollectionItem({ item, addItem }) {
  const { id, name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button inverted onClick={() => addItem(item)}>
        Add To Cart
      </Button>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(CollectionItem);
