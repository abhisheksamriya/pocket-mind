const Footer = () => {
  return (
    <div className="ml-5 mt-5 md:w-[82.5vw] mr-5 mb-2 bg-screen p-3 md:p-6 rounded-2xl flex justify-center items-center">
      <p className="hidden md:block">
        Desiged and Developed by{" "}
        <a href="https://x.com/AbhiSamriya" className="text-brand">
          abhishek samriya
        </a>
      </p>
      <p className="block md:hidden">
        Developed by{" "}
        <a href="https://x.com/AbhiSamriya" className="text-brand">
          abhishek samriya
        </a>
      </p>
    </div>
  );
};

export default Footer;
