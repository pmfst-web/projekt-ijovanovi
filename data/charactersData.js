import Character from "../models/character";

export const CHARACTERS = [
  //new Rad(0, "Ana", "React Native", "D"),
  //hp, atk, def, em, er, cr, cd, eb, pb
  // id, charcater, image, splash, vision, vision_image
  new Character(
    0,
    "Raiden Shogun",
    "https://paimon.moe/images/characters/raiden_shogun.png",
    'https://paimon.moe/images/characters/full/raiden_shogun.png',
    "Electro",
    "https://paimon.moe/images/elements/electro.png"
    ),
  new Character(
    1,
    "Eula",
    "https://paimon.moe/images/characters/eula.png",
    "https://paimon.moe/images/characters/full/eula.png",
    "Cryo",
    "https://paimon.moe/images/elements/cryo.png"
  ),
  new Character(
    2,
    "Hu Tao",
    "https://paimon.moe/images/characters/hu_tao.png",
    "https://paimon.moe/images/characters/full/hu_tao.png",
    "Pyro",
    "https://paimon.moe/images/elements/pyro.png"
  ),
  new Character(
    3,
    "Keqing",
    "https://paimon.moe/images/characters/keqing.png",
    'https://paimon.moe/images/characters/full/keqing.png',
    "Electro",
    "https://paimon.moe/images/elements/electro.png"
    ),

]