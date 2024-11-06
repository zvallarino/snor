import diseaseData from '../DiseaseToExcel.json';
import ChartsGraph from './ChartsGraph';


const MainGraphComponent = () => {
  return (
    <div className="flex h-screen w-full ">
      <div className="flex w-1/6 "></div>
      <div className="flex w-4/6 mt-24">
        <div className="w-full h-full">
          <ChartsGraph diseaseData={diseaseData} />
        </div>
      </div>
      <div className="flex w-1/6 "></div>
    </div>
  );
};

export default MainGraphComponent;