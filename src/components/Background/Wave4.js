import styled, { keyframes } from "styled-components";
import wave4 from "../../assets/waves/wave4.svg";

export default function Wave4() {
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
  background-position-x: center;
  background-position-y: top;
  background-size: 100%;
  z-index: -1;
  top: 141px;
  background-image: url(${wave4});
  height: 1100px;
  animation-duration: 9s;
  animation-timing-function: ease;
  animation-delay: 0.4s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  animation-name: ${myAnim};

  @media (max-width: 1440px) {
    background-size: 1440px;
  }
`;
