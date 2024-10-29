import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

export default function ZoomableImage({
  src,
  alt,
  className,
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  if (!src) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={src}
          alt={alt || ""}
          className={className}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </DialogTrigger>
      <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
        <div className="relative w-full overflow-clip rounded-md bg-transparent shadow-md">
          <img
            src={src}
            alt={alt || ""}
            className="h-full w-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
