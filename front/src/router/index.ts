import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home.vue";
import AdminPanel from "@/views/adminpanel.vue";
import Trello from "@/views/trello.vue";
import Calendar from "@/views/calendar.vue";
import AddTrello from "@/views/addtrello.vue";
import AddMember from "@/views/addmember.vue";
import AddTable from "@/views/addtable.vue";
import Userview from "@/views/userview.vue";
import TrelloView from "@/views/trelloview.vue";
import TrelloColumn from "@/views/trellocolumn.vue";
import AddCard from "@/views/addcard.vue";

Vue.use(VueRouter);

const routes = [
  // dynamic segments start with a colon

  { path: "/user/:id", component: Userview },

  { path: "/table/:id", component: Userview },
  {
    path: "/",
    name: "Feuille de présence",
    component: Home,
  },
  {
    path: "/adminpanel",
    name: "Paneau d'administration",
    component: AdminPanel,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: "/trello",
    name: "Trello",
    component: Trello,
  },
  {
    path: "/addtrello",
    name: "Ajouter un Trello",
    component: AddTrello,
  },
  {
    path: "/trello/:name",
    name: "Board",
    component: TrelloView,
    children: [
      {
        path: ":column",
        name: "Board Column",
        component: TrelloColumn,
      },
    ],
  },
  {
    path: "/trello/:name/:column/addCard",
    name: "Ajouter une Carte",
    component: AddCard,
  },
  {
    path: "/addmember",
    name: "ajouter un membre",
    component: AddMember,
  },

  {
    path: "/addtable",
    name: "ajouter une table de jeux de rôle",
    component: AddTable,
  },

  {
    path: "/calendar",
    name: "calendrier",
    component: Calendar,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
