import * as React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import styled from "styled-components";
import useRoller from "../customHooks/useRoller";
import { useRef } from "react";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";

const LENGTH = 100;
const IMGWIDTH = 300;

const StyledMainContainer = styled.div`
  display: flex;
  min-height: 400px;
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
  min-height: ${IMGWIDTH}px;
  perspective: 600px;
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
  width: ${LENGTH}px;
  position: absolute;
  left: 0;
  transform-origin: 0%;
  transform: ${({ $zDeg }) => `rotateZ(${$zDeg})`};
  transform-style: preserve-3d;
`;

const StyledImage = styled.div`
  position: absolute;
  right: -${IMGWIDTH / 2}px;
  top: -${IMGWIDTH / 2}px;
  width: ${IMGWIDTH}px;
  height: ${IMGWIDTH / (16 / 9)}px;
  transform: rotateY(90deg);
  opacity: ${({ $focus }) => $focus};
  transition: all 0.5s;
`;

const StyledDescription = styled.div`
  flex: 1;
  min-width: 260px;
  perspective: 600px;
  perspective-origin: center;
  overflow: hidden;
  border: 1px solid red;
`;

const StyledSteps = styled.div`
  display: flex;
  flex-direction: column;
  height: 300%;
  transform: translateY(calc(-100% / 3 * ${({ $current }) => $current}));
  transition: all 0.5s;
  border: 2px solid black;
`;

const StyledStep = styled.div`
  height: calc(100% / 3);
  border: 1px solid green;
`;

function Roller({ data }) {
  const { nodes } = data.allMarkdownRemark;
  const rollerRef = useRef(null);
  const { degGap, steps, current } = useRoller(nodes.length, rollerRef);

  return (
    <Layout pageTitle="Slider">
      <StyledMainContainer>
        <StyledRoller ref={rollerRef}>
          <StyledDot $current={`${current * degGap}deg`}>
            {nodes.map((n, id) => (
              <StyledTentacle key={id} $zDeg={`-${steps[id]}deg`}>
                <StyledImage $focus={current === id ? 1 : 0.2}>
                  <GatsbyImage
                    fluid={n.frontmatter.image.childImageSharp.fluid}
                  />
                </StyledImage>
              </StyledTentacle>
            ))}
            {/*}
            <StyledTentacle $zDeg={`${steps[0]}de0`}>
              <StyledImage $focus={current === 0 ? 1 : 0.2}>
                <img
                  width={IMGWIDTH}
                  src={`https://picsum.photos/id/1/${IMGWIDTH}`}
                  alt="first"
                />
              </StyledImage>
            </StyledTentacle>
            <StyledTentacle $zDeg={`-${steps[1]}deg`}>
              <StyledImage $focus={current === 1 ? 1 : 0.2}>
                <img
                  width={IMGWIDTH}
                  src={`https://picsum.photos/id/45/${IMGWIDTH}`}
                  alt="scond"
                />
              </StyledImage>
            </StyledTentacle>
            <StyledTentacle $zDeg={`-${steps[2]}deg`}>
              <StyledImage $focus={current === 2 ? 1 : 0.2}>
                <img
                  width={IMGWIDTH}
                  src={`https://picsum.photos/id/112/${IMGWIDTH}`}
                  alt="third"
                />
              </StyledImage>
            </StyledTentacle>
            */}
          </StyledDot>
        </StyledRoller>
        <StyledDescription>
          <StyledSteps $current={current}>
            <StyledStep>
              First <br />
              First <br />
              First <br />
              First <br />
              First <br />
              First <br />
              First <br />
              First <br />
              First <br />
              First <br />
              First <br />
            </StyledStep>
            <StyledStep>Second</StyledStep>
            <StyledStep>Third</StyledStep>
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
              fluid {
                ...GatsbyImageSharpFluid
              }
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
