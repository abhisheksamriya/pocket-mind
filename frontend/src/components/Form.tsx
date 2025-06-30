import React from "react";
import { IoClose } from "react-icons/io5";

const Form = ({
  open,
  setOpen,
  handleSubmit,
  titleRef,
  typeRef,
  linkRef,
  hintRef,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  handleSubmit: () => void;
  titleRef: React.RefObject<HTMLInputElement | null>;
  linkRef: React.RefObject<HTMLInputElement | null>;
  typeRef: React.RefObject<HTMLInputElement | null>;
  hintRef: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <div
      className={`flex flex-col gap-6 absolute z-100 top-50 md:w-96 md:right-40 md:top-55 p-5 bg-white  ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center text-2xl">
        <h1>Enter Details</h1>
        <button className="cursor-pointer" onClick={() => setOpen(false)}>
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col gap-3 mb-4">
        <Input label="Title" placeholder="Enter title" inputRef={titleRef} />
        <Input label="Link" placeholder="Enter url" inputRef={linkRef} />
        <Input label="Type" placeholder="Enter type" inputRef={typeRef} />
        <Input
          label="Hint"
          placeholder="Enter hint for you"
          inputRef={hintRef}
        />
      </div>
      <button
        className="bg-brand px-2 py-3 rounded-3xl text-white"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;

export const Input = ({
  label,
  placeholder,
  inputRef,
}: {
  label: string;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <>
      <label htmlFor="">{label}</label>
      <input
        className="py-2 px-4 border-1 rounded-3xl"
        ref={inputRef}
        type="text"
        placeholder={placeholder}
      />
    </>
  );
};
