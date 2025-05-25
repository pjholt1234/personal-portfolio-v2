import { FC, useEffect } from 'react';
import { MobileProfile } from '@components/Global';
import HomePanel from '@components/Home/HomePanel/HomePanel';
import ProjectPanel from '@components/Projects/ProjectPanel/ProjectPanel';
import ExperiencePanel from '@components/Events/ExperiencePanel/ExperiencePanel';
import useVisibilityObserver from '@/Hooks/useVisibilityHook';
import { useSiteNavigation } from '@/Hooks/useSiteNavigation';

const MobileContent: FC = () => {
  const [homeRef, homeVisible] = useVisibilityObserver<HTMLDivElement>();
  const [experienceRef, experienceVisible] = useVisibilityObserver<HTMLDivElement>();
  const [projectsRef, projectsVisible] = useVisibilityObserver<HTMLDivElement>();
  const { location, setLocation, isNavigating } = useSiteNavigation({ disableScroll: true });

  useEffect(() => {
    if (isNavigating) return;
    // Priority: projects > experience > home (topmost visible wins)
    if (projectsVisible) {
      if (location !== 'projects') setLocation('projects');
    } else if (experienceVisible) {
      if (location !== 'experience') setLocation('experience');
    } else if (homeVisible) {
      if (location !== 'home') setLocation('home');
    }
  }, [homeVisible, experienceVisible, projectsVisible, isNavigating]);

  return (
    <div>
      <MobileProfile />
      <div id="home" ref={homeRef}>
        <HomePanel isVisible={homeVisible} />
      </div>
      <div id="experience" ref={experienceRef}>
        <ExperiencePanel isVisible={experienceVisible} />
      </div>
      <div id="projects" ref={projectsRef}>
        <ProjectPanel isVisible={projectsVisible} />
      </div>
    </div>
  );
};

export default MobileContent; 