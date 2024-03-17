import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import primaryTheme from '../theme/theme';

const { black } = primaryTheme.colors;

const BannerSection = styled.section`
  background-color: ${black};
  padding: 43px 100px;

  display: flex;
  gap: 206px;

  overflow: hidden;
`;

const brands = [
  {
    src: 'assets/Versace.png',
    alt: 'Versace logo',
    x: -1000,
    duration: 10000,
    delay: 0,
  },
  {
    src: 'assets/Zara.png',
    alt: 'Zara logo',
    x: -1206,
    duration: 10000,
    delay: 206,
  },
  {
    src: 'assets/Gucci.png',
    alt: 'Gucci logo',
    x: -1412,
    duration: 10000,
    delay: 412,
  },
  {
    src: 'assets/Prada.png',
    alt: 'Prada logo',
    x: -1618,
    duration: 10000,
    delay: 618,
  },
  {
    src: 'assets/Calvin Klein.png',
    alt: 'CalvinKlein logo',
    x: -1824,
    duration: 10000,
    delay: 824,
  },
];

const Banner = () => {
  const windowWidth = window.innerWidth;

  return (
    <BannerSection>
      {brands.map((brand, key) => {
        const animatedImage = useSpring({
          from: { x: windowWidth },
          to: { x: -windowWidth - 200 },
          config: {
            duration: brand.duration + windowWidth + 200,
          },
          delay: brand.delay - windowWidth,
          loop: true,
        });

        console.log(animatedImage);

        return (
          <animated.img
            src={brand.src}
            alt={brand.alt}
            key={key}
            style={{ ...animatedImage }}
          />
        );
      })}
    </BannerSection>
  );
};

export default Banner;
