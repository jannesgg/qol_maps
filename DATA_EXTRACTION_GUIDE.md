# Gothenburg Statistics Data Extraction Guide

## 📊 Finding the PDF Documents

1. **Visit the official website**: https://goteborg.se/wps/portal/enhetssida/statistik-och-analys/statistik/hamta-statistik/faktablad/goteborgsbladet

2. **Look for district-specific PDFs** that contain:
   - Population statistics
   - Crime statistics
   - Education levels
   - Income data
   - Housing information

## 🔍 Key Data Points to Extract

### For Each District, Look For:

#### **Population Data**
- Total population
- Population density
- Age distribution (0-17, 18-64, 65+)

#### **Crime Statistics**
- Total reported crimes
- Violent crimes
- Property crimes
- Crime rate per 1000 inhabitants

#### **Education Levels**
- Percentage with tertiary education
- Percentage with high school education
- Percentage with primary education only

#### **Income Data**
- Median household income
- Average income
- Percentage of low-income households

#### **Housing Information**
- Total number of housing units
- Percentage of rental housing
- Average rent

#### **Employment**
- Employment rate
- Unemployment rate

## 📋 Data Extraction Process

### Step 1: Download PDFs
Download the PDF documents for each district from the Gothenburg website.

### Step 2: Extract Text
Use one of these methods to extract text from PDFs:

#### **Method A: Online PDF to Text**
- Use online tools like: https://www.pdftotext.com/
- Upload each PDF and download the text

#### **Method B: Command Line (if you have pdftotext)**
```bash
# Install pdftotext (on macOS)
brew install poppler

# Extract text from PDF
pdftotext district_name.pdf district_name.txt
```

#### **Method C: Python Script**
```python
import PyPDF2

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text
```

### Step 3: Parse the Data
Use the provided `data-extractor.js` script to parse the extracted text.

## 📝 Example Data Format

Here's how the extracted data should be formatted for the map:

```javascript
const realAreaData = [
    {
        id: 'centrum',
        name: 'Centrum',
        crimeLevel: 45, // Calculated from crime rate
        tertiaryEducation: 78, // Percentage
        medianIncome: 420000, // SEK
        population: 45000,
        area: 2.1, // km²
        center: [57.7089, 11.9746]
    },
    // ... more districts
];
```

## 🔧 Integration Steps

### Step 1: Replace Mock Data
In `index-osm.html`, replace the mock `areaData` array with your extracted real data.

### Step 2: Update Crime Level Calculation
Adjust the `calculateCrimeLevel` function in `data-extractor.js` based on the actual crime rate ranges in your data.

### Step 3: Test the Application
Refresh your browser to see the real data visualized on the map.

## 📊 Data Sources to Look For

### Primary Sources:
- **Göteborgsbladet** - Main statistical publication
- **District-specific fact sheets**
- **Annual reports** for each district
- **Crime statistics** from police reports
- **Population statistics** from SCB (Statistics Sweden)

### Specific PDFs to Find:
1. **Centrum district statistics**
2. **Haga district statistics**
3. **Linnégatan district statistics**
4. **Vasastan district statistics**
5. **Olskroken district statistics**
6. **Angered district statistics**
7. **Bergsjön district statistics**
8. **Kortedala district statistics**
9. **Torslanda district statistics**
10. **Mölndal district statistics**

## 🎯 Tips for Data Extraction

1. **Look for tables** - Most statistics are presented in table format
2. **Check for footnotes** - Important context about data collection
3. **Note the year** - Make sure you're using recent data
4. **Verify units** - Ensure income is in SEK, population in numbers, etc.
5. **Cross-reference** - Compare data from multiple sources when possible

## 🔄 Updating the Map

Once you have the real data:

1. **Replace the mock data** in the JavaScript
2. **Adjust the crime level calculation** based on actual ranges
3. **Update the legend** if crime level ranges change
4. **Test with real data** to ensure visualization works correctly

## 📈 Expected Improvements

With real data, your map will show:
- **Accurate crime statistics** for each district
- **Real population numbers** and densities
- **Actual education levels** from official sources
- **True income data** from tax records
- **Current housing statistics**

This will make your Gothenburg Quality of Life Map a valuable tool for understanding the city's demographics and social indicators! 