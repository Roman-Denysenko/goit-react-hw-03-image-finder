const KEY = `19168514-abe4fd6e9277293fb68a0fc7f`;
const URL = `https://pixabay.com/api`;

export const handleFetchApi = async (search, page, handleIncrementPage) => {
  try {
    const response = await fetch(
      `${URL}/?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`,
    );
    const data = response.json();
    handleIncrementPage();
    return data;
  } catch (error) {
    throw error;
  }
};
