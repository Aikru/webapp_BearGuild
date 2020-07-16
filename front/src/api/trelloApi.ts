import { getRequestURL } from "@/utils/query.utils";

type Params = Record<string, string | boolean | number>;
export interface TrelloBoard extends Params {
  name: string;
  id: string;
  desc: string;
  dateLastActivity: string;
  prefs_permissionLevel: string;
}
export interface TrelloList extends Params {
  name: string;
  id: string;
  idBoard: string;
  closed: boolean;
  pos: number;
}

export interface TrelloCard extends Params {
  name: string;
  id: string;
  desc: string;
  idBoard: string;
  idList: string;
  pos: number;
}

const trelloBaseURL = "https://api.trello.com/1";
const trelloMemberBoardURL = `${trelloBaseURL}/members/me/boards`;
const trelloBoardURL = `${trelloBaseURL}/board`;
const trelloListURL = `${trelloBaseURL}/list`;
const trelloCardURL = `${trelloBaseURL}/card`;

export const formatTrelloDate = (dateString: string) =>
  new Intl.DateTimeFormat("fr-FR").format(new Date(dateString));

export const getTrelloBoards = (): Promise<Array<TrelloBoard>> =>
  fetch(getRequestURL(trelloMemberBoardURL)).then(res => res.json());

export const addTrelloBoard = (params: TrelloBoard): Promise<TrelloBoard> =>
  fetch(getRequestURL(trelloBoardURL, params), {
    method: "POST",
  }).then(res => res.json());
export const deleteTrelloBoard = (boardId: string) =>
  fetch(getRequestURL(`${trelloBoardURL}/${boardId}`), {
    method: "DELETE",
  }).then(res => res.json());

export const getListsInTrelloBoard = (
  boardId: string
): Promise<Array<TrelloList>> =>
  fetch(getRequestURL(`${trelloBoardURL}/${boardId}/lists`)).then(res =>
    res.json()
  );
export const archiveTrelloList = (listID: string) =>
  fetch(getRequestURL(`${trelloListURL}/${listID}/closed`)).then(res => {
    console.log(res);
    return res.json();
  });

export const getCardsInTrelloBoard = (boardId: string) =>
  fetch(getRequestURL(`${trelloBoardURL}/${boardId}/cards`)).then(res =>
    res.json()
  );
export const getCardsinTrelloList = (listID: string) =>
  fetch(getRequestURL(`${trelloListURL}/${listID}/cards`)).then(res =>
    res.json()
  );
export const addTrelloCard = (
  params: TrelloCard,
  listID: string
): Promise<TrelloCard> =>
  fetch(getRequestURL(trelloCardURL, { ...params, idList: listID }), {
    method: "POST",
  }).then(res => res.json());
export const deleteTrelloCard = (cardId: string) =>
  fetch(getRequestURL(`${trelloCardURL}/${cardId}`), {
    method: "DELETE",
  }).then(res => res.json());
//.then(res => {console.log(res); return res.json();});
