import styled from "styled-components";
import PropTypes from "prop-types";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useState } from "react";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Box = styled.button`
  width: 40px;
  height: 40px;
  position: relative;
  border: 1px solid var(--border);
  border-radius: 0.2rem;
  cursor: pointer;

  & > p,
  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function Pagination({ isFetchingNextPage, fetchNextPage, hasNextPage }) {
  const [page, setPage] = useState(1);
  const [num, setNum] = useState(1);

  function handleFetchNextPage() {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
    setPage((p) => p + 1);
    if (page > 2) setNum((n) => n + 1);
  }

  function handleFetchPreviousPage() {
    if (page === 1) return;
    setPage((p) => p - 1);
    if (page > 3) setNum((n) => n - 1);
  }

  return (
    <StyledPagination>
      <Wrapper>
        <Box disabled={!page} onClick={handleFetchPreviousPage}>
          <MdOutlineArrowBackIos />
        </Box>

        <Box style={{ color: page === num ? "red" : "" }}>
          <p>{num}</p>
        </Box>
        <Box style={{ color: page === num + 1 ? "red" : "" }}>
          <p>{num + 1}</p>
        </Box>
        <Box style={{ color: page === num + 2 ? "red" : "" }}>
          <p>{num + 2}</p>
        </Box>

        <Box disabled={!hasNextPage} onClick={handleFetchNextPage}>
          <MdOutlineArrowForwardIos />
        </Box>
      </Wrapper>
    </StyledPagination>
  );
}

Pagination.propTypes = {
  isFetchingNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  hasNextPage: PropTypes.bool,
};

export default Pagination;
