import React from "react";
import styled from "styled-components";
import Wave1 from "../components/Background/Wave1";
import Wave2 from "../components/Background/Wave2";
import Wave3 from "../components/Background/Wave3";
import Wave4 from "../components/Background/Wave4";
import Wave5 from "../components/Background/Wave5";

export default function Background() {
  return (
    <WaveWrapper>
      <WaveBackground />
      <Wave1 />
      <Wave2 />
      <Wave3 />
      <Wave4 />
      <Wave5 />
    </WaveWrapper>
  );
}

const WaveWrapper = styled.div`
  position: absolute;
  height: 1300px;
  width: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
`;

const WaveBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: 0px;
  width: 100%;
  height: 1200px;

  background-image: linear-gradient(
    222.77deg,
    rgb(12, 106, 188) 29.03%,
    rgb(47, 176, 217) 56.14%
  );

  @media (prefers-color-scheme: dark) {
    background-image: linear-gradient(
      rgb(36, 36, 82) 0%,
      rgb(73, 38, 173) 100%
    );
  }
`;
