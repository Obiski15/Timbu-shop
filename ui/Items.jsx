import styled from "styled-components";
import PropTypes from "prop-types";

import SectionHeader from "./SectionHeader";
import ItemsContainer from "./ItemsContainer";

import Item from "./Item";

const StyledItems = styled`
    width: 100%;

@media only screen and (min-width: 1201px) {
  width: 90%;
  margin-left: auto;
  margin-right: auto;;
  border: 2px solid green;
}
`;

function Items({ items, onClick, headerText, viewAll }) {
  return (
    <StyledItems>
      <SectionHeader>
        <p>{headerText}</p>
        {viewAll && <p onClick={onClick}>View All</p>}
      </SectionHeader>

      <ItemsContainer
        data={items}
        render={(item, i) => <Item item={item} key={i + 1} />}
      />
    </StyledItems>
  );
}

Items.propTypes = {
  headerText: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  viewAll: PropTypes.bool,
};

export default Items;
