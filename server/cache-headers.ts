import { Response } from 'express';

export const setCacheHeaders = (res: Response, maxAge: number = 3600) => {
  res.set({
    'Cache-Control': `public, max-age=${maxAge}`,
    'ETag': `"${Date.now()}"`,
  });
};

export const setNoCacheHeaders = (res: Response) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  });
};

export const setLongCacheHeaders = (res: Response) => {
  res.set({
    'Cache-Control': 'public, max-age=31536000, immutable',
  });
};
