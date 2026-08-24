import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollTrigger = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15, 
      rootMargin: '0px 0px -50px 0px' 
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { 

            if (node.classList?.contains('scroll-animate')) {
              observer.observe(node);
            }

            const children = node.querySelectorAll('.scroll-animate');
            children.forEach((child) => observer.observe(child));
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]); 

  return null;
};
