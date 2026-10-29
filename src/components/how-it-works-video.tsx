import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** Wraps a trigger button; opens the 30-second REMAX introduction video. */
export function HowItWorksVideo({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-2xl bg-ink p-0 ring-0 sm:max-w-4xl"
      >
        <DialogTitle className="sr-only">Cara kerja REMAX</DialogTitle>
        <DialogDescription className="sr-only">
          Video pengenalan REMAX, durasi 30 detik.
        </DialogDescription>
        <video
          className="aspect-video w-full bg-ink"
          src="/video-introduction.mp4"
          poster="/images/video-poster.webp"
          controls
          autoPlay
          playsInline
          preload="none"
        />
        <DialogClose asChild>
          <Button
            size="icon"
            aria-label="Tutup video"
            className="absolute top-3 right-3 rounded-full bg-ink/80 text-white hover:bg-ink"
          >
            <XIcon />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
