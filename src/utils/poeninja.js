// Category	API
// Currency	https://poe.ninja/api/data/currencyoverview?league=Blight&type=Currency
// Fragment	https://poe.ninja/api/data/currencyoverview?league=Blight&type=Fragment
// Oils	https://poe.ninja/api/data/itemoverview?league=Blight&type=Oil
// Incubators	https://poe.ninja/api/data/itemoverview?league=Blight&type=Incubator
// Scarabs	https://poe.ninja/api/data/itemoverview?league=Blight&type=Scarab
// Fossils	https://poe.ninja/api/data/itemoverview?league=Blight&type=Fossil
// Resonators	https://poe.ninja/api/data/itemoverview?league=Blight&type=Resonator
// Essence	https://poe.ninja/api/data/itemoverview?league=Blight&type=Essence
// Divination Cards	https://poe.ninja/api/data/itemoverview?league=Blight&type=DivinationCard
// Prophecies	https://poe.ninja/api/data/itemoverview?league=Blight&type=Prophecy
// Skill Gems	https://poe.ninja/api/data/itemoverview?league=Blight&type=SkillGem
// Base Types	https://poe.ninja/api/data/itemoverview?league=Blight&type=BaseType
// Helmet Enchants	https://poe.ninja/api/data/itemoverview?league=Blight&type=HelmetEnchant
// Unique Maps	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueMap
// Maps	https://poe.ninja/api/data/itemoverview?type=Map&league=Standard
// Unique Jewels	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueJewel
// Unique Flasks	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueFlask
// Unique Weapons	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueWeapon
// Unique Armours	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueArmour
// Unique Accessories	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueAccessory
// Beasts	https://poe.ninja/api/data/itemoverview?league=Blight&type=Beast

import POE_NINJA_BASE_URL from '../api/poeninja'

const itemTypes = {
  currency: {
    id: 'Currency',
  },
  oil: {
    id: 'Oil',
  }
}
const poeNinjaURLBuilder = (objectType, endpoint = 'itemoverview', league = 'Standard' ) => {
  return `${endpoint}?league=${league}&type=${objectType}`
}

export {
  poeNinjaURLBuilder,
  itemTypes
}