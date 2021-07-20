export const GET_BREED_DETAIL = "GET_BREED_DETAIL";
export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_BREED = "GET_BREED";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const BREED_SORT = "BREED_SORT";
export const ASC = "Breeds-A-Z";
export const DES = "Breeds-Z-A";

export function getAllBreeds() {
  return function (dispatch) {
    fetch(`http://localhost:3001/dogs`)
      .then((data) => data.json())
      .then((json) => dispatch({ type: GET_ALL_BREEDS, payload: json }));
  };
}

export function getBreedDetail(breedId) {
  return function (dispatch) {
    fetch(`http://localhost:3001/dogs/${breedId}`)
      .then((data) => data.json())
      .then((json) => dispatch({ type: GET_BREED_DETAIL, payload: json }));
  };
}

export function getBreed(breedName) {
  return function (dispatch) {
    fetch(`http://localhost:3001/dogs?name=${breedName}`)
      .then((data) => data.json())
      .then((json) => dispatch({ type: GET_BREED, payload: json }));
  };
}

export function getTemp() {
  return function (dispatch) {
    fetch(`http://localhost:3001/temperament`)
      .then((data) => data.json())
      .then((json) => dispatch({ type: GET_TEMPERAMENT, payload: json }));
  };
}

export function sort(order, breeds) {
  let breedSort = [...breeds];

  breedSort.sort((a, b) => {
    var firstName = a.name.toUpperCase();
    var secName = b.name.toUpperCase();
    if(order === ASC) {
      if (firstName < secName) {
        return -1;
      }
      if (firstName > secName) {
        return 1;
      }
      return 0;
    }
    if(order === DES) {
      if (firstName < secName) {
        return 1;
      }
      if (firstName > secName) {
        return -1;
      }
      return 0;
    }
    return null;
  });
  return function (dispatch) {
    dispatch({ type: BREED_SORT, payload: breedSort });
  };
}
export function tempFilter(actualBreed, temp) {
  let filtro = [...actualBreed];
  filtro = filtro.filter((actual) => {
    if (actual.temperament) {
      let breedTemp = actual.temperament.split(", ");
      return breedTemp.includes(temp);
    } else {
      return false;
    }
  });
  return function (dispatch) {
    dispatch({ type: BREED_SORT, payload: filtro });
  };
}
