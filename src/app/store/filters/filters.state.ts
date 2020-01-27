export interface State {
  phrase: string;
  pageNumber: number;
  pagesCount: number;
}

export const initialState: State = {
  phrase: null,
  pageNumber: 1,
  pagesCount: 20,
};
