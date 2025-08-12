import React, { useState } from 'react';
import styled from 'styled-components';
import { areaData } from '../data/mockData';

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
  font-weight: 700;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  margin: 0 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ControlButton = styled.button`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
  font-size: 16px;

  &:hover {
    background: #f8f9fa;
    border-color: #667eea;
    color: #667eea;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1001;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

interface HeaderProps {
  onAreaSelect?: (area: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onAreaSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredAreas = areaData.filter(area =>
    area.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAreaSelect = (area: any) => {
    onAreaSelect?.(area);
    setSearchValue('');
    setIsDropdownOpen(false);
  };

  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon>G</LogoIcon>
        Gothenburg QoL Map
      </Logo>

      <SearchContainer>
        <SearchIcon>
          🔍
        </SearchIcon>
        <SearchInput
          placeholder="Search areas..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
        />
        <Dropdown isOpen={isDropdownOpen && filteredAreas.length > 0}>
          {filteredAreas.map(area => (
            <DropdownItem
              key={area.id}
              onClick={() => handleAreaSelect(area)}
            >
              {area.name}
            </DropdownItem>
          ))}
        </Dropdown>
      </SearchContainer>

      <Controls>
        <ControlButton title="Layer Controls">
          📊
        </ControlButton>
        <ControlButton title="Filter Data">
          🔧
        </ControlButton>
        <ControlButton title="Export Data">
          📥
        </ControlButton>
        <ControlButton title="Menu">
          ☰
        </ControlButton>
      </Controls>
    </HeaderContainer>
  );
};

export default Header; 