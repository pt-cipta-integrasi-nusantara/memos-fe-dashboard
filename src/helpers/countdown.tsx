import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface CountdownProps {
  initialTime: number;
  onClickRequestAuthCode: () => void;
  isRequested: boolean;
  setIsRequested: Dispatch<SetStateAction<boolean>>;
  isClinix: boolean;
}

const Countdown: React.FC<CountdownProps> = ({
  initialTime,
  onClickRequestAuthCode,
  isRequested,
  setIsRequested,
  isClinix,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsRequested(false);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const onClickRequestCode = () => {
    setTimeLeft(initialTime);
    onClickRequestAuthCode?.();
  };

  // Convert seconds to mm:ss format
  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <span className="text-[14px]">
      {isRequested ? (
        <span>
          Kirim ulang kode dalam{" "}
          <span
            className={`${isClinix ? "text-green-500" : "text-primary-500"}`}
          >
            {formatTime(timeLeft)}
          </span>
        </span>
      ) : (
        <span
          onClick={onClickRequestCode}
          className="cursor-pointer text-primary-500"
        >
          Kirim ulang permintaan kode
        </span>
      )}
    </span>
  );
};

export default Countdown;
