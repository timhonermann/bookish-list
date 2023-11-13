export const icons = ['home', 'logout', 'book'] as const;

export type IconType = (typeof icons)[number];
