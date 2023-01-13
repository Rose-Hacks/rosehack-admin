import { useState } from "react";
import { useZxing } from "react-zxing";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const Checkin = () => {
  const [result, setResult] = useState("");
  const [message, setMessage] = useState(false);

  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  const checkinUser = () => {
    axios
      .post("/api/checkin", { result })
      .then((response) => {
        setResult("");
        setMessage(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="w-full flex justify-center items-center flex-col bg-admin-primary text-white">
      {message && (
        <div className="flex justify-between w-1/6 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-admin-primary text-white font-lexend text-2xl rounded px-4 py-2">
          Success!
          <FaTimes
            className="text-red-500 hover:cursor-pointer"
            onClick={() => setMessage(false)}
          />
        </div>
      )}

      <div className="w-1/2 flex justify-center items-center flex-col pt-5">
        <p className="font-lexend text-5xl font-bold ">Participant Checkin</p>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <video ref={ref} className="w-10/12 border-8 border-white" />
      </div>
      <p className="font-lexend text-xl font-bold mt-2">Email: {result}</p>
      <button
        onClick={checkinUser}
        className="border-2 border-white rounded font-lexend px-4 py-2 font-bold  mb-20"
      >
        Checkin User
      </button>
    </div>
  );
};

export default Checkin;
