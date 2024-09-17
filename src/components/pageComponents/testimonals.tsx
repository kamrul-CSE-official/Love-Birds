import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaQuoteLeft } from "react-icons/fa";

import avatarImg from "@/assets/boy.png";

const testimonials = [
  {
    id: 1,
    quote:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy.",
    name: "Jane Doe",
    company: "SomeCompany LLC",
    avatar: avatarImg,
  },
  {
    id: 2,
    quote:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy.",
    name: "John Smith",
    company: "AnotherCompany Inc",
    avatar: avatarImg,
  },
  {
    id: 3,
    quote:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy.",
    name: "Alice Johnson",
    company: "ThirdCompany Corp",
    avatar: avatarImg,
  },
  {
    id: 4,
    quote:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy.",
    name: "Jane Doe",
    company: "SomeCompany LLC",
    avatar: avatarImg,
  },
  {
    id: 5,
    quote:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy.",
    name: "John Smith",
    company: "AnotherCompany Inc",
    avatar: avatarImg,
  },
  {
    id: 6,
    quote:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy.",
    name: "Alice Johnson",
    company: "ThirdCompany Corp",
    avatar: avatarImg,
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="max-w-7xl mx-auto p-4 py-16 bg-secondary rounded-xl">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-2">
        Testimonials
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Our customers speak for us
      </p>

      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem
              className="basis-full sm:basis-1/2 lg:basis-1/3 p-4"
              key={testimonial.id}
            >
              <Card className="shadow-lg">
                <CardContent className="p-6 text-center">
                  <FaQuoteLeft className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="mb-6">{testimonial.quote}</p>
                  <div className="flex items-center justify-center">
                    <Avatar className="mr-3">
                      <AvatarImage
                        src={`${testimonial.avatar.src}` || avatarImg.src}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:block" />
        <CarouselNext className="hidden lg:block" />
      </Carousel>
    </div>
  );
}
