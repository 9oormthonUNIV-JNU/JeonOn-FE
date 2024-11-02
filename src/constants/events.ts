import kimNayeong from "@/../public/images/special-guest/kimNayeong.png";
import royKim from "@/../public/images/special-guest/royKim.png";
import marktub from "@/../public/images/special-guest/marktub.png";
import mimirose from "@/../public/images/special-guest/mimirose.png";
import bumjin from "@/../public/images/special-guest/bumjin.png";
import bewhy from "@/../public/images/special-guest/bewhy.png";
import yountoven from "@/../public/images/special-guest/yountoven.png";
import chungha from "@/../public/images/special-guest/chungha.png";
import hahaskull from "@/../public/images/special-guest/hahaskull.png";
import hanyohan from "@/../public/images/special-guest/hanyohan.png";

export type EventType = {
  order: number;
  start: string;
  end: string;
  content: string;
  location: string;
  special: boolean;
  img?: string;
};

export const events: EventType[] = [
  // 2024-11-05 Events
  {
    order: 1,
    start: "2024-11-05T17:00:00",
    end: "2024-11-05T17:30:00",
    content: "로터스",
    location: "대운동장",
    special: false,
  },
  {
    order: 2,
    start: "2024-11-05T17:30:00",
    end: "2024-11-05T17:50:00",
    content: "하이코드",
    location: "대운동장",
    special: false,
  },
  {
    order: 3,
    start: "2024-11-05T17:50:00",
    end: "2024-11-05T18:20:00",
    content: "미올",
    location: "대운동장",
    special: false,
  },
  {
    order: 4,
    start: "2024-11-05T18:20:00",
    end: "2024-11-05T18:40:00",
    content: "릿치",
    location: "대운동장",
    special: false,
  },
  {
    order: 5,
    start: "2024-11-05T18:40:00",
    end: "2024-11-05T19:00:00",
    content: "동아리 퀴즈",
    location: "대운동장",
    special: false,
  },
  {
    order: 6,
    start: "2024-11-05T19:00:00",
    end: "2024-11-05T19:40:00",
    content: "개막식",
    location: "대운동장",
    special: false,
  },
  {
    order: 7,
    start: "2024-11-05T20:00:00",
    end: "2024-11-05T20:40:00",
    content: "로이킴",
    location: "대운동장",
    special: true,
    img: royKim,
  },
  {
    order: 8,
    start: "2024-11-05T20:50:00",
    end: "2024-11-05T21:20:00",
    content: "윤토벤",
    location: "대운동장",
    special: true,
    img: yountoven,
  },
  {
    order: 9,
    start: "2024-11-05T21:50:00",
    end: "2024-11-05T22:30:00",
    content: "하하&스컬",
    location: "대운동장",
    special: true,
    img: hahaskull,
  },

  // 2024-11-06 Events
  {
    order: 10,
    start: "2024-11-06T16:30:00",
    end: "2024-11-06T16:50:00",
    content: "맥퀸토시",
    location: "대운동장",
    special: false,
  },
  {
    order: 11,
    start: "2024-11-06T16:50:00",
    end: "2024-11-06T17:20:00",
    content: "선율",
    location: "대운동장",
    special: false,
  },
  {
    order: 12,
    start: "2024-11-06T17:20:00",
    end: "2024-11-06T17:50:00",
    content: "알케미",
    location: "대운동장",
    special: false,
  },
  {
    order: 13,
    start: "2024-11-06T17:50:00",
    end: "2024-11-06T18:20:00",
    content: "숨",
    location: "대운동장",
    special: false,
  },
  {
    order: 14,
    start: "2024-11-06T18:20:00",
    end: "2024-11-06T18:45:00",
    content: "동아리 퀴즈",
    location: "대운동장",
    special: false,
  },
  {
    order: 15,
    start: "2024-11-06T18:45:00",
    end: "2024-11-06T18:55:00",
    content: "동아리 퀴즈",
    location: "대운동장",
    special: false,
  },
  {
    order: 16,
    start: "2024-11-06T18:55:00",
    end: "2024-11-06T19:20:00",
    content: "새내기를 찾아라",
    location: "대운동장",
    special: false,
  },
  {
    order: 17,
    start: "2024-11-06T19:30:00",
    end: "2024-11-06T20:00:00",
    content: "미미로즈",
    location: "대운동장",
    special: true,
    img: mimirose,
  },
  {
    order: 18,
    start: "2024-11-06T20:10:00",
    end: "2024-11-06T20:40:00",
    content: "마크툽",
    location: "대운동장",
    special: true,
    img: marktub,
  },
  {
    order: 19,
    start: "2024-11-06T20:50:00",
    end: "2024-11-06T21:20:00",
    content: "한요한",
    location: "대운동장",
    special: true,
    img: hanyohan,
  },
  {
    order: 20,
    start: "2024-11-06T21:30:00",
    end: "2024-11-06T22:10:00",
    content: "김나영",
    location: "대운동장",
    special: true,
    img: kimNayeong,
  },

  // 2024-11-07 Events
  {
    order: 21,
    start: "2024-11-07T16:00:00",
    end: "2024-11-07T16:20:00",
    content: "바이슨",
    location: "대운동장",
    special: false,
  },
  {
    order: 22,
    start: "2024-11-07T16:20:00",
    end: "2024-11-07T16:50:00",
    content: "메이플",
    location: "대운동장",
    special: false,
  },
  {
    order: 23,
    start: "2024-11-07T16:50:00",
    end: "2024-11-07T17:20:00",
    content: "뉴에라",
    location: "대운동장",
    special: false,
  },
  {
    order: 24,
    start: "2024-11-07T17:20:00",
    end: "2024-11-07T17:30:00",
    content: "동아리 퀴즈",
    location: "대운동장",
    special: false,
  },
  {
    order: 25,
    start: "2024-11-07T17:30:00",
    end: "2024-11-07T19:30:00",
    content: "CUB 대학가요제",
    location: "대운동장",
    special: false,
  },
  {
    order: 26,
    start: "2024-11-07T20:00:00",
    end: "2024-11-07T20:30:00",
    content: "범진",
    location: "대운동장",
    special: true,
    img: bumjin,
  },
  {
    order: 27,
    start: "2024-11-07T20:30:00",
    end: "2024-11-07T21:10:00",
    content: "내가 제일 잘나가",
    location: "대운동장",
    special: false,
  },
  {
    order: 28,
    start: "2024-11-07T21:10:00",
    end: "2024-11-07T21:35:00",
    content: "청하",
    location: "대운동장",
    special: true,
    img: chungha,
  },
  {
    order: 29,
    start: "2024-11-07T21:45:00",
    end: "2024-11-07T22:30:00",
    content: "비와이",
    location: "대운동장",
    special: true,
    img: bewhy,
  },
];
