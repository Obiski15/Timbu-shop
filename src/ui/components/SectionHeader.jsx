import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  font-weight: 500;
  font-size: 1.6rem;
  background-color: black;
  border-radius: 0.5rem 0.5rem 0 0;
  color: white;
  text-transform: capitalize;
  margin: 2rem 2rem 0 2rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1rem;

  & svg {
    width: 24px;
    height: 24px;
  }
`;

function SectionHeader({ children }) {
  const navigate = useNavigate();
  return (
    <StyledSectionHeader>
      <p>{children}</p>

      <Button onClick={() => navigate("/recommended")}>
        <span>view all</span>
        <MdKeyboardArrowRight />
      </Button>
    </StyledSectionHeader>
  );
}

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionHeader;
