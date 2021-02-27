import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import Context from "../../context/"
import ContentWrapper from "../../styles/contentWrapper"
import Underlining from "../../styles/underlining"
import Social from "../social"
import SplashScreen from "../splashScreen"
import { lightTheme, darkTheme } from "../../styles/theme"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 6rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: 4rem;
    }
    .greetings {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .emoji {
      margin-left: 0.75rem;
      width: 2.2rem;
      height: 2.2rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-left: 1rem;
        width: 3rem;
        height: 3rem;
      }
    }
    .title {
      margin-bottom: 1.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-bottom: 0;
      }
    }
    .subtitle {
      margin-top: -0.75rem;
    }
    .description {
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
  }
`

const AnimatedUnderlining = motion.custom(Underlining)

const Hero = ({ content }) => {
  const { frontmatter, body } = content[0].node
  const { isIntroDone, darkMode } = useContext(Context).state

  // Controls to orchestrate animations of greetings, emoji, social profiles, underlining
  const gControls = useAnimation()
  const eControls = useAnimation()
  const sControls = useAnimation()
  const uControls = useAnimation()

  // Start Animations after the splashScreen sequence is done
  useEffect(() => {
    const pageLoadSequence = async () => {
      if (isIntroDone) {
        eControls.start({
          rotate: [0, -10, 12, -10, 9, 0, 0, 0, 0, 0, 0],
          transition: { duration: 2.5, loop: 3, repeatDelay: 1 },
        })
        await gControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 0.4 },
        })
        await sControls.start({
          opacity: 1,
          x: 0,
        })
        // Animate underlining to hover state
        await uControls.start({
          boxShadow: `inset 0 -2rem 0 ${
            darkMode ? darkTheme.colors.secondary : lightTheme.colors.secondary
          }`,
          transition: { delay: 0.4, ease: "circOut" },
        })
      }
    }
    pageLoadSequence()
  }, [isIntroDone, darkMode, eControls, gControls, sControls, uControls])

  return (
    <StyledSection id="hero">
      {!isIntroDone && <SplashScreen />}
      <StyledContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gControls}
          data-testid="animated-heading"
        >
          <h1 className="title">
            <div className="greetings">
              {frontmatter.greetings}
              <motion.div
                animate={eControls}
                style={{ originX: 0.7, originY: 0.7 }}
              >
                <Img
                  className="emoji"
                  fluid={frontmatter.icon.childImageSharp.fluid}
                />
              </motion.div>
            </div>
            {frontmatter.title}
          </h1>
          <h2 className="subtitle">
            {frontmatter.subtitlePrefix}{" "}
            <AnimatedUnderlining animate={uControls} big>
              {frontmatter.subtitle}
            </AnimatedUnderlining>
          </h2>
          <div className="description">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={sControls}>
          <Social fontSize=".95rem" padding=".3rem 1.25rem" width="auto" withIcon/>
        </motion.div>
        <hr/>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={sControls}>
          <a href="https://vercel.com/?utm_source=1998code&amp;utm_campaign=oss" target="_blank">
            <div fontSize="30rem">提供支持:&nbsp;
              <svg height="30px" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" fill="#fff"/></svg>
            </div>
          </a>
        </motion.div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

Hero.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Hero
