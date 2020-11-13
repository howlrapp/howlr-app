// this part is only used to take screenshots
let fakeUsers = [];
if (process.env.NODE_ENV === 'development') {
  fakeUsers = [
    {
      id: "1",
      name: "Sushi",
      avatarUrl: require("../assets/avatars/1.png"),
      distance: 0
    },
    {
      id: "2",
      name: "Gatsby",
      avatarUrl: require("../assets/avatars/2.png"),
      distance: 0
    },
    {
      id: "3",
      name: "Martin",
      avatarUrl: require("../assets/avatars/3.png"),
      distance: 0
    },
    {
      id: "4",
      name: "Tholomyès",
      avatarUrl: require("../assets/default-avatar.png"),
      distance: 0
    },
    {
      id: "5",
      name: "Atticus",
      avatarUrl: require("../assets/avatars/5.png"),
      distance: 0
    },
    {
      id: "6",
      name: "Scout",
      avatarUrl: require("../assets/avatars/6.png"),
      distance: 0
    },
    {
      id: "7",
      name: "Emma",
      avatarUrl: require("../assets/avatars/9.png"),
      distance: 0
    },
    {
      id: "8",
      name: "Holden",
      avatarUrl: require("../assets/avatars/8.png"),
      distance: 0
    },
    {
      id: "9",
      name: "Juliette",
      avatarUrl: require("../assets/avatars/7.png"),
      distance: 0
    },
    {
      id: "10",
      name: "Cosette",
      avatarUrl: require("../assets/avatars/10.png"),
      distance: 0
    },
    {
      id: "11",
      name: "Marius",
      avatarUrl: require("../assets/avatars/11.png"),
      distance: 0
    },
    {
      id: "12",
      name: "Garp",
      avatarUrl: require("../assets/avatars/12.png"),
      distance: 0
    },
  ]
}

export default fakeUsers;
