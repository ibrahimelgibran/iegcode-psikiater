import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex mt-10 items-center justify-center">
      <SignUp />
    </div>
  );
}