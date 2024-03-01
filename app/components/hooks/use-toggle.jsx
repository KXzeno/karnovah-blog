import React from 'react';
// Toggle Components should be export-wrapped with `React.memo()`

/**
 * A hook for toggle functionality
 * @param {boolean} initialValue - safeguards argument passthroughs, false default required
 * @returns {state} Logic-encapsulated on/off variable
 * @returns {function} Component-side setter function for value state
 */
export default function useToggle(initialValue = false) {
  if (
    typeof initialValue !== 'boolean' &&
    typeof initialValue !== 'function'
  ) {
    console.warn('Invalid type for useToggle');
  }
  const [value, setValue] = React.useState(
    initialValue
  );

  /**
   * Memoize toggle function for memory efficiency
   * @returns {function} Toggles the value
   */
  const toggleValue = React.useMemo(() => {
   /**
   * @augments value
   */
    return function toggleValue() {
      setValue((currentValue) => !currentValue);
    };
  }, []);

  return [value, toggleValue];
}
