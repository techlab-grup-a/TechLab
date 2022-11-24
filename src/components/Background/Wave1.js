import styled, { keyframes } from "styled-components";
import wave1 from "../../assets/waves/wave1.svg";

export default function Wave1() {
  return <Wave />;
}

const myAnim = keyframes`
  0% {
  transform: translateY(0px);
  }
  100% {
  transform: translateY(50px);
  }
`;

const Wave = styled.div`
  position: absolute;
  width: 100%;
  background-size: 100%;
  z-index: -1;
  top: 120px;
  background-image: url(${wave1});
  height: 1100px;
  animation-duration: 6s;
  animation-timing-function: ease;
  animation-delay: 0.1s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  animation-name: ${myAnim};

  @media (max-width: 1440px) {
    background-size: 1440px;
  }
`;
