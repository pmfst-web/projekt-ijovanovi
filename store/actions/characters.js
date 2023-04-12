export const PROMJENA_FAVORITA = 'PROMJENA_FAVORITA';

export const promjenaFavorita = (id) => {
  return {
    type: PROMJENA_FAVORITA,
    idCharacter: id
  };
};


export const DODAVANJE_LIKA = 'DODAVANJE_LIKA';

export const dodavanjeLika = (id) => {
  return {
    type: DODAVANJE_LIKA,
    idCharacter: id,
  };
};

export const SPREMANJE_DMG = 'SPREMANJE_DMG';

export const spremanjeDMG = (num) => {
  return {
      type: SPREMANJE_DMG,
      payload: num
  };
};