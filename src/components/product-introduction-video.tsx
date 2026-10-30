"use client";

import { Play, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_PATH } from "@/lib/base-path";

const videoSrc = `${BASE_PATH}/video-introduction.mp4`;
const posterSrc = `${BASE_PATH}/images/video-poster.png`;

export function ProductIntroductionVideo() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
      return;
    }

    void videoRef.current?.play().catch(() => {
      // Browser autoplay policies may require the user to press the native play control.
    });
  }, [open]);

  return (
    <ContainerScroll>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Putar video pengenalan REMAX"
            className="group relative block h-full w-full cursor-pointer overflow-hidden bg-ink text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
          >
            <video
              aria-hidden="true"
              className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.015] motion-reduce:transition-none"
              width={1920}
              height={1080}
              poster={posterSrc}
              preload="none"
              muted
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,8,31,0.02)_32%,rgba(0,8,31,0.54)_100%)]"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-teal text-white shadow-[0_12px_36px_rgba(0,8,31,0.35)] transition-transform duration-300 ease-out-expo group-hover:scale-110 sm:size-20 lg:size-24 motion-reduce:transition-none">
                <Play
                  aria-hidden
                  className="ml-1 size-7 fill-current sm:size-8 lg:size-10"
                />
              </span>
            </span>
            <span className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4 text-white sm:right-6 sm:bottom-6 sm:left-6 lg:right-8 lg:bottom-8 lg:left-8">
              <span className="shrink-0 rounded-full border border-white/35 bg-ink-deep/45 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                00:30
              </span>
            </span>
          </button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          className="h-auto w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-xl border-0 bg-ink p-0 ring-0 sm:w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl lg:w-[min(96vw,1000px)] lg:max-w-[min(96vw,1000px)]"
        >
          <DialogTitle className="sr-only">Video pengenalan REMAX</DialogTitle>
          <DialogDescription className="sr-only">
            Video singkat tentang cara REMAX membantu kamu memahami kondisi KPR.
          </DialogDescription>
          <video
            ref={videoRef}
            className="aspect-video w-full bg-ink object-contain"
            width={1920}
            height={1080}
            poster={posterSrc}
            controls
            autoPlay
            playsInline
            preload="none"
          >
            <source src={videoSrc} type="video/mp4" />
            Browser kamu tidak mendukung pemutar video.
          </video>
          <DialogClose asChild>
            <Button
              size="icon"
              aria-label="Tutup video"
              className="absolute top-2 right-2 rounded-full bg-ink-deep/80 text-white shadow-lg hover:bg-ink-deep sm:top-3 sm:right-3"
            >
              <XIcon />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </ContainerScroll>
  );
}
