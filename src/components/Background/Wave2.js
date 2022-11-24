import styled, { keyframes } from "styled-components";
import wave2 from "../../assets/waves/wave2.svg";

export default function Wave2() {
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
  top: 300px;
  background-image: url(${wave2});
  height: 1100px;
  animation-duration: 7s;
  animation-timing-function: ease;
  animation-delay: 0.2s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  animation-name: ${myAnim};

  @media (max-width: 1440px) {
    background-size: 1440px;
  }

  @media (prefers-color-scheme: dark) {
    opacity: 0.1;
  }
`;
