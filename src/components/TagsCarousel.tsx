"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

type Props = { tags: string[] };

export default function TagsCarousel({ tags }: Props) {
	return (
		<Carousel
			opts={{
				slidesToScroll: tags.length > 3 ? 2 : "auto",
				loop: true,
				containScroll: tags.length > 6 ? false : "trimSnaps",
				align: "start",
			}}
			className="max-w-[212px] pl-2"
			plugins={[Autoplay({ stopOnInteraction: false })]}
		>
			<CarouselContent className="-ml-2">
				{tags.map((t) => (
					<CarouselItem key={t} className="text-xs max-w-fit pl-2">
						<div
							className="bg-primary/50 px-2 pt-[1px] h-[19px] rounded-md line-clamp-1 text-center text-ellipsis overflow-hidden"
							title={t}
						>
							{t}
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
