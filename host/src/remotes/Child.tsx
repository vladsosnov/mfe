import React from "react";
import { mount } from "childApp/childApp";

export const Child = () => {
  const childRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    if (childRef.current) mount(childRef.current);
  }, [childRef]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div ref={childRef} />;
    </React.Suspense>
  );
};
