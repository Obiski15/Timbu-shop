import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const StyledSwiper = styled.div`
  width: 100%;
  position: relative;
  height: 400px;
  overflow: hidden;
`;

const Swipe = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.2s;

  & > img {
    height: 100%;
    width: 100%;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: calc(50% - 31px);

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const Dot = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: var(--border);
`;

function Swiper() {
  const [slideMode, setSlideMode] = useState("forward");
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = useCallback(() => {
    if (activeSlide === 3) setSlideMode("backward");
    if (activeSlide === 1) setSlideMode("forward");
    if (slideMode === "forward") return setActiveSlide((s) => s + 1);
    if (slideMode === "backward") return setActiveSlide((s) => s - 1);
  }, [activeSlide, slideMode]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSlideChange();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [handleSlideChange]);

  return (
    <StyledSwiper>
      {Array.from({ length: 5 }, (_, i) => (
        <Swipe
          key={i + 1}
          style={{ transform: `translate(${(i - activeSlide) * 100}%)` }}
        >
          <img
            src={`/images/large-img-${i + 1}.png`}
            alt={`large-img-${i + 1}`}
          />
        </Swipe>
      ))}

      <Dots>
        {Array.from({ length: 5 }, (_, i) => (
          <Dot
            key={i + 1}
            style={{
              backgroundColor:
                activeSlide === i ? "var(--secondary-color)" : "",
            }}
          />
        ))}
      </Dots>
    </StyledSwiper>
  );
}

export default Swiper;
