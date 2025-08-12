import React, { useState } from 'react';
import styled from 'styled-components';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AreaData } from './types';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const App: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<AreaData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAreaSelect = (area: AreaData) => {
    setSelectedArea(area);
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContainer>
      <Header onAreaSelect={handleAreaSelect} />
      <Map onAreaSelect={handleAreaSelect} />
      <Sidebar
        selectedArea={selectedArea}
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />
    </AppContainer>
  );
};

export default App; 