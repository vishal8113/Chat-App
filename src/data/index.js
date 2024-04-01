import { ChatCircleDots, Users, Phone } from "phosphor-react";
import { faker } from "@faker-js/faker";

const NavButton = [
  {
    index: 0,
    icon: <ChatCircleDots></ChatCircleDots>,
  },
  {
    index: 1,
    icon: <Users></Users>,
  },
  {
    index: 2,
    icon: <Phone></Phone>,
  },
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "4:50",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "6:40",
    unread: 2,
    pinned: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:10",
    unread: 5,
    pinned: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "2:00",
    unread: 1,
    pinned: false,
    online: false,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:50",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "7:00",
    unread: 10,
    pinned: false,
    online: true,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "8:00",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "3:15",
    unread: 0,
    pinned: false,
    online: false,
  },
];

export { NavButton, ChatList };
