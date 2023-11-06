import { FaCartPlus } from "react-icons/fa";
import { useGlobalContext } from "./context";
const Navbar = () => {
  const { cartTotal } = useGlobalContext();
  return (
    <nav>
      <div className="nav-center">
        <h4>Cart Project</h4>
        <div className="nav-container">
          <FaCartPlus className="cart-icon" />
          <div className="amount-container">
            <p className="total-amount">{cartTotal}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
