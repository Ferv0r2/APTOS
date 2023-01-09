import React, { FC, ReactNode } from "react";

interface Props {
  node: ReactNode;
}

const InnerLayout: FC<Props> = ({ node }) => {
  return (
    <div className="bg-[#F8F9FA] w-screen">
      <div className="p-8">{node}</div>
    </div>
  );
};

export { InnerLayout };
