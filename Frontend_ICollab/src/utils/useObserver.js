import { useMemo, useState, useEffect, useRef } from "react";

const useObserver = ({ once = true, options = {} } = {}) => {
  const [isVisible, setisVisible] = useState(false);
  const elementRef = useRef(null);

  // Memoize options to prevent unnecessary re-creation
  const memoizedOptions = useMemo(() => options, [options.root, options.rootMargin, options.threshold]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          setisVisible(true);
          if (once) {
            observerInstance.disconnect();
          }
        } else if (!once) {
          setisVisible(false);
        }
      },
      memoizedOptions
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) observer.disconnect();
    };
  }, [once, memoizedOptions]);

  return { ref: elementRef, isVisible };
};

export default useObserver;