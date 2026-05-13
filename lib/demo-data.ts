"use client";

/**
 * Simulates an async data fetch with a random delay.
 */
export async function fetchDelayedData<T>(data: T, minDelay = 500, maxDelay = 2500): Promise<T> {
  const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

// Map to store promises for "use" hook
const cache = new Map();

export function useSuspendedData<T>(key: string, data: T, minDelay?: number, maxDelay?: number): T {
  if (!cache.has(key)) {
    cache.set(key, fetchDelayedData(data, minDelay, maxDelay));
  }
  
  const promise = cache.get(key);
  
  // In React 19, we can use the promise directly if it suspends, 
  // but for a simple demo we can use a basic throw pattern if "use" isn't available
  // or just return the promise and let the component handle it.
  
  // Check if promise is resolved
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      (v: T) => {
        promise.status = 'fulfilled';
        promise.value = v;
      },
      (e: any) => {
        promise.status = 'rejected';
        promise.reason = e;
      }
    );
    throw promise;
  }
}
