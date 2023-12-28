export const icons = ['home', 'logout', 'book', 'search'] as const;

export type IconType = (typeof icons)[number];
