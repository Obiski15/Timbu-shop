import styled from "styled-components";
import PropTypes from "prop-types";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;

  & p {
    font-size: 16px;
    font-weight: 500;
  }

  & p:first-child {
    flex: 1;
  }

  & p:nth-child(2) {
    color: var(--secondary-color);
    &:hover {
      text-decoration: underline;
      cursor: default;
    }
  }

  @media only screen and (min-width: 1201px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

function SectionHeader({ children }) {
  return <Header>{children}</Header>;
}

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionHeader;
