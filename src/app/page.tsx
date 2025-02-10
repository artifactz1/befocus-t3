import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
// import { TimerDisplay } from "./_components/TimerDisplay";
import Footer from "./_components/Footer";
import GlobalSoundsPlayer from "./_components/GlobalSoundsPlayer";
import Header from "./_components/Header";
import Timer from "./_components/timer/Timer";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      {/* <GlobalSoundsPlayer type={["bgMusic", "ambient"]}/> */}
      <GlobalSoundsPlayer />
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        {/* <main className=" mx-auto flex h-screen w-screen flex-col items-center justify-center lg:mx-0 lg:max-w-full"> */}
        <Header />
        <Timer />
        <Footer />
      </main>
    </HydrateClient>
  );
}
