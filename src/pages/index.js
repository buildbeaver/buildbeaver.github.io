import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  // Redirect straight to the docs; no separate home page
  window.location.href = 'docs/intro'

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="BuildBeaver: Ship better software, faster">
    </Layout>
  );
}
