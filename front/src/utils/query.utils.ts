type Params = Record<string, string | boolean | number>;

type Process = {
  env: {
    VUE_APP_TRELLO_KEY: string;
    VUE_APP_TRELLO_TOKEN: string;
  };
};

const trelloParams = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  key: (process as Process).env.VUE_APP_TRELLO_KEY,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  token: (process as Process).env.VUE_APP_TRELLO_TOKEN,
};

export const getRequestURL = (
  baseURL: string,
  params?: Params,
  isTrello = true
) => {
  const fullParams = isTrello
    ? {
        ...params,
        ...trelloParams,
      }
    : params;
  const paramsString = fullParams
    ? Object.entries(fullParams).reduce(
        (result, [paramName, paramValue]) =>
          result + `&${paramName}=${paramValue}`,
        ""
      )
    : "";
  return `${baseURL}?${paramsString}`;
};
