export const countryData = [
  {
    country: "Canada",
    university_name: "Laurentian University",
    university_image: "https://photos.applyboard.com/schools/000/000/250/logos/small/logo_template_%281%29.png?1544133473",
    program_name: "Master of Science - Computational Sciences (Course)",
    degree_level: "Master's Degree",
    tags: "High Job Demand, Loans, Scholarships Available",
    location: "Ontario, CAN",
    campus_city: "Sudbury",
    tuition_first_year: "$15,876 CAD",
    duration: "12 - 24 months",
  },
  {
    country: "Germany",
    university_name: "Lancaster University - Leipzig",
    university_image: "https://photos.applyboard.com/schools/000/002/639/logos/small/Lancaster_University_Leipzig_Logo.png?1726602794",
    program_name: "Business Management with Accounting and Finance",
    degree_level: "3-Year Bachelor's Degree",
    tags: "Scholarships Available",
    location: "Sachsen, GERMANY",
    tuition_first_year: "€18,000 EUR",
    duration: "44 months",
  },
  {
    country: "United Kingdom",
    university_name: "Harper Adams University",
    university_image: "https://photos.applyboard.com/schools/000/002/689/logos/small/harper-adams-logo.png?1738782152",
    program_name: "BSc (Honours) - Business Management",
    degree_level: "3-Year Bachelor's Degree",
    tags: "High Job Demand",
    location: "West Midlands, UK",
    tuition_first_year: "£16,500 GBP",
    duration: "36 months",
  },
  {
    country: "United States of America",
    university_name: "Westcliff University - Irvine",
    university_image: "https://photos.applyboard.com/schools/000/000/061/logos/small/Westcliff_University.png?1521738847",
    program_name: "Bachelor of Science - Information Technology",
    degree_level: "4-Year Bachelor's Degree",
    tags: "High Job Demand",
    location: "California, USA",
    tuition_first_year: "$23,010 USD",
    duration: "48 months",
  },
];

export const visitCountries = [
  'Thailand',
  'Malaysia', 
  'Indonesia',
  'Azerbaijan',
  'Singapore',
  'Hong Kong', // Note: Fixed from 'Hong-Kong' to match common usage
  'Maldives'
];

export const studyCountries = [
  // From Study_France sheet
  'France',
  'Sweden',
  'Germany',
  'Lithuania',
  'Cyprus',
  'Europe',
  // From Study-UK sheet
  'UK',
  'Australia', 
  'New Zealand',
  'Canada',
  'USA',
  // From Study_China sheet
  'Georgia',
  'South Korea',
  'China',
  'Malaysia'
];

// Remove duplicates and sort for study countries
export const uniqueStudyCountries = [...new Set(studyCountries)].sort();