import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const DeliveryContext = createContext();

function DeliveryProvider({ children }) {
  const [deliveryMode, setDeliveryMode] = useState("door delivery");

  return (
    <DeliveryContext.Provider value={{ deliveryMode, setDeliveryMode }}>
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node,
};

export default DeliveryProvider;
