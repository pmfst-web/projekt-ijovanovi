import { SPREMANJE_DMG } from "../actions/characters";




const damageReducer = (state = 0, action) => {
  switch (action.type) {
    case SPREMANJE_DMG: {
      const novi_dmg = action.payload;
        return novi_dmg;
    }
    default: {
      return state;
    }
  }
};
export default damageReducer;
