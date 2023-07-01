"use client";
import TweetDetail from "@/components/TweetDetail";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout/MainLayout";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <MainLayout>
      <LayoutWithNews>
        <TweetDetail id={Number(params.id)} />
      </LayoutWithNews>
    </MainLayout>
  );
};

export default Page;
