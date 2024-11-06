import MainDeets from "./MainDeets";

`import diseaseData from '../DiseaseToExcel.json';
import ChartsGraph from './ChartsGraph';
`
const Tracker = () => {
  return (
    <div className="flex h-screen w-full bg-white">
      <div className="flex w-1/6 "></div>
      <div className="flex w-4/6 py-24 ">
        <MainDeets />
      </div>
      <div className="flex w-1/6 "></div>
    </div>
  );
};

export default Tracker;