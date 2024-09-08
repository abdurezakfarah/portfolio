import { chain, getScrollParent, isIOS, useLayoutEffect } from '@react-aria/utils';

interface PreventScrollOptions {
  /** Whether the scroll lock is disabled. */
  isDisabled?: boolean;
}

const visualViewport =
  typeof document !== 'undefined' && typeof window !== 'undefined'
    ? window.visualViewport
    : undefined;

// HTML input types that do not cause the software keyboard to appear.
const nonTextInputTypes = new Set([
  'checkbox',
  'radio',
  'range',
  'color',
  'file',
  'image',
  'button',
  'submit',
  'reset',
]);

// The number of active usePreventScroll calls. Used to determine whether to revert back to the original page style/scroll position
let preventScrollCount = 0;
let restore: () => void;

/**
 * Prevents scrolling on the document body on mount, and
 * restores it on unmount. Also ensures that content does not
 * shift due to the scrollbars disappearing.
 */
export function usePreventScroll(options: PreventScrollOptions = {}) {
  const { isDisabled } = options;

  useLayoutEffect(() => {
    if (isDisabled) {
      return;
    }

    preventScrollCount++;
    if (preventScrollCount === 1) {
      restore = isIOS() ? preventScrollMobileSafari() : preventScrollStandard();
    }

    return () => {
      preventScrollCount--;
      if (preventScrollCount === 0) {
        restore();
      }
    };
  }, [isDisabled]);
}

// For most browsers, all we need to do is set `overflow: hidden` on the root element, and
// add some padding to prevent the page from shifting when the scrollbar is hidden.
function preventScrollStandard() {
  return chain(
    setStyle(
      document.documentElement,
      'paddingRight',
      `${window.innerWidth - document.documentElement.clientWidth}px`,
    ),
    setStyle(document.documentElement, 'overflow', 'hidden'),
  );
}

// Mobile Safari is a whole different beast...
function preventScrollMobileSafari() {
  let scrollable: Element | null = null;
  let restoreScrollableStyles: (() => void) | null = null;

  const onTouchStart = (e: TouchEvent) => {
    // Store the nearest scrollable parent element from the element that the user touched.
    scrollable = getScrollParent(e.target as Element, true);
    if (scrollable === document.documentElement || scrollable === document.body) {
      return;
    }

    // Prevent scrolling up when at the top and scrolling down when at the bottom
    // of a nested scrollable area.
    if (
      scrollable instanceof HTMLElement &&
      window.getComputedStyle(scrollable).overscrollBehavior === 'auto'
    ) {
      restoreScrollableStyles = setStyle(scrollable, 'overscrollBehavior', 'contain');
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    // Prevent scrolling the window.
    if (
      !scrollable ||
      scrollable === document.documentElement ||
      scrollable === document.body
    ) {
      e.preventDefault();
      return;
    }

    // Check that the element does not actually overflow.
    if (
      scrollable.scrollHeight === scrollable.clientHeight &&
      scrollable.scrollWidth === scrollable.clientWidth
    ) {
      e.preventDefault();
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    const target = e.target as HTMLElement;

    if (willOpenKeyboard(target) && target !== document.activeElement) {
      e.preventDefault();
      setupStyles();

      target.style.transform = 'translateY(-2000px)';
      target.focus();
      requestAnimationFrame(() => {
        target.style.transform = '';
      });
    }

    if (restoreScrollableStyles) {
      restoreScrollableStyles();
    }
  };

  const onFocus = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (willOpenKeyboard(target)) {
      setupStyles();

      target.style.transform = 'translateY(-2000px)';
      requestAnimationFrame(() => {
        target.style.transform = '';

        if (visualViewport) {
          if (visualViewport.height < window.innerHeight) {
            requestAnimationFrame(() => {
              scrollIntoView(target);
            });
          } else {
            visualViewport.addEventListener('resize', () => scrollIntoView(target), {
              once: true,
            });
          }
        }
      });
    }
  };

  let restoreStyles: (() => void) | null = null;
  const setupStyles = () => {
    if (restoreStyles) {
      return;
    }

    const onWindowScroll = () => {
      window.scrollTo(0, 0);
    };

    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    restoreStyles = chain(
      addEvent(window, 'scroll', onWindowScroll),
      setStyle(
        document.documentElement,
        'paddingRight',
        `${window.innerWidth - document.documentElement.clientWidth}px`,
      ),
      setStyle(document.documentElement, 'overflow', 'hidden'),
      setStyle(document.body, 'marginTop', `-${scrollY}px`),
      () => {
        window.scrollTo(scrollX, scrollY);
      },
    );

    window.scrollTo(0, 0);
  };

  const removeEvents = chain(
    addEvent(document, 'touchstart', onTouchStart, {
      passive: false,
      capture: true,
    }),
    addEvent(document, 'touchmove', onTouchMove, {
      passive: false,
      capture: true,
    }),
    addEvent(document, 'touchend', onTouchEnd, {
      passive: false,
      capture: true,
    }),
    addEvent(document, 'focus', onFocus, true),
  );

  return () => {
    restoreScrollableStyles?.();
    restoreStyles?.();
    removeEvents();
  };
}

function setStyle<K extends keyof CSSStyleDeclaration>(
  element: HTMLElement,
  style: K,
  value: CSSStyleDeclaration[K],
) {
  // Store the current value of the style property
  const cur = element.style[style];

  // Set the new value for the style property
  element.style[style] = value;

  // Return a function to restore the original value
  return () => {
    element.style[style] = cur;
  };
}

function addEvent<K extends keyof GlobalEventHandlersEventMap>(
  target: EventTarget,
  event: K,
  handler: (this: EventTarget, ev: GlobalEventHandlersEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  // Type assertion to ensure handler is compatible with EventListener
  const eventListener = handler as EventListener;

  // Add the event listener
  target.addEventListener(event, eventListener, options);

  // Return a function to remove the event listener
  return () => {
    target.removeEventListener(event, eventListener, options);
  };
}

function scrollIntoView(target: Element | null) {
  if (!target) return; // Early exit if target is null

  const root = document.scrollingElement || document.documentElement;

  if (!(root instanceof Element)) return; // Ensure root is an Element

  while (target && target !== root) {
    const scrollable = getScrollParent(target);

    // Ensure `scrollable` is an `Element`
    if (scrollable && scrollable instanceof Element) {
      if (
        scrollable !== document.documentElement &&
        scrollable !== document.body &&
        scrollable !== target
      ) {
        const scrollableTop = scrollable.getBoundingClientRect().top;
        const targetTop = target.getBoundingClientRect().top;
        if (targetTop > scrollableTop + target.clientHeight) {
          scrollable.scrollTop += targetTop - scrollableTop;
        }
      }

      // Update `target` to the parent of `scrollable`, ensuring it's an `Element`
      target = scrollable.parentElement; // `parentElement` is already of type `HTMLElement | null`
    } else {
      // If `scrollable` is not an `Element`, break the loop
      target = null;
    }
  }
}

function willOpenKeyboard(target: Element) {
  return (
    (target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type)) ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}
