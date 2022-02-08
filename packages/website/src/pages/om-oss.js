import React from 'react';
import Layout from '../components/layout';
import { useAboutUsQuery } from '../hookspages/useAboutUsQuery';
import { BlogCarousel } from '../components/blogCarousel';
import {
  Title,
  OurServices,
  AboutIntro,
  FeaturedTeam,
} from 'shared-components';
import { useLayoutQuery } from '../hooks/useLayoutQuery';

const About = () => {
  const data = useAboutUsQuery();
  const layoutData = useLayoutQuery();
  const {
    sanityAboutPage: { pageDescription } = { pageDescription: false },
    sanityAboutPage: { pageTitle } = { pageTitle: false },
  } = data;
  const employees = data.allSanityEmployee.edges.map((el) => el.node);
  employees.map(
    (el) => (el.fallbackImg = data.fallbackImg.childImageSharp.gatsbyImageData)
  );
  const team = employees.slice(0, 4);

  return (
    <Layout
      layoutData={layoutData}
      whiteIcons
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      <div className="w-full bg-navy text-white sm:pb-20 pb-4 overflow-hidden tracking-wider">
        <div className="w-full">
          <AboutIntro
            topImg={data.aboutUsTop.childImageSharp.gatsbyImageData}
            bottomImg={data.aboutUsLower.childImageSharp.gatsbyImageData}
          />
        </div>
        <div className="h-10 lg:h-0" />
        <OurServices darkFade {...data.sanityLandingPage.section2Services} />
        <div className="px-12 lg:h-5"></div>
        <div className="max-w-1200 mx-auto xl:px-0 sm:px-12 px-5 -mb-10 mt-12">
          <Title align="left">Ansatte</Title>
        </div>
        <FeaturedTeam notitle team={team} color="navy" />
        <div className="max-w-1440 mx-auto">
          <BlogCarousel />
        </div>
      </div>
    </Layout>
  );
};

export default About;
