import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import feedbackInfo from '@/../public/assets/svgs/feedbackInfo.svg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Feedback() {
  return (
    <div className="h-screen px-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-main text-3xl font-bold mb-1">피드백</h1>
        <h3 className="text-white text-xl">피드백 작성</h3>
      </div>
      <div className="flex flex-col justify-center gap-3">
        <div>
          <div className="mb-2">
            <Label htmlFor="feedback" className="text-white text-sm">
              피드백 제목
            </Label>
          </div>

          <Input
            type="text"
            id="feedback"
            placeholder="피드백"
            className="bg-white"
          />
        </div>
        <div>
          <div className="flex justify-start items-center gap-1 mb-2">
            <Label htmlFor="type" className="text-white text-sm">
              피드백 유형
            </Label>
            <img src={feedbackInfo} alt="feedbackInfo" />
          </div>

          <Select>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
