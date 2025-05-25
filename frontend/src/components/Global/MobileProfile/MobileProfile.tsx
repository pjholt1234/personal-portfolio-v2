import { useState, useEffect } from 'react';
import { Typography } from '@shared-ui';
import Socials from '../Socials/Socials';
import styles from './MobileProfile.module.scss';
import useTypewriter from '@/Hooks/useTypewriter';

const BlinkingCursor = ({ active = true }) => (
  <span className={styles.cursor} style={{ width: '1ch', display: 'inline-block' }}>
    {active ? '|' : ''}
  </span>
);

const MobileProfile = () => {
  const [showTitle, setShowTitle] = useState(false);
  const { displayed: name, isDone: nameDone } = useTypewriter('PJ Holt', 200, true);
  const { displayed: title, isDone: titleDone } = useTypewriter('Full stack developer', 100, showTitle);

  useEffect(() => {
    if (nameDone) {
      setShowTitle(true);
    }
  }, [nameDone]);

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <Typography component="h1">
          {name}
          <BlinkingCursor active={!nameDone} />
        </Typography>
        <Typography component="h2">
          {title}
          {showTitle && <BlinkingCursor active={!titleDone} />}
        </Typography>
      </div>
      <Socials />
    </div>
  );
};

export default MobileProfile; 