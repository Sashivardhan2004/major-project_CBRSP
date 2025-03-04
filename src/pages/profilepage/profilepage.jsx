import React, { useEffect } from 'react';
import { Header } from '../../components/Header/Header.jsx';
import { Settings } from '../../components/Settings/Settings.jsx';

export const Profilepage = ({ active, setActive, navItems, href }) => {
  useEffect(() => {
    setActive(navItems[3]);
  }, []);
  return (
    <>
      <Header
        active={active}
        setActive={setActive}
        navItems={navItems}
        href={href}
      />
      <Settings />
    </>
  );
};
