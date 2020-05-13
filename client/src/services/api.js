const root = `http://localhost:5000`;

const getCountries = () => {
  return new Promise((resolve, reject) => {
    resolve(fetch(`${root}/countries`).then((response) => response.json()));
  });
};

export default { getCountries };
