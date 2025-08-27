# Timezone to Country Mapping

This directory contains comprehensive mappings between IANA timezone identifiers and their corresponding country codes, based on the official IANA Time Zone Database (tzdata). The mappings exclude backward compatibility entries and etcetera files, focusing only on canonical timezone identifiers.

## Files Structure

```
timezone-mappings/
├── README.md                    # This file
├── africa.js                    # African timezones module
├── america.js                   # North and South American timezones module
├── asia.js                      # Asian timezones module
├── europe.js                    # European timezones module
├── pacific.js                   # Pacific Ocean timezones module
├── australia.js                 # Australian timezones module
├── antarctica.js                # Antarctic timezones module
├── atlantic.js                  # Atlantic Ocean timezones module
├── indian.js                    # Indian Ocean timezones module
└── timezone-utils.js            # JavaScript utility library
```

## Data Format

Each JavaScript module exports timezone mappings in the following format:

```javascript
export const regionTimezones = {
  "Timezone/Identifier": {
    "countryCode": "ISO_3166_ALPHA2_CODE",
    "ianaSource": "source_file_name"
  }
};

export default regionTimezones;
```

### Example

```javascript
export const americaTimezones = {
  "America/New_York": {
    "countryCode": "US",
    "ianaSource": "northamerica"
  },
  "America/Toronto": {
    "countryCode": "CA",
    "ianaSource": "northamerica"
  }
};
```

## JavaScript Usage

### ES Modules (Recommended)

```javascript
import { TimezoneMapper, TimezoneUtils } from './timezone-utils.js';

// Create timezone mapper instance
const mapper = new TimezoneMapper();

// Load all timezone mappings
await mapper.loadMappings('./timezone-mappings/');

// Get country information for a timezone
const countryCode = mapper.getCountryCode('America/New_York');  // "US"
const countryName = mapper.getCountryName('America/New_York');  // "United States"
const sourceFile = mapper.getIanaSource('America/New_York');   // "northamerica"
```

### Loading Individual Modules

```javascript
import americaTimezones from './america.js';
import europeTimezones from './europe.js';

// Combine modules as needed
const combinedData = { ...americaTimezones, ...europeTimezones };

const mapper = new TimezoneMapper();
mapper.loadFromData(combinedData);
```

### Complete Timezone Information

```javascript
// Get complete timezone information
const info = mapper.getTimezoneInfo('Europe/London');
/*
{
  countryCode: "GB",
  ianaSource: "europe"
}
*/

// Get localized country name
const englishName = mapper.getCountryName('Asia/Tokyo', 'en');     // "Japan"
const frenchName = mapper.getCountryName('Asia/Tokyo', 'fr');      // "Japon"
const spanishName = mapper.getCountryName('Asia/Tokyo', 'es');     // "Japón"
```

### Finding Timezones by Country

```javascript
// Get all timezones for a specific country
const usTimezones = mapper.getTimezonesForCountry('US');
/*
[
  "America/Adak",
  "America/Anchorage", 
  "America/Boise",
  "America/Chicago",
  "America/Denver",
  "America/Detroit",
  // ... more US timezones
]
*/

// Get timezones grouped by country
const timezonsByCountry = mapper.getTimezonesByCountry('en');
/*
{
  "US": {
    "name": "United States",
    "timezones": ["America/Adak", "America/Anchorage", ...]
  },
  "GB": {
    "name": "United Kingdom", 
    "timezones": ["Europe/London"]
  }
}
*/
```

### Search and Discovery

```javascript
// Search timezones by name or country
const searchResults = mapper.searchTimezones('york', 'en');
// ["America/New_York"]

const europeResults = mapper.searchTimezones('United Kingdom', 'en');
// ["Europe/London"]

// Get all available timezone identifiers
const allTimezones = mapper.getAllTimezones();

// Get all countries with localized names
const allCountries = mapper.getAllCountries('en');
/*
[
  { code: "AD", name: "Andorra" },
  { code: "AE", name: "United Arab Emirates" },
  // ... sorted by country name
]
*/
```

### Utility Functions

