import styled from "styled-components";
import PropTypes from "prop-types";

import TabHeading from "./components/Tabheading";
import TabBody from "./components/TabBody";
import { forwardRef } from "react";

const StyledSpecifications = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & > div {
    width: 100%;
    display: flex;
    justify-items: start;
    gap: 1rem;
    flex-direction: column;

    & > h1 {
      width: 100%;
      padding: 1rem 0 1rem 2rem;
      border-bottom: 1px solid var(--border);
    }
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    gap: 0.5rem;

    & > div {
      & > h1 {
        padding: 2rem 0 1rem 2rem;
      }
    }
  }
`;

const Specifications = forwardRef(({ specifications, ...props }, ref) => {
  return (
    <StyledSpecifications
      data-active-section="specifications-section"
      id="specifications-section"
      {...props}
      ref={ref}
    >
      <div>
        <TabHeading style={{ textTransform: "uppercase" }}>
          Key Features
        </TabHeading>
        <TabBody>
          <ul style={{ listStylePosition: "inside" }}>
            {specifications?.features?.map((feat, i) => (
              <li
                key={i + 1}
                style={{
                  width: "100%",
                  padding: "1rem 0",
                }}
              >
                {feat}
              </li>
            ))}
          </ul>
        </TabBody>
      </div>

      <div>
        <TabHeading style={{ textTransform: "uppercase" }}>
          Specifications
        </TabHeading>
        <TabBody>
          <ul style={{ listStyle: "none" }}>
            {Object.keys(specifications?.specs || []).map((spec, i) => {
              if (spec === "_id") return "";
              return (
                <li
                  key={i + 1}
                  style={{
                    width: "100%",
                    padding: "1rem 0",
                  }}
                >
                  <span
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                  >
                    {spec}:{" "}
                  </span>
                  {specifications?.specs?.[spec]}
                </li>
              );
            })}
          </ul>
        </TabBody>
      </div>
    </StyledSpecifications>
  );
});

Specifications.displayName = "Specifications";

Specifications.propTypes = {
  specifications: PropTypes.object,
};

export default Specifications;
