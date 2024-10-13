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
    start: "2024-11-05T12:00:00",
    end: "2024-11-05T13:00:00",
    content: "에스파",
    location: "대운동장",
    special: true,
  },
  {
    order: 2,
    start: "2024-11-05T13:00:00",
    end: "2024-11-05T14:00:00",
    content: "뉴진스",
    location: "대운동장",
    special: true,
  },
  {
    order: 3,
    start: "2024-11-05T14:00:00",
    end: "2024-11-05T15:00:00",
    content: "아이브",
    location: "대운동장",
    special: true,
  },
  {
    order: 4,
    start: "2024-11-05T15:00:00",
    end: "2024-11-05T16:00:00",
    content: "데이식스",
    location: "대운동장",
    special: false,
  },
  {
    order: 5,
    start: "2024-11-05T16:00:00",
    end: "2024-11-05T17:00:00",
    content: "세븐틴",
    location: "대운동장",
    special: false,
  },
  {
    order: 6,
    start: "2024-11-05T17:00:00",
    end: "2024-11-05T18:00:00",
    content: "라이즈",
    location: "대운동장",
    special: false,
  },
  {
    order: 7,
    start: "2024-11-05T18:00:00",
    end: "2024-11-05T19:00:00",
    content: "키스오브라이프",
    location: "대운동장",
    special: false,
  },

  // 2024-11-06 Events
  {
    order: 8,
    start: "2024-11-06T12:00:00",
    end: "2024-11-06T13:00:00",
    content: "NCT",
    location: "대운동장",
    special: true,
  },
  {
    order: 9,
    start: "2024-11-06T13:00:00",
    end: "2024-11-06T14:00:00",
    content: "스트레이키즈",
    location: "대운동장",
    special: true,
  },
  {
    order: 10,
    start: "2024-11-06T14:00:00",
    end: "2024-11-06T15:00:00",
    content: "르세라핌",
    location: "대운동장",
    special: true,
  },
  {
    order: 11,
    start: "2024-11-06T15:00:00",
    end: "2024-11-06T16:00:00",
    content: "TXT",
    location: "대운동장",
    special: false,
  },
  {
    order: 12,
    start: "2024-11-06T16:00:00",
    end: "2024-11-06T17:00:00",
    content: "ITZY",
    location: "대운동장",
    special: false,
  },
  {
    order: 13,
    start: "2024-11-06T17:00:00",
    end: "2024-11-06T18:00:00",
    content: "오마이걸",
    location: "대운동장",
    special: false,
  },
  {
    order: 14,
    start: "2024-11-06T18:00:00",
    end: "2024-11-06T19:00:00",
    content: "ATEEZ",
    location: "대운동장",
    special: false,
  },

  // 2024-11-07 Events
  {
    order: 15,
    start: "2024-11-07T12:00:00",
    end: "2024-11-07T13:00:00",
    content: "BTS",
    location: "대운동장",
    special: true, 
  },
  {
    order: 16,
    start: "2024-11-07T13:00:00",
    end: "2024-11-07T14:00:00",
    content: "트와이스",
    location: "대운동장",
    special: true,
  },
  {
    order: 17,
    start: "2024-11-07T14:00:00",
    end: "2024-11-07T15:00:00",
    content: "BLACKPINK",
    location: "대운동장",
    special: true, 
  },
  {
    order: 18,
    start: "2024-11-07T15:00:00",
    end: "2024-11-07T16:00:00",
    content: "EXO",
    location: "대운동장",
    special: false,
  },
  {
    order: 19,
    start: "2024-11-07T16:00:00",
    end: "2024-11-07T17:00:00",
    content: "레드벨벳",
    location: "대운동장",
    special: false,
  },
  {
    order: 20,
    start: "2024-11-07T17:00:00",
    end: "2024-11-07T18:00:00",
    content: "SHINee",
    location: "대운동장",
    special: false,
  },
  {
    order: 21,
    start: "2024-11-07T18:00:00",
    end: "2024-11-07T19:00:00",
    content: "아이유",
    location: "대운동장",
    special: true
  },
];
