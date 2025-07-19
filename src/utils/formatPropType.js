// utils/formatPropType.js
export const formatPropType = (rawType) => {
  const mapping = {
    apartment: "Apartment",
    pentouse: "Penthouse",
    penthouse: "Penthouse",
    villa: "Villa",
    townhouse: "Town House",
    tounhouse: "Town House",  // fallback for typo
    officespace: "Office Space",
    office: "Office",
    space: "Space",
    independenthouse: "Independent House",
    house: "House"
  };

  // Normalize input
  const lower = rawType;

  // Extract matching words from the rawType
  const matches = Object.keys(mapping).filter((key) =>
    lower.includes(key)
  );

  // Remove duplicates and map to proper labels
  const formatted = [...new Set(matches)].map((key) => mapping[key]);

  return formatted.length > 0
    ? formatted.join(", ")
    : rawType.charAt(0).toUpperCase() + rawType.slice(1);
};