```javascript
// Get user's current timezone
const userTz = TimezoneUtils.getUserTimezone();  // "America/New_York"

// Get timezone offset
const offset = TimezoneUtils.getTimezoneOffset('Europe/London');  // Offset in minutes

// Check if timezone is in daylight saving time
const isDST = TimezoneUtils.isDaylightSavingTime('America/New_York');

// Get timezone display name
const displayName = TimezoneUtils.getTimezoneDisplayName('America/New_York', 'en', 'long');
// "Eastern Standard Time" or "Eastern Daylight Time"

// Format date for specific timezone
const formatted = TimezoneUtils.formatDateForTimezone(
  new Date(), 
  'Asia/Tokyo',
  { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
);

// Convert time between timezones
const convertedDate = TimezoneUtils.convertTimezone(
  new Date(),
  'America/New_York',
  'Europe/London'
);

// Get all browser-supported timezones
const supported = TimezoneUtils.getSupportedTimezones();
```

## Node.js Usage

```javascript
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamic import in Node.js
async function loadTimezoneData(region) {
  const modulePath = join(__dirname, 'timezone-mappings', `${region}.js`);
  const module = await import(modulePath);
  return module.default;
}

// Example usage
const americaTimezones = await loadTimezoneData('america');
const nyInfo = americaTimezones['America/New_York'];
```

## Complete Example: Timezone Dropdown

```html
<!DOCTYPE html>
<html>
<head>
  <title>Timezone Selector</title>
</head>
<body>
  <select id="timezoneSelect">
    <option value="">Select a timezone...</option>
  </select>

  <script type="module">
    import { TimezoneMapper } from './timezone-utils.js';
    
    async function populateTimezoneDropdown() {
      const mapper = new TimezoneMapper();
      await mapper.loadMappings('./timezone-mappings/');
      
      const select = document.getElementById('timezoneSelect');
      const timezonsByCountry = mapper.getTimezonesByCountry('en');
      
      // Group timezones by country
      Object.entries(timezonsByCountry)
        .sort(([,a], [,b]) => a.name.localeCompare(b.name))
        .forEach(([countryCode, { name: countryName, timezones }]) => {
          const optgroup = document.createElement('optgroup');
          optgroup.label = countryName;
          
          timezones.forEach(timezone => {
            const option = document.createElement('option');
            option.value = timezone;
            option.textContent = timezone.replace(/.*\//, '').replace(/_/g, ' ');
            optgroup.appendChild(option);
          });
          
          select.appendChild(optgroup);
        });
    }
    
    populateTimezoneDropdown();
  </script>
</body>
</html>
```

## Module Details

### Regional Modules

Each regional module exports both a named export and a default export:

- **africa.js** - 54 African timezone identifiers
- **america.js** - 185 North and South American timezone identifiers  
- **asia.js** - 104 Asian timezone identifiers
- **europe.js** - 75 European timezone identifiers
- **pacific.js** - 48 Pacific Ocean timezone identifiers
- **australia.js** - 12 Australian timezone identifiers (including Macquarie Island)
- **antarctica.js** - 10 Antarctic research station timezone identifiers
- **atlantic.js** - 10 Atlantic Ocean timezone identifiers
- **indian.js** - 11 Indian Ocean timezone identifiers

### Data Sources

- **IANA Time Zone Database**: Official source for timezone identifiers
- **ISO 3166-1**: Country codes standard
- **IANA Source Files**: Maps to original tzdata source files:
  - `africa` - African timezones
  - `antarctica` - Antarctic research stations
  - `asia` - Asian timezones
  - `australasia` - Australia, New Zealand, and Pacific islands
  - `europe` - European timezones
  - `northamerica` - North American timezones
  - `southamerica` - South American timezones

## Excluded Data

This mapping explicitly excludes:
- **Backward compatibility entries** (deprecated timezone names)
- **Etcetera entries** (GMT+/-X style timezones)
- **Factory timezone** (placeholder timezone)

## Browser Compatibility

The utility library works in all modern browsers that support:
- ES6 modules (`import`/`export`)
- `Intl.DateTimeFormat` (ES6+)
- `Intl.DisplayNames` (ES2021, graceful fallback)

For older browsers, consider using:
- Module bundlers (Webpack, Rollup, etc.)
- Babel transpilation
- Intl polyfills

## Performance Considerations

- **Lazy loading**: Load only the regional modules you need
- **Tree shaking**: Modern bundlers can eliminate unused regions
- **Caching**: Timezone mappings are static and can be cached indefinitely
- **Memory usage**: Each timezone entry uses ~50 bytes

## License

This data is derived from the public domain IANA Time Zone Database.