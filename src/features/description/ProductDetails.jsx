import styled from "styled-components";
import PropTypes from "prop-types";

import TabHeading from "./components/Tabheading";
import TabBody from "./components/TabBody";
import { forwardRef } from "react";

const StyledProductDetails = styled.div`
  display: flex;
  justify-items: start;
  flex-direction: column;
  gap: 2rem;

  & > h1 {
    padding-left: 2rem;
    padding-top: 2rem;
  }
`;

const ProductDetails = forwardRef(({ description, ...props }, ref) => {
  return (
    <StyledProductDetails
      data-active-section="description-section"
      id="description-section"
      ref={ref}
      {...props}
    >
      <TabHeading>Product details</TabHeading>
      <TabBody>{description}</TabBody>
    </StyledProductDetails>
  );
});

ProductDetails.displayName = "ProductDetails";

ProductDetails.propTypes = {
  description: PropTypes.string,
};

export default ProductDetails;
