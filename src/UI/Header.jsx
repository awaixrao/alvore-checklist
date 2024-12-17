import React from "react";
const Header = ({ heading, paragraph, image }) => {
  return (
    <>
      {/* Administration Panel Section */}
      <div className="px-4 py-4 mt-4 rounded-lg mx-6 bg-blue-600 text-white flex flex-col md:flex-row justify-between items-center md:px-8">
        {/* Left Text */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-base md:text-lg font-semibold">
            {heading || "     🌟 ADMINISTRATION PANEL "}
          </h2>
          <p className="text-sm mt-1 opacity-90 leading-relaxed">
            {(
              paragraph ||
              `Designed For Administrators Or Management Users Who Require Comprehensive\n Access To Monitor, Manage And Control Various Aspects Of The System.`
            )
              .split("\n")
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </p>
        </div>

        {/* Right Illustration */}
        <img
          src={
            image ||
            "https://s3-alpha-sig.figma.com/img/4420/12a8/f0c9837b48f43db3d5418ac00ad2a067?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R4nZyLmGbQH3shEb-oYixp~oZY-xVgTBWR5ZwqtUFH1EvRz3drADVGoamikYfH0H9uHT2z7vaTMBzfkfhU-W4nC2~Ld-Padh6UxhSqK5YNl1LHpr7RyFn~dXePPqXHOASapaz~vmdRy5TtGi~1vx8Fjv-7yhjcpGWUVgh0ekZaJUCid84eQEz6EkDrIM8RuG0Pm23aW5cSfbqOyQ-BujdirbfdZoCycFgaCE3MpVL9XrfpDTLMaPE0cLyQLtR0ghbPNYPL9frTHyX9skpNAQrVfnwNhBPZYGsF7aNZzEVCn7jQd8gkehWRQN4d0uU7ce8NivL7Fs8DP0gVqWAHGuOw__"
          }
          alt="Administration Panel"
          className="w-32 h-20 md:w-[120px] md:h-[80px] object-cover"
        />
      </div>
    </>
  );
};

export default Header;
