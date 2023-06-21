import React from "react";

const UploadBox = ({ title }) => {
  return (
    <div className="w-full mb-5 md:mb-5">
      <label htmlFor="" className="font-montserrat text-[13px] font-medium">
        {title}
      </label>{" "}
      <br />
      <div className="mt-1">
        <label class="custom-file-upload w-25 font-montserrat text-[14px]">
          <input type="file" />
          Drop your file here, or <span className="primary-color">Browse</span>
        </label>
      </div>
    </div>
  );
};

export default UploadBox;
