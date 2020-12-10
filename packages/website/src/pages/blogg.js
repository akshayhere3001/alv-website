import React from 'react';
import Layout from '../components/layout';
import { Title } from '../components/title';
import { IntroContainer } from '../components/introContainer';
import { useBlogQuery } from '../hooks/useBlogQuery';
import { BlogSection } from '../components/blogSection';

const Blog = () => {
  const data = useBlogQuery();
  const articles = data.articles.edges
    .map((article) => article.node)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
  const featuredArticle = data.featuredArticle.article;

  return (
    <Layout>
      <IntroContainer article={featuredArticle} fallbackImg={data.fallbackImg}>
        <Title align="left">Blogg</Title>
        <div className="text-white tracking-wider w-full text-blog font-light mt-8">
          Vi vil gjerne dele litt av vår{' '}
          <span className="font-semibold">kunnskap</span>, og gi deg noen av
          våre <span className="font-semibold">tips og tanker</span>
        </div>
      </IntroContainer>
      <BlogSection allArticles={articles} />
    </Layout>
  );
};

export default Blog;
