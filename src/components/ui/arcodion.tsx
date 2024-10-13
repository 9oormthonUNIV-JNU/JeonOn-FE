import "@/../public/assets/fonts/font.css";
import location_black from "@/../public/assets/svgs/location_black.svg";
import location_white from "@/../public/assets/svgs/location_white.svg";
import { useState, useRef, useEffect } from "react";

type EventType = {
  order: number;
  start: string;
  end: string;
  content: string;
  location: string;
};

const events: EventType[] = [
  {
    order: 1,
    start: "2024-11-05T12:00:00",
    end: "2024-11-05T13:00:00",
    content: "에스파",
    location: "대운동장",
  },
  {
    order: 2,
    start: "2024-11-05T13:00:00",
    end: "2024-11-05T14:00:00",
    content: "뉴진스",
    location: "대운동장",
  },
  {
    order: 3,
    start: "2024-11-05T14:00:00",
    end: "2024-11-05T15:00:00",
    content: "아이브",
    location: "대운동장",
  },
  {
    order: 4,
    start: "2024-11-05T15:00:00",
    end: "2024-11-05T16:00:00",
    content: "데이식스",
    location: "대운동장",
  },
  {
    order: 5,
    start: "2024-11-05T16:00:00",
    end: "2024-11-05T17:00:00",
    content: "세븐틴",
    location: "대운동장",
  },
  {
    order: 6,
    start: "2024-11-05T17:00:00",
    end: "2024-11-05T18:00:00",
    content: "라이즈",
    location: "대운동장",
  },
  {
    order: 7,
    start: "2024-11-05T18:00:00",
    end: "2024-11-05T19:00:00",
    content: "키스오브라이프",
    location: "대운동장",
  },
];

const Now = ({ nowActive }: { nowActive: boolean }) => {
  return (
    <div
      className={`flex mr-1 justify-center font-pretendard items-center bg-main font-black text-black rounded-3xl w-12 h-7
        ${nowActive ? "visible" : "invisible"}`}
    >
      NOW
    </div>
  );
};

const EventDetils = ({
  event,
  nowActive,
}: {
  event: EventType;
  nowActive: boolean;
}) => {
  return (
    <>
      <Now nowActive={nowActive} />
      <span className="truncate">
        {new Date(event.start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
        ~
        {new Date(event.end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
      <span className="truncate">{event.content}</span>
      <div className="flex items-center gap-2 ml-auto mr-2">
        <img src={nowActive ? location_white : location_black} />
        <span className="truncate">{event.location}</span>
      </div>
    </>
  );
};

export const Arcodion = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const arcodionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateCurrentTime = () => {
      // 배포 시 변경 필요
      setCurrentTime(new Date("2024-11-05T12:00:00"));
    };
    updateCurrentTime();

    // 1분마다 업데이트
    const intervalId = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const isCurrentEvent = (start: string, end: string) => {
    if (!currentTime) return false;
    const startTime = new Date(start);
    const endTime = new Date(end);
    return currentTime >= startTime && currentTime < endTime;
  };

  const currentEvent = events.find((event) =>
    isCurrentEvent(event.start, event.end)
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      arcodionRef.current &&
      !arcodionRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleInteraction = () => {
    setOpen(!open);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={arcodionRef} className="font-pretendard text-xs">
      {!open ? (
        <div
          onClick={handleInteraction}
          className="flex flex-row items-center w-full h-12 bg-white rounded-3xl py-2.5 px-3 gap-1"
        >
          {currentEvent && (
            <EventDetils event={currentEvent} nowActive={true} />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-start w-full h-72 bg-white rounded-3xl overflow-y-auto">
          <div className="flex flex-col w-full h-full py-2 px-2">
            {events.map((event) => {
              const nowActive = isCurrentEvent(event.start, event.end);
              const nowClasses = `rounded-3xl gap-2 w-full h-12 flex flex-row items-center py-2.5 px-3 ${
                nowActive ? "bg-black text-white" : "bg-none text-black"
              } `;
              return (
                <div className={nowClasses} key={event.order}>
                  <EventDetils event={event} nowActive={nowActive} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
