import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import beaver1 from "../../static/img/beaver1.png";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            QuickStart Tutorial ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}
function BigBeaver() {
    return(
        <div className={styles.bigBeaver}>
          <img src={beaver1} alt="Beaver Cartoon" height="400" />
        </div>
    )
}
export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="BuildBeaver: Ship better software, faster">
      <HomepageHeader />
      <main>
          <BigBeaver />
          <HomepageFeatures />
      </main>
    </Layout>
  );
}
