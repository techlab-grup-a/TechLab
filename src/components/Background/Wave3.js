import styled, { keyframes } from "styled-components";
import wave3 from "../../assets/waves/wave3.svg";
import React from "react";

export default function Wave3() {
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
  top: 180px;
  background-image: url(${wave3});
  height: 1100px;
  animation-duration: 8s;
  animation-timing-function: ease;
  animation-delay: 0.3s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  animation-name: ${myAnim};

  @media (max-width: 1440px) {
    background-size: 1440px;
  }

  @media (prefers-color-scheme: dark) {
    filter: hue-rotate(150deg);
    opacity: 0.6;
  }
`;
