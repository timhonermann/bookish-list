export const authFeatureKey = 'auth';

export type AuthState = {
  userId: string | null;
};

export const initialAuthState: AuthState = {
  userId: null,
};
