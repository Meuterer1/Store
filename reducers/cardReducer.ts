import {
    ADD_TO_CARD,
    REMOVE_FROM_CARD,
    SET_PROMO_ACTIVE,
    UPDATE_QUANTITY,
    UPDATE_SUBTOTAL,
} from '../actions/cardActions/actionTypes';

export interface Card {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  count: number;
}

export interface CardState {
  card: Card[];
  subtotal: number;
  deliveryCost: number;
  deliveryPromo: number;
  promoCode: string;
  promoDiscount: number;
  note: string;
  isPromoActive: boolean;
}

export type CardAction =
  | { type: typeof ADD_TO_CARD; payload: Card }
  | { type: typeof REMOVE_FROM_CARD; payload: number }
  | { type: typeof SET_PROMO_ACTIVE; payload: boolean }
  | {
      type: typeof UPDATE_QUANTITY;
      payload: { productId: number; quantity: number };
    }
  | { type: typeof UPDATE_SUBTOTAL; payload: number };

const initialState: CardState = {
  card: [],
  subtotal: 0,
  deliveryCost: 19.99,
  deliveryPromo: 5,
  promoCode: 'promoCODE',
  promoDiscount: 15,
  note: '',
  isPromoActive: false,
};

const cardReducer = (state = initialState, action: CardAction): CardState => {
  switch (action.type) {
    case ADD_TO_CARD:
      const existingProduct = state.card.find(
        (item) => item.productId === action.payload.productId,
      );
      if (existingProduct) {
        if (typeof existingProduct.quantity === 'string') {
          existingProduct.quantity = parseInt(existingProduct.quantity);
        }
        if (typeof action.payload.quantity === 'string') {
          action.payload.quantity = parseInt(action.payload.quantity);
        }
        let updatedQuantity =
          existingProduct.quantity + action.payload.quantity;
        if (updatedQuantity > existingProduct.count) {
          updatedQuantity = existingProduct.count;
        }
        return {
          ...state,
          card: state.card
            .filter((item) => item.productId !== action.payload.productId)
            .concat({
              ...existingProduct,
              quantity: updatedQuantity,
            }),
        };
      } else {
        return {
          ...state,
          card: [...state.card, action.payload],
        };
      }

    case REMOVE_FROM_CARD:
      return {
        ...state,
        card: state.card.filter((item) => item.productId !== action.payload),
      };

    case SET_PROMO_ACTIVE:
      return {
        ...state,
        isPromoActive: action.payload,
      };

    case UPDATE_SUBTOTAL:
      return {
        ...state,
        subtotal: action.payload,
      };

    case UPDATE_QUANTITY:
      const updatedProduct = state.card.find(
        (item) => item.productId === action.payload.productId,
      );
      if (updatedProduct) {
        if (action.payload.quantity < updatedProduct.count) {
          return {
            ...state,
            card: state.card.map((item) =>
              item.productId === action.payload.productId
                ? { ...item, quantity: action.payload.quantity }
                : item,
            ),
          };
        } else {
          return {
            ...state,
            card: state.card.map((item) =>
              item.productId === action.payload.productId
                ? { ...item, quantity: updatedProduct.count }
                : item,
            ),
          };
        }
      }

    default:
      return state;
  }
};

export default cardReducer;
