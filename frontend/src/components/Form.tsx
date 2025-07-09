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
        <SelectInput label="Type" typeRef={typeRef} />
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
const SelectInput = ({
  label,
  typeRef,
}: {
  label: string;
  typeRef: React.RefObject<HTMLInputElement | HTMLSelectElement | null>;
}) => {
  return (
    <>
      <label>{label}</label>
      <select
        ref={typeRef as React.RefObject<HTMLSelectElement>}
        className=" border text-sm rounded-lg block w-full p-3 bg-brand border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="instagram">Instagram</option>
        <option value="twitter">Twitter</option>
        <option value="youtube">YouTube</option>
        <option value="linkedin">LinkedIn</option>
        <option value="other">Other</option>
      </select>
    </>
  );
};
