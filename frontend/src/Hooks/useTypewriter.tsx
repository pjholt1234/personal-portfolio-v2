import { useState, useEffect } from 'react';

const useTypewriter: (text: string, speed: number, start: boolean) => { displayed: string; isDone: boolean } = (text, speed, start) => {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!start) {
      setDisplayed('');
      setIsDone(false);
      return;
    }
    setDisplayed('');
    setIsDone(false);
    let i = 1;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      if (i === text.length) {
        clearInterval(interval);
        setIsDone(true);
      }
      i++;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);

  return { displayed, isDone };
};

export default useTypewriter; 