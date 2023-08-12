import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
  h-[30vh]
  flex 
  flex-col 
  justify-center 
  items-center
"
    >
      <ScaleLoader size={100} color="#FF5F1F" />
    </div>
  );
};

export default Loader;
