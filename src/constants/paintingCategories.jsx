export const CATEGORIES = [
    '4515733-bloemen',
    '4515733-portretten',
    // '26137-schepen',
];

export function getCategoryName(category) {
    const parts = category.split('-');
    const name = parts[1]; // Gebruik de tekst na het koppelteken
    return name.charAt(0).toUpperCase() + name.slice(1); // Maak de eerste letter hoofdletter
}