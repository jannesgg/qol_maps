# Gothenburg Quality of Life Map

A modern, full-screen interactive map application focused on Gothenburg, Sweden, displaying crime statistics, education levels, and income data across different city areas.

## Features

- **Interactive Full-Screen Map**: Centered on Gothenburg with smooth navigation
- **Crime Level Visualization**: Areas colored by crime level (green = low, red = high)
- **Detailed Area Statistics**: Click on areas to view comprehensive data
- **Modern UI**: Responsive design with glassmorphism effects
- **Search Functionality**: Find specific areas quickly
- **Quality of Life Index**: Composite score based on multiple factors
- **Standalone HTML**: No build process required - just open the HTML file

## Quick Start

### Option 1: Direct HTML (Recommended)
1. Simply open `index.html` in your web browser
2. The application will load immediately with all features

### Option 2: Local Server (For better performance)
1. Start a local server in the project directory:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
2. Open `http://localhost:8000` in your browser

## Mapbox Setup

To use your own Mapbox token (recommended for production):

1. Get a free access token from [Mapbox](https://account.mapbox.com/access-tokens/)
2. Replace the placeholder token in `index.html`:
   ```javascript
   mapboxgl.accessToken = 'your_actual_token_here';
   ```

## Usage

### Navigation
- **Pan**: Click and drag to move around the map
- **Zoom**: Use mouse wheel or pinch gestures
- **Search**: Use the search bar in the header to find specific areas
- **Area Details**: Click on any colored area to view detailed statistics

### Data Visualization
- **Crime Levels**: Color-coded from green (low) to red (high)
- **Education**: Percentage of population with tertiary education
- **Income**: Median household income in SEK
- **Population**: Total population and density statistics
- **Quality of Life Index**: Composite score combining all factors

### Sidebar Features
- Detailed area statistics
- Interactive charts
- Comparative data
- Export capabilities

## Data Structure

The application uses mock data for demonstration purposes. In a production environment, you would connect to real APIs for:

- **Crime Data**: Police reports and incident statistics
- **Education Data**: School and university enrollment data
- **Income Data**: Tax and census information
- **Geographic Data**: Official city boundary data

## Areas Included

The application includes data for the following Gothenburg areas:

- **Centrum**: City center with moderate crime levels
- **Haga**: Historic district with low crime
- **Linnégatan**: Upscale area with high education levels
- **Vasastan**: Residential area with good quality of life
- **Olskroken**: Mixed area with higher crime rates
- **Angered**: Suburban area with higher crime levels
- **Bergsjön**: Residential area with moderate statistics
- **Kortedala**: Suburban area with mixed demographics
- **Torslanda**: Coastal area with good quality of life
- **Mölndal**: Adjacent municipality with good statistics

## Customization

### Adding New Areas
Edit the `areaData` array in `index.html` to add new areas with their coordinates and statistics.

### Changing Map Style
Modify the map style in the JavaScript code by changing the `style` property.

### Updating Color Schemes
Adjust the color interpolation in the map layer configuration for different visualizations.

## Performance Features

- **Efficient Rendering**: Optimized for large datasets
- **Smooth Interactions**: Hardware-accelerated animations
- **Responsive Design**: Works on desktop and mobile devices
- **Memory Management**: Proper cleanup of map resources

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

If you want to modify the application:

1. Edit `index.html` directly
2. Refresh your browser to see changes
3. No build process required

## Deployment

### Static Hosting
The application can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

### Environment Variables
For production, consider setting up environment variables for the Mapbox token.

## Contributing

1. Fork the repository
2. Make your changes in `index.html`
3. Test in your browser
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Mapbox for mapping services
- Swedish government for open data initiatives
- Gothenburg city government for area definitions
