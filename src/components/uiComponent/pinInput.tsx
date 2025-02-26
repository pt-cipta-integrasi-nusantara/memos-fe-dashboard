import React, { useRef } from "react";

interface PinInputProps {
  length?: number;
  onComplete: (pin: string) => void;
  isClinix?: boolean;
}

const PinInput: React.FC<PinInputProps> = ({
  length = 6,
  onComplete,
  isClinix = false,
}) => {
  const [pin, setPin] = React.useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Only allow a single digit (0-9)

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move focus to next input if a number is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all fields are filled
    if (newPin.every((num) => num !== "")) {
      onComplete(newPin.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mt-12 flex justify-between gap-8">
      {pin.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el: any) => (inputRefs.current[index] = el)}
          className={`border-b-2 w-10 h-14 focus:outline-none text-center text-4xl pb-6 font-bold ${
            isClinix ? "border-green-500" : "border-primary-500"
          }`}
        />
      ))}
    </div>
  );
};

export default PinInput;
