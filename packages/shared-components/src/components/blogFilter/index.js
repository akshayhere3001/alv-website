import React, { useEffect, useState } from "react";
import { FilterContainer } from "../filterContainer";
import { DropdownMini, Tag } from "../icon";
import * as styles from "./BlogFilter.module.css";

// Input: content array and filter elements
// Output: filtered and sorted content array
export const BlogFilter = ({
  allTags,
  allAuthors,
  allArticles,
  onChange,
  isEnLocale,
  initialCategoryFilter,
}) => {
  const [active, setActive] = useState(allArticles);
  const [activeAuthors, setActiveAuthors] = useState([]);
  const [sort, setSort] = useState(null);
  const [activeTags, setActiveTags] = useState(
    initialCategoryFilter ? [initialCategoryFilter] : []
  );

  // Process all available content based on sort and filter input.
  useEffect(() => {
    const sortedActive = [...active];

    sort === "newest" &&
      sortedActive.sort((a, b) => (a.rawDate < b.rawDate ? -1 : 1));
    sort === "oldest" &&
      sortedActive.sort((a, b) => (a.rawDate < b.rawDate ? 1 : -1));

    onChange(sortedActive);
    // Including onChange results in infinite callback loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, sort]);

  // Update sort state with selected sorting option
  const sortClick = (value) => {
    setSort(value);
  };

  useEffect(() => {
    if (activeTags.length > 0 || activeAuthors.length > 0) {
      const filteredArticles = allArticles.filter((article) => {
        const articleAuthor = article?.author
          ? `${article.author.firstname} ${article.author.lastname}`
          : null;
        let authorMatch = true;
        let tagsMatch = true;

        // case insensitive tags comparison to make url query params case insensitive
        if (activeTags.length > 0) {
          const lowercaseArticleTags = article.tags.map((tag) =>
            tag.tag.toLowerCase()
          );
          const lowercaseActiveTags = activeTags.map((tag) =>
            tag.toLowerCase()
          );

          tagsMatch = lowercaseActiveTags.some((tag) =>
            lowercaseArticleTags.includes(tag)
          );
        }

        // look for article author in active authors
        if (articleAuthor && activeAuthors.length > 0) {
          authorMatch = activeAuthors.includes(articleAuthor);
        }

        return tagsMatch && authorMatch;
      });
      setActive(filteredArticles);
    } else {
      setActive(allArticles);
    }
  }, [activeTags, activeAuthors, allArticles]);

  // Add or remove tag from current filter config
  // Converts tag to lowercase to allow for case insensitive url query params
  const tagClick = (e) => {
    const currentTag = e.target.id.toLowerCase();
    const activeTagsLowercase = [...activeTags.map((tag) => tag.toLowerCase())];
    let newFilter = [...activeTags];
    if (activeTagsLowercase.includes(currentTag)) {
      newFilter = [
        ...activeTags.filter(
          (tag) => tag.toLowerCase() !== currentTag.toLowerCase()
        ),
      ];
    } else {
      newFilter.push(e.target.id);
    }
    setActiveTags(newFilter);
  };

  // Add or remove author from current filter config
  const authorClick = (e) => {
    const current = e.target.id;
    let newFilter = [...activeAuthors];

    if (newFilter.includes(current)) {
      newFilter = activeAuthors.filter((el) => el !== current);
    } else {
      newFilter.push(current);
    }
    setActiveAuthors(newFilter);
  };

  const noFilter =
    active.length === allArticles.length &&
    activeTags.length < 1 &&
    activeAuthors.length < 1;
  return (
    <FilterContainer>
      <FilterField
        tags={allTags}
        noFilter={noFilter}
        authors={allAuthors}
        tagClick={tagClick}
        isEnLocale={isEnLocale}
        authorClick={authorClick}
        activeAuthors={activeAuthors}
        activeTags={activeTags}
      />
      <SortField sortClick={sortClick} sort={sort} isEnLocale={isEnLocale} />
    </FilterContainer>
  );
};

export const FilterField = ({
  tags,
  authors,
  noFilter,
  activeTags,
  activeAuthors,
  isEnLocale,
  tagClick,
  authorClick,
}) => {
  return (
    <div
      className="grid relative tracking-wider h-full border border-bordergray items-center pl-2 mx-2 rounded-md flex-grow"
      style={{ gridTemplateColumns: "50px 50px auto" }}
    >
      <input
        className={`${styles.filterCheckbox} absolute left-0 ml-2 w-full h-6 transform cursor-pointer`}
        type="checkbox"
      />
      <div
        style={{ zIndex: 60, background: "white" }}
        className={`${styles.filter} bg-white absolute w-full px-12 py-8 rounded-md bg-white mt-9 left-0 top-0 flex border-b border-l border-r border-bordergray`}
      >
        <FilterOption onChange={tagClick} tags={tags} activeTags={activeTags}>
          {isEnLocale ? "Categories" : "Kategorier"}
        </FilterOption>
        <FilterOption
          onChange={authorClick}
          tags={authors}
          activeTags={activeAuthors}
        >
          {isEnLocale ? "Authors" : "Forfattere"}
        </FilterOption>
      </div>
      <span className="transform scale-10 -translate-y-6px h-5 -mx-32">
        <Tag />
      </span>
      {""}
      <span className="mr-3 -ml-1">Filter</span>
      <div className="overflow-x-scroll hide-scrollbar">
        <div
          className="whitespace-pre w-full pl-2 rounded-full -ml-2 relative"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="fivefifty:flex hidden w-full">
            {activeTags && <ActiveFilterOptions activeFilters={activeTags} />}
            {activeAuthors && (
              <ActiveFilterOptions activeFilters={activeAuthors} />
            )}
            {noFilter && (
              <>
                <div className="my-1 py-1 mx-2px text-sm px-2 rounded-full bg-gray-200 font-normal font-gray-600">
                  {isEnLocale ? "All categories" : "Alle kategorier"}
                </div>
                <div className="my-1 py-1 mx-2px text-sm px-2 rounded-full bg-gray-200 font-normal font-gray-600">
                  {isEnLocale ? "All authors" : "Alle forfattere"}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <span className="right-0 absolute mr-4 fivefifty:hidden">
        <DropdownMini />
      </span>
    </div>
  );
};

const ActiveFilterOptions = ({ activeFilters }) => {
  return activeFilters?.map((tag, i) => (
    <div
      className="my-1 py-1 mx-2px text-sm px-2 rounded-full bg-gray-200 font-normal font-gray-600"
      key={`${tag}-${i}`}
    >
      {tag}
    </div>
  ));
};

const FilterOption = ({ tags, onChange, children, activeTags }) => {
  return (
    <div className="flex-1">
      <div className="tracking-wider uppercase mb-2 text-base">{children}</div>
      <div className={`${styles.line} bg-theme-accent w-7 mb-5`} />
      <ul>
        {tags.map((tag, index) => (
          <li key={index} className={styles.listItem}>
            <div className="text-sm text-gray-700 font-light relative mt-3 flex items-center">
              <input
                className={`${styles.checkbox} absolute left-0 w-full transform -translate-x-5 h-5 cursor-pointer`}
                id={tag}
                checked={activeTags.some(
                  (activeTag) => activeTag.toLowerCase() === tag.toLowerCase()
                )}
                onChange={onChange}
                type="checkbox"
              />
              <div
                className={`${styles.dot} h-2 w-2 bg-theme-accent rounded-full mr-2 absolute mt-px`}
              />
              <span>{tag}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const SortField = ({ sort, sortClick, light, isEnLocale }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    sortClick(e.target.id);
    setOpen(!open);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const localeSortOptions = {
    no: {
      oldest: "Eldst til nyest",
      newest: "Nyest til eldst",
    },
    en: {
      oldest: "Oldest",
      newest: "Most recent",
    },
  };

  return (
    <div className="flex items-center h-full fivefifty:w-60 pr-2 pl-4 fivefifty:px-0">
      <span className="fivefifty:w-25 fivefifty:text-right">
        {isEnLocale ? "Sort" : "Sorter"}
      </span>
      <div
        className="relative h-full border border-bordergray flex items-center px-4 rounded-md ml-3 w-full"
        style={{
          background: light && "rgba(255,255,255,0.05)",
          border: light && "none",
        }}
      >
        <span
          className={`block font-light ${
            open && "font-bold"
          } text-sm flex items-center transition duration-100 justify-between w-full`}
        >
          {localeSortOptions[isEnLocale ? "en" : "no"][sort || "newest"]}
          <span className="mt-2px" style={{ filter: light && "invert(100%)" }}>
            {" "}
            <DropdownMini />
          </span>
        </span>
        <input
          className={`absolute left-0 w-full h-6 transform cursor-pointer opacity-0`}
          type="checkbox"
          onClick={toggleOpen}
        />
        <ul
          className={`${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          } absolute top-0 left-0 mt-9 bg-white pr-1 w-full z-30 transition duration-100 text-navy -translate-x-px -translate-y-2px transform border-t-none text-sm list-style-none border border-bordergray rounded-md font-light opacity-0 pb-6px ${
            light && "-mt-px"
          }`}
        >
          <SortOption
            onClick={handleClick}
            isEnLocale={isEnLocale}
            textNo={localeSortOptions.no.oldest}
            textEn={localeSortOptions.en.oldest}
            id="oldest"
          />
          <SortOption
            onClick={handleClick}
            isEnLocale={isEnLocale}
            textNo={localeSortOptions.no.newest}
            textEn={localeSortOptions.en.newest}
            id="newest"
          />
        </ul>
      </div>
    </div>
  );
};

const SortOption = ({ onClick, isEnLocale, textNo, textEn, id }) => (
  <li>
    <button
      className="py-2 bg-white w-full px-4 cursor-pointer text-left"
      id={id}
      onClick={onClick}
    >
      {isEnLocale ? textEn : textNo}
    </button>
  </li>
);
