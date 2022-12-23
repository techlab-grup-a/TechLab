import styled, { keyframes } from "styled-components";
import wave5 from "../../assets/waves/wave5.svg";
import React from "react";

export default function Wave5() {
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
  top: 400px;
  background-image: url(${wave5});
  height: 900px;
  animation-duration: 10s;
  animation-timing-function: ease;
  animation-delay: 0.5s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  animation-name: ${myAnim};

  @media (max-width: 1440px) {
    background-size: 1440px;
  }
`;
