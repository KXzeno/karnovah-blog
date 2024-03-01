import React from 'react';

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

  function toggleValue() {
    setValue((currentValue) => !currentValue);
  }
  return [value, toggleValue];
}
