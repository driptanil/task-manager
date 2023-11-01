"use client";
// creating this component as a React Client Side Component

// import { Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
  // React.ReactNode represents an array of React Elements
}
/* 
ClientOnly is used to avoid the "Hydration" error caused when
there is some discrepancy while importing client and server side components

This is maybe caused by the NextJS 13 Experimental App Directory
*/

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  // check if the React Functional Components is mounted or not

  useEffect(() => {
    setHasMounted(true);
  }, []);
  // useEffect hook is used to mount the components

  if (!hasMounted) {
    // delays any click function until all react components are mounted
    return <></>;
  }

  return <>{children}</>;
};

export default ClientOnly;
