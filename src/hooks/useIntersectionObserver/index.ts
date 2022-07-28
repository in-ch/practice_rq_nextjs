import { RefObject, useEffect } from 'react'


interface Props {
    root: RefObject<HTMLInputElement> | null;
    target: RefObject<HTMLInputElement | null>;
    onIntersect: () => void;
    threshold?: number;
    rootMargin?: string;
    enabled: boolean;
}

export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}:Props) {
    useEffect(() => {
    if (!enabled) {
      return
    }

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    )

    const el = target && target.current

    if (!el) {
      return
    }

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [target, enabled, root, threshold, rootMargin, onIntersect])
}