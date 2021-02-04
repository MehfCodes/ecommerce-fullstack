/* eslint-disable react/style-prop-object */
import './cart.css'
function Cart({src,title,price}) {
  return (
    <div className="card mb-3 col-lg-3 col-12">
      <div className="card-body
      col-12 d-flex flex-lg-column
      justify-content-lg-around flex-row-reverse justify-content-between align-items-start
      ">
          <img src={`/images/${src}`} alt="" 
          
          className='img-card align-self-center'/>
       <div className="content d-flex flex-column justify-content-between align-content-end w-100 h-100 ">
       <div className="">
        <h5 className="card-title ">{title}</h5>
        <span>
          {price}$
        </span>
        </div>
        <button className="btn btn-primary w-50">Add</button>
       </div>
      </div>
    </div>
  );
}
export default Cart;
