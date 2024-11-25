import Skeleton from "../../components/Skeleton";

function DummySectionHeader() {
  return (
    <Skeleton
      width={208}
      height={30}
      style={{
        borderRadius: "0.5rem",
        margin: "2rem 0 1rem 2rem",
      }}
    />
  );
}

export default DummySectionHeader;
