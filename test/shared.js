/**
 * @file shared
 */

export const sleep = time => new Promise(
  resolve => (
    setTimeout(
      () => resolve(true),
      time
    )
  )
);
