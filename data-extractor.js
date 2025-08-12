// Gothenburg Statistics Data Extractor
// This utility helps extract data from Gothenburg's PDF statistics documents
// and format it for use in the map application

const GOTHENBURG_DISTRICTS = {
    // Official district names from Gothenburg city
    'centrum': 'Centrum',
    'haga': 'Haga',
    'linnégatan': 'Linnégatan',
    'vasastan': 'Vasastan', 
    'olskroken': 'Olskroken',
    'angered': 'Angered',
    'bergsjön': 'Bergsjön',
    'kortedala': 'Kortedala',
    'torslanda': 'Torslanda',
    'mölndal': 'Mölndal'
};

// Data structure for extracted statistics
const STATISTICS_TEMPLATE = {
    population: {
        total: 0,
        density: 0,
        ageGroups: {
            '0-17': 0,
            '18-64': 0,
            '65+': 0
        }
    },
    education: {
        tertiaryEducation: 0,
        highSchool: 0,
        primarySchool: 0
    },
    income: {
        medianIncome: 0,
        averageIncome: 0,
        lowIncomeHouseholds: 0
    },
    crime: {
        totalIncidents: 0,
        violentCrime: 0,
        propertyCrime: 0,
        crimeRate: 0
    },
    housing: {
        totalHousing: 0,
        rentalPercentage: 0,
        averageRent: 0
    },
    employment: {
        employmentRate: 0,
        unemploymentRate: 0
    }
};

// Function to extract data from PDF text
function extractDataFromPDFText(pdfText, districtName) {
    const data = JSON.parse(JSON.stringify(STATISTICS_TEMPLATE));
    
    // Example extraction patterns (adjust based on actual PDF format)
    const patterns = {
        population: /population[:\s]*(\d+)/i,
        crimeRate: /crime[:\s]*(\d+)/i,
        medianIncome: /median.*income[:\s]*(\d+)/i,
        education: /tertiary.*education[:\s]*(\d+)%/i
    };
    
    // Extract data using patterns
    Object.keys(patterns).forEach(key => {
        const match = pdfText.match(patterns[key]);
        if (match) {
            data[key] = parseInt(match[1]);
        }
    });
    
    return data;
}

// Function to calculate crime level (0-100 scale)
function calculateCrimeLevel(crimeData) {
    // Normalize crime rate to 0-100 scale
    // This would need to be calibrated based on actual data
    const baseRate = crimeData.crimeRate || 0;
    const normalizedRate = Math.min(Math.max(baseRate / 10, 0), 100);
    return Math.round(normalizedRate);
}

// Function to format data for map application
function formatForMap(districtData) {
    return {
        id: districtData.id,
        name: districtData.name,
        crimeLevel: calculateCrimeLevel(districtData.crime),
        tertiaryEducation: districtData.education.tertiaryEducation || 0,
        medianIncome: districtData.income.medianIncome || 0,
        population: districtData.population.total || 0,
        area: districtData.area || 1.0,
        center: districtData.center || [57.7089, 11.9746]
    };
}

// Example usage function
function processPDFData(pdfTextArray) {
    const processedData = [];
    
    pdfTextArray.forEach((pdfText, index) => {
        const districtId = Object.keys(GOTHENBURG_DISTRICTS)[index];
        const districtName = GOTHENBURG_DISTRICTS[districtId];
        
        const extractedData = extractDataFromPDFText(pdfText, districtName);
        const formattedData = formatForMap({
            id: districtId,
            name: districtName,
            ...extractedData
        });
        
        processedData.push(formattedData);
    });
    
    return processedData;
}

// Export functions for use in map application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        extractDataFromPDFText,
        calculateCrimeLevel,
        formatForMap,
        processPDFData,
        GOTHENBURG_DISTRICTS
    };
} 