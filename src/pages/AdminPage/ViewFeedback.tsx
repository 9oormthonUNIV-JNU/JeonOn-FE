import { FilledBtn } from "@/components/common/Button/filled-btn";
import { useState } from "react";

type FeedbackOptionType = {
  type: string;
};

const feedbackOptions: FeedbackOptionType[] = [
  { type: "축제준비위원회" },
  { type: "2024 대동제" },
  { type: "축제사이트" },
];

type FeedbackType = {
  id: number;
  nickname: string;
  title: string;
  createdAt: string;
};

const feedbacks: FeedbackType[] = [
  {
    id: 1,
    nickname: "망곰",
    title: "축제에 망곰이를 불러줬으면 좋겠어요",
    createdAt: "2024-11-07T13:00:00",
  },
  {
    id: 2,
    nickname: "룰루랄라",
    title: "축제에 이범호를 불러줬으면 좋겠어요",
    createdAt: "2024-11-07T13:00:00",
  },
];

type FeedbackDetailType = {
  id: number;
  nickname: string;
  title: string;
  content: string;
  images: string[];
  createdAt: string;
};

const feedbackDetails: FeedbackDetailType[] = [
  {
    id: 1,
    nickname: "망곰",
    title: "축제에 망곰이를 불러줬으면 좋겠어요",
    content: "망곰이가 요즘 인기잖아요? 망곰이와 콜라보를 진행시켜주세요.",
    images: ["https://https://s3.ap-northeast-2.amazonaws.com/image1"],
    createdAt: "2024-11-07T13:00:00",
  },
  {
    id: 2,
    nickname: "룰루랄라",
    title: "축제에 이범호를 불러줬으면 좋겠어요",
    content: "이범호가 요즘 인기잖아요? 이범호와 콜라보를 진행시켜주세요.",
    images: [
      "https://https://s3.ap-northeast-2.amazonaws.com/image1",
      "https://https://s3.ap-northeast-2.amazonaws.com/image1",
      "https://https://s3.ap-northeast-2.amazonaws.com/image1",
    ],
    createdAt: "2024-11-07T13:00:00",
  },
];

type FeedbackItemProps = {
  feedbacks: FeedbackType[];
  feedbackDetails: FeedbackDetailType[];
};

const FeedbackItem = ({ feedbacks, feedbackDetails }: FeedbackItemProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}-${day} ${hours}:${minutes}`;
  };

  const getDetailById = (id: number) =>
    feedbackDetails.find((detail) => detail.id === id);

  return (
    <>
      {feedbacks.map((feedback) => {
        const detail = getDetailById(feedback.id);
        const isSelected = selectedItem === feedback.id;

        return (
          <div
            key={feedback.id}
            className="flex bg-white border rounded-3xl font-pretendard p-4 flex-col gap-4"
            onClick={() =>
              setSelectedItem((prev) =>
                prev === feedback.id ? null : feedback.id
              )
            }
          >
            <div className="flex flex-row gap-3">
              <div className="rounded-full shrink-0 bg-black w-5 h-5 flex justify-center items-center">
                <div className="text-main text-base flex font-extrabold">
                  {feedback.id}
                </div>
              </div>
              <div className="flex flex-col min-w-0 gap-1 w-full">
                <div className="text-base vw-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {feedback.title}
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-xs">{feedback.nickname}</div>
                </div>
              </div>
            </div>
            {isSelected && detail && (
              <div className="flex flex-col px-2">
                <div
                  key={detail.id}
                  className="flex flex-row bg-white border border-black rounded-xl p-3 text-xs"
                >
                  {detail.content}
                </div>

                <div className="flex flex-row gap-2 mt-2 w-full overflow-x-auto">
                  {detail.images.map((item) => (
                    <img
                      src={item}
                      className="w-20 h-20 object-cover rounded-lg bg-[#D9D9D9]"
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="flex text-xs text-[#5C5C5CDE] justify-end">
              {formatDate(feedback.createdAt)}
            </div>
          </div>
        );
      })}
    </>
  );
};

const ViewFeedback = () => {
  const [selectedType, setSelectedType] = useState<string>();
  const sortedFeedbacks = [...feedbacks].sort((a, b) => b.id - a.id);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">피드백</h1>
      </div>
      <div className="w-full flex flex-col font-pretendard">
        <div className="text-white flex font-pretendard text-xl mt-10 mb-6 justify-center">
          피드백 목록
        </div>
      </div>
      <div className="flex flex-col justify-center mx-8">
        <div className="flex flex-row gap-3 mb-5">
          {feedbackOptions.map((option) => {
            const isSelected = selectedType === option.type;
            return (
              <FilledBtn
                onClick={() => setSelectedType(option.type)}
                className={`w-28 border truncate text-xs font-thin bg-transparent ${
                  isSelected
                    ? "border-main text-main"
                    : "border-white text-white"
                }`}
              >
                {option.type}
              </FilledBtn>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          <FeedbackItem
            feedbacks={sortedFeedbacks}
            feedbackDetails={feedbackDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
