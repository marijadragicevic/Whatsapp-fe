import { Sidebar } from "../components/sidebar";

const Home = () => {
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="container min-h-screen flex">
        {/* sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
