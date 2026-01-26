/**
 * Safe localStorage wrapper that handles incognito mode and errors
 */

export const safeStorage = {
  getItem: (key: string, defaultValue: string | null = null): string | null => {
    try {
      return localStorage.getItem(key) ?? defaultValue;
    } catch (error) {
      console.warn(`Failed to read from localStorage (key: ${key}):`, error);
      return defaultValue;
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Failed to write to localStorage (key: ${key}):`, error);
      return false;
    }
  },

  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove from localStorage (key: ${key}):`, error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
      return false;
    }
  },

  isAvailable: (): boolean => {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  },
};
