// utils/formatPropType.js
export const formatPropType = (rawType) => {
  const mapping = {
    apartment: "Apartment",
    pentouse: "Penthouse",
    penthouse: "Penthouse",
    villa: "Villa",
    townhouse: "Town House",
    tounhouse: "Town House",  // typo fallback
    officespace: "Office Space",
    office: "Office",
    space: "Space",
    independenthouse: "Independent House",
    house: "House"
  };

  if (!rawType) return '';

  // If it's an array, map each value
  if (Array.isArray(rawType)) {
    const formattedArray = rawType.map((type) => formatPropType(type)).filter(Boolean);
    return formattedArray.join(", ");
  }

  if (typeof rawType !== 'string') {
    console.warn('Unexpected propType format:', rawType);
    return '';
  }

  const lower = rawType.toLowerCase();

  const matches = Object.keys(mapping).filter((key) =>
    lower.includes(key)
  );

  const formatted = [...new Set(matches)].map((key) => mapping[key]);

  return formatted.length > 0
    ? formatted.join(", ")
    : rawType.charAt(0).toUpperCase() + rawType.slice(1);
};
