import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { BlockContent, Title } from 'shared-components';
import * as styles from './richtextAndImage.module.css';

export const RichtextAndImage = ({
  image,
  title,
  blocks,
  flip,
  leftColSize,
  backgroundColor,
}) => (
  <section
    className={`w-full px-5 sm:px-10 ${
      backgroundColor
        ? `py-10 sm:py-20 bg-${backgroundColor}`
        : 'my-10 sm:my-20'
    }`}
  >
    <div
      className={`max-w-1200 mx-auto ${
        image && 'lg:grid'
      } justify-between xl:gap-x-20 lg:gap-x-15 gap-x-10`}
      style={{ gridTemplateColumns: `${leftColSize} auto` }}
    >
      <div>
        {title && <Title align="left mb-2 mt-4">{title}</Title>}
        <span className={styles.text}>
          <BlockContent blocks={blocks} noStyle />
        </span>
      </div>
      <div style={{ gridRow: flip && '1' }}>
        <GatsbyImage image={image} className="h-full" />
      </div>
    </div>
  </section>
);