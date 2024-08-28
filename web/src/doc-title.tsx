import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = 'developerNews | ' + title;
  }, [title]);
};
