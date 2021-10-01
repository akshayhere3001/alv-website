import React, { useState } from 'react';
import Link from 'gatsby-link';
import * as Button from '../button';
import { BgImage } from 'gbimage-bridge';

export const OurServices = ({
  description,
  heading,
  image,
  textOverImage,
  servicesList,
  darkFade,
}) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleClick = (e) => {
    setActiveItem(Number(e.target.id));
  };
  return (
    <>
      <div
        className="max-w-1440 sm:px-12 xl:px-0 mx-auto lg:grid xl:gap-x-10 lg:pb-12 pb-5 bg-theme-bg text-theme-text"
        style={{
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <div />
        <div className="sm:pl-0 lg:ml-0 pl-5">
          <h2 className="sm:text-5xl text-4xl font-light mb-3 uppercase lg:w-full sm:w-full">
            {heading || 'Våre Tjenester'}
          </h2>
          <p className="mb-5 sm:pr-15 font-light text-xl w-full text-theme-text sm:text-xl tracking-wider">
            {description}
          </p>

          <div className="lg:block flex justify-between">
            <div />
            <div>
              <Link to="/vi-tilbyr">
                <Button.Arrow>
                  <span className="">Les Mer</span>
                </Button.Arrow>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mx-auto lg:grid flex flex-col-reverse gap-x-10"
        style={{
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '1300px',
        }}
      >
        {/* Map from array of list items */}
        <div className="w-full px-5 sm:px-0 sm:mx-12 lg:mx-0 lg:pl-12 mt-9 text-lg sm:text-nav">
          <ul>
            {servicesList.map((el, i) => (
              <li
                className="tracking-wider font-semibold mb-8 cursor-pointer"
                id={i}
                onClick={handleClick}
              >
                <p className="uppercase pointer-events-none text-theme-text">
                  {el.title}
                </p>
                {el.subtitle && (
                  <p className="text-base font-normal pointer-events-none">
                    {el.subtitle}
                  </p>
                )}
                {activeItem === i && (
                  <ListContent link={el.link}>{el.text}</ListContent>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="font-light flex flex-col justify-between h-full text-xl">
          <TextFadeImage
            image={image.asset.gatsbyImageData}
            darkFade={darkFade}
            textOverImage={textOverImage}
          />
        </div>
      </div>
    </>
  );
};

const TextFadeImage = ({ darkFade, image, textOverImage }) => (
  <div>
    <BgImage image={image} className="h-133">
      <div
        className={`flex sm:justify-end items-center p-5 lg:pr-24 sm:p-16 ${
          darkFade && 'bg-black bg-opacity-50 h-133'
        }`}
      >
        <div className="text-theme-text sm:text-slider text-blog uppercase text-left font-semibold tracking-wider leading-tighter sm:text-right">
          {textOverImage}
        </div>
      </div>
    </BgImage>
  </div>
);

const ListContent = ({ children, link }) => (
  <div>
    <div className={`w-12 mt-1 mb-8 h-2px bg-theme-accent`} />
    <div className="sm:pl-10 pl-5 mb-15">
      <p className="tracking-wider text-theme-text sm:text-lg leading-snug font-extralight mb-4 sm:w-4/6 w-full lg:w-full">
        {children}
      </p>
      <div className="flex lg:-mr-24 z-40 relative items-center cursor-pointer">
        <p className="font-semibold tracking-wider uppercase text-base w-40 text-theme-text">
          <Link to={link}>Finn ut mer</Link>
        </p>
        <div className="h-2px bg-theme-text sm:opacity-0 twelve:opacity-100 mt-1 w-1/2 lg:w-full hidden sm:block" />
      </div>
    </div>
  </div>
);
