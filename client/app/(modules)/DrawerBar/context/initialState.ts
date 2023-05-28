export interface StateModule {
  search?: string
  isOpen: boolean
}


export const initialState: StateModule = {
  search: '',
  isOpen: true,
}
