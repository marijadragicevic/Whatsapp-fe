import { Sidebar } from "../components/sidebar";

const Home = () => {
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="container min-h-screen flex">
        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
