import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const StyledDummyAccount = styled.div`
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 1rem;
`;

const Section = styled.div`
  border: 1px solid var(--border);
  padding: 1rem 0.5rem 2rem 0.5rem;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 2rem;
`;

function DummyAccount() {
  return (
    <>
      <Skeleton width={300} />

      <StyledDummyAccount>
        <Section>
          <Skeleton width={200} />

          <TableBody>
            <Skeleton width={50} />
            <Skeleton width={100} />
          </TableBody>
        </Section>

        <Section>
          <Skeleton width={200} />
          <TableBody>
            <Skeleton width={200} />
            <Skeleton />
          </TableBody>
        </Section>
      </StyledDummyAccount>
    </>
  );
}

export default DummyAccount;
