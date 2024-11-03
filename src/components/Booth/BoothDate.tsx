interface BoothDateProps {
  selectedDate: number | null;
  onDateChange: (number: number) => void;
}

export default function BoothDate({
  selectedDate,
  onDateChange,
}: BoothDateProps) {
  const dates = [
    { number: 5, day: "화" },
    { number: 6, day: "수" },
    { number: 7, day: "목" },
  ];

  const handleDateClick = (number: number) => {
    if (selectedDate === number) {
      onDateChange(null);
    } else {
      onDateChange(number);
    }
  };

  return (
    <div className="relative w-full max-w-[90vw] h-auto mx-auto mt-[-3rem] mb-3">
      <div className="flex justify-center items-end gap-[20vw]">
        {dates.map((date) => (
          <div
            key={date.number}
            className="mb-10 flex flex-col items-center relative"
            style={{
              height: "10rem",
            }}
          >
            <div
              className={`absolute bottom-0 cursor-pointer font-cafe24 transition-transform duration-300 ease-in-out ${
                selectedDate === date.number
                  ? "text-[#00ff00] text-[4.5rem] translate-y-[-15%] scale-110"
                  : "text-white text-[4rem] translate-y-0 scale-100"
              }`}
              style={{ willChange: "transform, color" }}
              onClick={() => handleDateClick(date.number)}
            >
              {date.number}
            </div>
            <div
              className={`absolute bottom-[-1.5rem] text-[1rem] font-medium font-['NanumSquare Neo'] transition-colors duration-300 ease-out ${
                selectedDate === date.number ? "text-[#00ff00]" : "text-white"
              }`}
            >
              {date.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
