import { GetStaticProps } from 'next';

export default function Home() {
  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100 text-red-500">
      Test Tailwind CSS
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};