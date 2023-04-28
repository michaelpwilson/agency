import { createStore } from 'redux';

export interface IOption {
  id: string,
  answer: string,
  hours: number,
  price: number
}

export interface InitialState {
  stepIndex: number,
  selectedOptions: IOption[],
  total: number
};

export const initialState: InitialState = {
  stepIndex: 0,
  selectedOptions: [],
  total: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STEP_INDEX':
      return { ...state, stepIndex: action.payload };
    case 'SET_SELECTED_OPTIONS':
      return { ...state, selectedOptions: [...state.selectedOptions, action.payload] };
    case 'SET_TOTAL':
      return {
        ...state,
        total: state.selectedOptions.reduce((acc, option) => {
          return acc + option.price;
        }, 0)
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;