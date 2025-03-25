
import MainDeets from "./MainDeets";
import TrendsPage from "./TrendsPage";


const Trends = () => {
  return (
    <div className="flex h-screen w-full bg-white">
      <div className="flex w-1/6 "></div>
      <div className="flex w-4/6 py-24 ">
        <TrendsPage />
      </div>
      <div className="flex w-1/6 "></div>
    </div>
  );
};

export default Trends;