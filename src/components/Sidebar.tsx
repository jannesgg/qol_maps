import React from 'react';
import styled from 'styled-components';
import { AreaData, CrimeData, EducationData, IncomeData } from '../types';
import { crimeData, educationData, incomeData } from '../data/mockData';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const SidebarTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
`;

const SidebarSubtitle = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: 14px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const SidebarContent = styled.div`
  padding: 24px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const StatTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

const StatDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

const ChartContainer = styled.div`
  margin-top: 16px;
  height: 200px;
`;

const SimpleBarChart = styled.div`
  display: flex;
  align-items: end;
  height: 150px;
  gap: 8px;
  padding: 20px 0;
`;

const Bar = styled.div<{ height: number; color: string }>`
  flex: 1;
  background: ${props => props.color};
  height: ${props => props.height}%;
  border-radius: 4px 4px 0 0;
  position: relative;
  min-width: 30px;
`;

const BarLabel = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

const BarValue = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: 600;
  color: #333;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
`;

const ComparisonItem = styled.div`
  text-align: center;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
`;

const ComparisonValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const ComparisonLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

interface SidebarProps {
  selectedArea: AreaData | null;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedArea, isOpen, onClose }) => {
  if (!selectedArea) return null;

  const areaCrimeData = crimeData.filter(crime => crime.areaId === selectedArea.id);
  const areaEducationData = educationData.filter(edu => edu.areaId === selectedArea.id);
  const areaIncomeData = incomeData.filter(income => income.areaId === selectedArea.id);

  const getCrimeLevelColor = (level: number): string => {
    if (level <= 25) return '#4ade80';
    if (level <= 50) return '#22c55e';
    if (level <= 75) return '#eab308';
    return '#ef4444';
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('sv-SE').format(num);
  };

  const chartData = areaCrimeData.map(crime => ({
    name: crime.crimeType,
    value: crime.count
  }));

  const maxValue = Math.max(...chartData.map(d => d.value), 1);

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>{selectedArea.name}</SidebarTitle>
        <SidebarSubtitle>Area Statistics & Analysis</SidebarSubtitle>
        <CloseButton onClick={onClose}>
          ×
        </CloseButton>
      </SidebarHeader>

      <SidebarContent>
        {/* Crime Level Card */}
        <StatCard>
          <StatHeader>
            <StatIcon style={{ background: getCrimeLevelColor(selectedArea.crimeLevel) }}>
              🛡️
            </StatIcon>
            <StatTitle>Crime Level</StatTitle>
          </StatHeader>
          <StatValue style={{ color: getCrimeLevelColor(selectedArea.crimeLevel) }}>
            {selectedArea.crimeLevel}/100
          </StatValue>
          <StatDescription>
            Crime level based on reported incidents per capita
          </StatDescription>
          
          {chartData.length > 0 && (
            <ChartContainer>
              <SimpleBarChart>
                {chartData.map((item, index) => (
                  <Bar
                    key={index}
                    height={(item.value / maxValue) * 100}
                    color="#667eea"
                  >
                    <BarValue>{item.value}</BarValue>
                    <BarLabel>{item.name}</BarLabel>
                  </Bar>
                ))}
              </SimpleBarChart>
            </ChartContainer>
          )}
        </StatCard>

        {/* Education Card */}
        <StatCard>
          <StatHeader>
            <StatIcon style={{ background: '#8b5cf6' }}>
              🎓
            </StatIcon>
            <StatTitle>Education</StatTitle>
          </StatHeader>
          <StatValue>{selectedArea.tertiaryEducation}%</StatValue>
          <StatDescription>
            Percentage of population with tertiary education
          </StatDescription>
        </StatCard>

        {/* Income Card */}
        <StatCard>
          <StatHeader>
            <StatIcon style={{ background: '#10b981' }}>
              💰
            </StatIcon>
            <StatTitle>Median Income</StatTitle>
          </StatHeader>
          <StatValue>{formatNumber(selectedArea.medianIncome)} SEK</StatValue>
          <StatDescription>
            Annual median household income
          </StatDescription>
        </StatCard>

        {/* Population Card */}
        <StatCard>
          <StatHeader>
            <StatIcon style={{ background: '#f59e0b' }}>
              👥
            </StatIcon>
            <StatTitle>Population</StatTitle>
          </StatHeader>
          <StatValue>{formatNumber(selectedArea.population)}</StatValue>
          <StatDescription>
            Total population in the area
          </StatDescription>
          
          <ComparisonGrid>
            <ComparisonItem>
              <ComparisonValue>{selectedArea.area} km²</ComparisonValue>
              <ComparisonLabel>Area</ComparisonLabel>
            </ComparisonItem>
            <ComparisonItem>
              <ComparisonValue>
                {Math.round(selectedArea.population / selectedArea.area)}
              </ComparisonValue>
              <ComparisonLabel>Pop/km²</ComparisonLabel>
            </ComparisonItem>
          </ComparisonGrid>
        </StatCard>

        {/* Quality of Life Index */}
        <StatCard>
          <StatHeader>
            <StatIcon style={{ background: '#06b6d4' }}>
              📈
            </StatIcon>
            <StatTitle>Quality of Life Index</StatTitle>
          </StatHeader>
          <StatValue>
            {Math.round(
              (100 - selectedArea.crimeLevel) * 0.4 +
              selectedArea.tertiaryEducation * 0.3 +
              (selectedArea.medianIncome / 500000) * 100 * 0.3
            )}
          </StatValue>
          <StatDescription>
            Composite score based on crime, education, and income
          </StatDescription>
        </StatCard>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar; 