/* eslint-disable no-use-before-define */

import Vue from "vue";
import Vuex from "vuex";
import { createDirectStore } from "direct-vuex";
import { TrelloBoard, TrelloList, TrelloCard } from "@/api/trelloApi";
import { getRequestURL } from "@/utils/query.utils";

interface User {
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  id: number;
}

Vue.use(Vuex);

export const getAuthHeader = (): {} | { Authorization: string } => {
  try {
    const userInStorage = window.localStorage.getItem("bearguildUser");
    if (!userInStorage) {
      throw new Error("No local storage");
    }

    const user = JSON.parse(userInStorage);
    if (!user || !user.accessToken) {
      throw new Error("No user in storage");
    }

    return {
      Authorization: user.accessToken,
    };
  } catch (error) {
    return {};
  }
};

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  state: {
    isMenuOpen: false,
    // function() {
    //   return { isMenuOpen: Boolean };
    // },
    Members: [],
    Tables: [],
    TrelloBoards: [] as Array<TrelloBoard>,
    TrelloListsForBoard: {} as Record<string, Array<TrelloList>>,
    TrelloCardsForList: {} as Record<string, Array<TrelloCard>>,
    User: {} as User,
  },
  mutations: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
      //store.state.isMenuOpen = !store.state.isMenuOpen;
    },
    updateUser(state, db) {
      state.Members = db;
    },
    setCurrentUser(state, user) {
      state.User = user;
    },
    updateTables(state, db) {
      state.Tables = db;
    },
    setTrelloBoards(state, boards) {
      state.TrelloBoards = boards;
    },
    setTrelloListsForBoard(
      state,
      {
        boardID,
        trelloLists,
      }: { boardID: string; trelloLists: Array<TrelloList> }
    ) {
      state.TrelloListsForBoard = {
        ...state.TrelloListsForBoard,
        [boardID]: trelloLists,
      };
    },
    setTrelloCardsForList(
      state,
      {
        listID,
        trelloCards,
      }: { listID: string; trelloCards: Array<TrelloCard> }
    ) {
      state.TrelloCardsForList = {
        ...state.TrelloCardsForList,
        [listID]: trelloCards,
      };
    },
  },
  actions: {
    togglingMenu(context) {
      const { commit } = rootActionContext(context);
      commit.toggleMenu();
    },

    sendUser(context, user) {
      const myHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeader(),
      };

      const myInit = {
        method: "post",
        headers: myHeaders,
        mode: "cors" as "cors",
        cache: "default" as "default",
        body: JSON.stringify(user),
      };

      fetch("http://localhost:4000/api/users", myInit).then(function(response) {
        return response.json();
      });
    },

    callConnexion(context, loguser) {
      const myHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const myInit = {
        method: "post",
        headers: myHeaders,
        mode: "cors" as "cors",
        cache: "default" as "default",
        body: JSON.stringify(loguser),
      };

      fetch("http://localhost:4000/api/login", myInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(result) {
          if (result.accessToken && result.userId) {
            window.localStorage.setItem(
              "bearguildUser",
              JSON.stringify(result)
            );

            const { dispatch } = rootActionContext(context);
            dispatch.getUser({
              id: result.userId,
              accessToken: result.accessToken,
            });
          }

          return result;
        });
    },

    getUser(context, { id, accessToken }) {
      const myHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeader(),
      };
      const myInit = {
        method: "get",
        headers: myHeaders,
        mode: "cors" as "cors",
        cache: "default" as "default",
      };

      fetch(`http://localhost:4000/api/users/${id}`, myInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(result) {
          const { commit } = rootActionContext(context);
          commit.setCurrentUser(result);

          return result;
        });
    },

    setUser(context, user) {
      const { commit } = rootActionContext(context);
      commit.setCurrentUser(user);
    },

    sendMemberlist(context, { body, isUpdate, id }) {
      const myHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeader(),
      };
      const myInit = {
        method: isUpdate ? "PUT" : "POST",
        headers: myHeaders,
        mode: "cors" as "cors",
        cache: "default" as "default",
        body: JSON.stringify(body),
      };

      try {
        fetch(
          `http://localhost:4000/api/sessions/${isUpdate ? id : ""}`,
          myInit
        )
          .then(async function(response) {
            if (response.status >= 400) {
              const currResJson: {
                errors: Array<string>;
              } = await response.json();
              throw new Error(currResJson.errors.join("~"));
            }
            return response.json();
          })
          .then(function(db) {
            if (isUpdate) return;
            // const { commit } = rootActionContext(context);
            // commit.updateUser(db);
          });
      } catch (error) {
        console.log(error.split("~"));
      }
    },

    sendTable(context, table) {
      const myHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeader(),
      };
      const myInit = {
        method: "post",
        headers: myHeaders,
        mode: "cors" as "cors",
        cache: "default" as "default",
        body: JSON.stringify(table),
      };

      fetch("http://localhost:4000/api/jdr", myInit).then(function(response) {
        return response.json();
      });
    },

    loadUsers(context) {
      const myHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeader(),
      };
      const myInit = {
        method: "GET",
        headers: myHeaders,
        mode: "cors" as "cors",
        cache: "default" as "default",
      };

      try {
        fetch("http://localhost:4000/api/users", myInit)
          .then(async function(response) {
            if (response.status >= 400) {
              const currResJson: {
                errors: Array<string>;
              } = await response.json();
              throw new Error(currResJson.errors.join("~"));
            }
            return response.json();
          })
          .then(function(db) {
            const { commit } = rootActionContext(context);
            commit.updateUser(db);
          });
      } catch (error) {
        console.log(error.split("~"));
      }
    },
    loadTables(context) {
      const myHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeader(),
      };
      const myInit = {
        method: "GET",
        headers: myHeaders,
        mode: "cors" as "cors",
        cache: "default" as "default",
      };
      fetch("http://localhost:4000/api/jdr", myInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(db) {
          const { commit } = rootActionContext(context);
          commit.updateTables(db);
        });
    },
  },
});

// Export the direct-store instead of the classic Vuex store.
export default store;

// The following exports will be used to enable types in the
// implementation of actions and getters.
export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
};

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}
