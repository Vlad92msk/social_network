export type Theme = 'default' | 'red' | 'orange'

/* Язык по умолчанию */
export const DEFAULT_THEME: Theme = 'default';

export interface StateModule {
  theme: Theme;
}


export const initialState: StateModule = {
  theme: DEFAULT_THEME,
};
