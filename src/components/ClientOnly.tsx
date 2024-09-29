import { useEffect, useState } from "react";

// Client only component is used to prevent the server from rendering the component

export default function ClientOnly({ children, ...delegated }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}