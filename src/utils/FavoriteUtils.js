export const getFavorites = () => {
  let list = [];

  // Get from local storage
  const favoritesItemStorage = localStorage.getItem('favorites');

  if (favoritesItemStorage === null) {
    return list;
  }

  // Parse from local storage
  try {
    list = JSON.parse(favoritesItemStorage);

    // Fix incorrect data
    for (let item of list) {
      item['stop_id'] = parseInt(item['stop_id']);
    }

    localStorage.setItem('favorites', JSON.stringify(list));
  }
  catch (error) {
    console.error('Error parsing favorites data.', error);
  }

  return list;
};

export const favorites = getFavorites();

export const getFavorite = (stopId) => {
  let result = null;
  const favorites = getFavorites();

  for (let favorite of favorites) {
    if (favorite.stop_id !== stopId) {
      continue;
    }

    result = favorite;
    break;
  }

  return result;
};

export const toggleFavorite = (stopId, stopName) => {
  let result = false;
  let favorite = getFavorite(stopId);

  if (favorite === null) {
    favorite = {};
    favorite.stop_id = stopId;
    favorite.stop_name = stopName;

    favorites.push(favorite);
    console.log('Favorite added.');

    result = true;
  }
  else {
    const favorite = favorites.find(favorite => favorite.stop_id === stopId);
    const index = favorites.indexOf(favorite);

    if (index > -1) {
      favorites.splice(index, 1);
      console.log('Favorite deleted.');
    }
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  return result;
};