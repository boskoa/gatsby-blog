import * as React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import styled from "styled-components";
import useRoller from "../customHooks/useRoller";
import { useRef } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const IMGWIDTH = 300;
const IMGHEIGHT = 170;

const StyledMainContainer = styled.div`
  display: flex;
  min-height: 300px;
  margin: 20px auto;
  justify-content: stretch;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledRoller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  min-width: 320px;
  min-height: ${IMGHEIGHT}px;
  perspective: ${({ $length }) => $length * 3}px;
  perspective-origin: center;
  overflow: hidden;
`;

const StyledDot = styled.div`
  position: relative;
  transform: rotateY(-90deg) rotateZ(${({ $current }) => $current});
  transform-style: preserve-3d;
  transition: all 0.5s;
`;

const StyledTentacle = styled.div`
  width: ${({ $length }) => $length}px;
  position: absolute;
  left: 0;
  transform-origin: 0%;
  transform: ${({ $zDeg }) => `rotateZ(${$zDeg})`};
  transform-style: preserve-3d;
  border: 1px solid red;
`;

const StyledImage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -${IMGWIDTH / 2}px;
  top: -${IMGHEIGHT / 2}px;
  width: ${IMGWIDTH}px;
  height: ${IMGHEIGHT}px;
  transform: rotateY(90deg);
  opacity: ${({ $focus }) => $focus};
  transition: all 0.5s;
`;

const StyledDescription = styled.div`
  flex: 1;
  min-width: 260px;
  height: ${IMGHEIGHT * 2}px;
  perspective: 600px;
  perspective-origin: center;
  overflow: hidden;
  border: 1px solid red;
`;

const StyledSteps = styled.div`
  height: ${IMGHEIGHT * 6}px;
  transform: translateY(calc(-100% / 3 * ${({ $current }) => $current}));
  transition: all 0.5s;
  border: 2px solid black;
`;

const StyledStep = styled.div`
  height: ${IMGHEIGHT * 2}px;
  overflow-y: scroll;
  border: 1px solid green;
`;

function Roller({ data }) {
  const { nodes } = data.allMarkdownRemark;
  const rollerRef = useRef(null);
  const { degGap, steps, current } = useRoller(nodes.length, rollerRef);
  let length = 10 + (nodes.length - 1) * 38;

  return (
    <Layout pageTitle="Slider">
      <StyledMainContainer>
        <StyledRoller ref={rollerRef} $length={length}>
          <StyledDot $current={`${current * degGap}deg`}>
            {nodes.map((n, id) => (
              <StyledTentacle
                key={id}
                $zDeg={`-${steps[id]}deg`}
                $length={length}
              >
                <StyledImage $focus={current === id ? 1 : 0.2}>
                  <GatsbyImage
                    image={getImage(n.frontmatter.image)}
                    alt={id.toString()}
                  />
                </StyledImage>
              </StyledTentacle>
            ))}
          </StyledDot>
        </StyledRoller>
        <StyledDescription>
          <StyledSteps $current={current}>
            {nodes.map((n, id) => (
              <StyledStep
                key={id}
                dangerouslySetInnerHTML={{ __html: n.html }}
              />
            ))}
          </StyledSteps>
        </StyledDescription>
      </StyledMainContainer>
    </Layout>
  );
}

export const query = graphql`
  query Blogs {
    allMarkdownRemark {
      nodes {
        frontmatter {
          image {
            childImageSharp {
              gatsbyImageData(width: 600, placeholder: BLURRED)
            }
          }
          title
        }
        html
      }
    }
  }
`;

export function Head() {
  return <Seo title="Roller" />;
}

export default Roller;
