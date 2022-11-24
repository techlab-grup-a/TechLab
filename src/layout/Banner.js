import styled from "styled-components";

export default function Banner() {
  return (
    <BannerWrapper>
      <Title>TechLab</Title>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  display: grid;
  position: relative;
  text-align: center;
  max-width: 400px;
  padding: 200px 20px 0px 20px;
  margin: 0px auto 60px auto;
  gap: 20px;
`;

const Title = styled.span`
  font-weight: bold;
  font-style: normal;
  font-size: 60px;
  color: rgb(255, 255, 255);
`;
