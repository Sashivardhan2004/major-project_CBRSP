import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header/Header.jsx';
import { Provider } from '../../components/Provider/Provider.jsx';
import { fetchProvidersList } from './ProvidersList.js'; // Import fetching function
import './ProvidersList.css';

export const ProvidersList = ({ active, setActive, navItems, href }) => {
  const [providersList, setProvidersList] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setActive(navItems[1]);

    const loadProviders = async () => {
      const data = await fetchProvidersList();
      setProvidersList(data);
    };

    loadProviders();
  }, []);

  return (
    <>
      <Header
        active={active}
        setActive={setActive}
        navItems={navItems}
        href={href}
      />
      <div className="providers-list flex flex-col justify-center items-center">
        {providersList.length > 0 ? (
          providersList.map((provider) => (
            <Provider key={provider.ip} provider={provider} />
          ))
        ) : (
          <p>Loading providers...</p>
        )}
      </div>
    </>
  );
};
