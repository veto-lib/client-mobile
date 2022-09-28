let token: string | null = null;

const getToken = () => {
  return token;
};

const setToken = (value: string) => {
  token = value;
};

export { getToken, setToken };
