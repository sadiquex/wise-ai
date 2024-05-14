"use client";
import { signIn } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

{
  /* <Button>
<Link href={"/chat"}>Login</Link>
</Button> */
}

export default function Login() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: "/images/ai-login-image-1.jpg",
      text: "Welcome to the Wise AI. Where AI meets creativity. Transform and boost your ideas with AI magic.",
    },
    {
      src: "/images/ai-login-image-2.jpg",
      text: "Explore the future with Wise AI. Embrace innovation and creativity powered by AI technology.",
    },
    {
      src: "/images/ai-login-image-3.jpg",
      text: "Join us in the AI revolution. Discover limitless possibilities with Wise AI.",
    },
    // Add more images and texts as needed
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* left - login */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="space-y-1 sm:w-1/2">
          <h2 className="text-center sm:text-left text-xl font-semibold">
            Welcome back
          </h2>
          <p>Welcome back! Please enter your details</p>
        </div>

        <form action="" className="flex flex-col gap-4 sm:w-1/2">
          {/* input fields */}
          <label className="">
            <p className="text-sm py-1">Enter your email</p>
            <Input type="email" placeholder="Email" />
          </label>

          <label className="">
            <p className="text-sm py-1">Password</p>
            <Input type="password" placeholder="*******" />
          </label>

          <Button className="rounded-md">Sign In</Button>
        </form>

        <Button
          className={`${buttonVariants({
            variant: "outline",
          })} sm:w-1/2 rounded-md`}
        >
          <span className="px-2">
            <FcGoogle size={18} />
          </span>
          Sign In With Google
        </Button>

        <Button
          className={`${buttonVariants({
            variant: "outline",
          })} sm:w-1/2 rounded-md`}
        >
          <span className="px-2">
            <FaGithub size={18} />
          </span>
          Sign In With Github
        </Button>

        <p className="py-2 text-primary text-xs">
          Don't have an account? <strong>Sign Up</strong>
        </p>

        {/* <Button>
          <Link href={"/chat"}>Login</Link>
        </Button> */}
      </div>

      {/* right - image */}
      <div className="hidden sm:block flex-1 h-full bg-black relative overflow-hidden rounded-tl-[80px] rounded-bl-[80px] p-6">
        <Image
          src={images[currentImageIndex].src}
          fill
          alt="AILoginImage"
          className="opacity-70 object-cover"
        />

        {/* text content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white h-full flex justify-end gap-4 w-3/4 flex-col pb-20">
          <div>
            <p className="text-xl font-semibold w-[80%]">
              {images[currentImageIndex].text}
            </p>
          </div>

          <div className="w-full flex justify-between">
            {/* left */}
            <div>
              <h3>WISE AI</h3>
              <p>
                Ibrahim Saddik, <strong>Developer</strong>
              </p>
            </div>

            {/* buttons */}
            <div className="flex gap-4">
              <button
                className="border border-white p-4 rounded-full z-10"
                onClick={handlePrevImage}
              >
                <FaArrowLeftLong />
              </button>
              <button
                className="border border-white p-4 rounded-full z-10"
                onClick={handleNextImage}
              >
                <FaArrowRightLong />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
