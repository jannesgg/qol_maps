import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import { AreaData } from '../types';
import { areaData, GOTHENBURG_CENTER } from '../data/mockData';

// You'll need to replace this with your actual Mapbox access token
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const MapControls = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  min-width: 200px;
`;

const Legend = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background: ${props => props.color};
  border-radius: 4px;
  margin-right: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Popup = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const PopupTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const PopupStat = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
`;

const PopupLabel = styled.span`
  color: #666;
`;

const PopupValue = styled.span`
  font-weight: 500;
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

interface MapProps {
  onAreaSelect?: (area: AreaData) => void;
}

const Map: React.FC<MapProps> = ({ onAreaSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedArea, setSelectedArea] = useState<AreaData | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: GOTHENBURG_CENTER,
      zoom: 11,
      attributionControl: false
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Add custom source for areas
      map.current.addSource('areas', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: areaData.map(area => ({
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: generateMockPolygon(area.id, GOTHENBURG_CENTER)
            },
            properties: {
              id: area.id,
              name: area.name,
              crimeLevel: area.crimeLevel,
              tertiaryEducation: area.tertiaryEducation,
              medianIncome: area.medianIncome,
              population: area.population,
              area: area.area
            }
          }))
        }
      });

      // Add fill layer for crime levels
      map.current.addLayer({
        id: 'areas-fill',
        type: 'fill',
        source: 'areas',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'crimeLevel'],
            0, '#4ade80',   // Green for low crime
            25, '#22c55e',
            50, '#eab308',  // Yellow for medium crime
            75, '#f97316',  // Orange for high crime
            100, '#ef4444'  // Red for very high crime
          ],
          'fill-opacity': 0.7
        }
      });

      // Add outline layer
      map.current.addLayer({
        id: 'areas-outline',
        type: 'line',
        source: 'areas',
        paint: {
          'line-color': '#ffffff',
          'line-width': 2,
          'line-opacity': 0.8
        }
      });

      // Add hover effect
      map.current.on('mouseenter', 'areas-fill', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer';
        }
      });

      map.current.on('mouseleave', 'areas-fill', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = '';
        }
      });

      // Add click handler
      map.current.on('click', 'areas-fill', (e) => {
        if (e.features && e.features[0]) {
          const feature = e.features[0];
          const area = areaData.find(a => a.id === feature.properties?.id);
          if (area) {
            setSelectedArea(area);
            onAreaSelect?.(area);
          }
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [onAreaSelect]);

  const getCrimeLevelColor = (level: number): string => {
    if (level <= 25) return '#4ade80';
    if (level <= 50) return '#22c55e';
    if (level <= 75) return '#eab308';
    return '#ef4444';
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('sv-SE').format(num);
  };

  return (
    <MapContainer>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <MapControls>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
          Gothenburg Quality of Life
        </h3>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
          Areas colored by crime level
        </p>
        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
          Click on areas for details
        </p>
      </MapControls>

      <Legend>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
          Crime Level Legend
        </h4>
        <LegendItem>
          <ColorBox color="#4ade80" />
          <span>Low (0-25)</span>
        </LegendItem>
        <LegendItem>
          <ColorBox color="#22c55e" />
          <span>Medium (26-50)</span>
        </LegendItem>
        <LegendItem>
          <ColorBox color="#eab308" />
          <span>High (51-75)</span>
        </LegendItem>
        <LegendItem>
          <ColorBox color="#ef4444" />
          <span>Very High (76-100)</span>
        </LegendItem>
      </Legend>

      {selectedArea && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000
        }}>
          <Popup>
            <PopupTitle>{selectedArea.name}</PopupTitle>
            <PopupStat>
              <PopupLabel>Crime Level:</PopupLabel>
              <PopupValue style={{ color: getCrimeLevelColor(selectedArea.crimeLevel) }}>
                {selectedArea.crimeLevel}/100
              </PopupValue>
            </PopupStat>
            <PopupStat>
              <PopupLabel>Tertiary Education:</PopupLabel>
              <PopupValue>{selectedArea.tertiaryEducation}%</PopupValue>
            </PopupStat>
            <PopupStat>
              <PopupLabel>Median Income:</PopupLabel>
              <PopupValue>{formatNumber(selectedArea.medianIncome)} SEK</PopupValue>
            </PopupStat>
            <PopupStat>
              <PopupLabel>Population:</PopupLabel>
              <PopupValue>{formatNumber(selectedArea.population)}</PopupValue>
            </PopupStat>
            <PopupStat>
              <PopupLabel>Area:</PopupLabel>
              <PopupValue>{selectedArea.area} km²</PopupValue>
            </PopupStat>
            <CloseButton onClick={() => setSelectedArea(null)}>
              ×
            </CloseButton>
          </Popup>
        </div>
      )}
    </MapContainer>
  );
};

// Generate mock polygon coordinates for demonstration
const generateMockPolygon = (areaId: string, center: [number, number]): number[][][] => {
  const baseOffset = 0.01; // Roughly 1km
  const variations = {
    centrum: 0.005,
    haga: 0.003,
    linnégatan: 0.004,
    vasastan: 0.006,
    olskroken: 0.005,
    angered: 0.008,
    bergsjön: 0.007,
    kortedala: 0.006,
    torslanda: 0.010,
    mölndal: 0.012
  };

  const offset = variations[areaId as keyof typeof variations] || baseOffset;
  const [lng, lat] = center;
  
  // Create a simple square polygon around the center
  return [[
    [lng - offset, lat - offset],
    [lng + offset, lat - offset],
    [lng + offset, lat + offset],
    [lng - offset, lat + offset],
    [lng - offset, lat - offset]
  ]];
};

export default Map; 