// this part is only used to take screenshots
let fakeUser = [];
if (process.env.NODE_ENV === 'development') {
  fakeUser = {
    id: "1",
    name: "Sushi",
    avatarUrl: require("../assets/avatars/1.png"),
    distance: 0,
    lastSeenAt: new Date()
  }
}

export default fakeUser;
