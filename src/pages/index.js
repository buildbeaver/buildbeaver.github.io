import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Redirect} from 'react-router-dom';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  // Redirect straight to the docs; no separate home page
  return <Redirect to='/docs/intro' />
}
