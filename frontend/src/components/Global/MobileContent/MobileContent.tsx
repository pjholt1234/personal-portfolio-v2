import { FC, useRef, useEffect, useState } from 'react';
import { MobileProfile } from '@components/Global';
import HomePanel from '@components/Home/HomePanel/HomePanel';
import ProjectPanel from '@components/Projects/ProjectPanel/ProjectPanel';
import ExperiencePanel from '@components/Events/ExperiencePanel/ExperiencePanel';

const MobileContent: FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [homeVisible, setHomeVisible] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);

  useEffect(() => {
    const node = homeRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setHomeVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = experienceRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setExperienceVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = projectsRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setProjectsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <MobileProfile />
      <div id="home-section" ref={homeRef}>
        <HomePanel isVisible={homeVisible} />
      </div>
      <div id="experience-section" ref={experienceRef}>
        <ExperiencePanel isVisible={experienceVisible} />
      </div>
      <div id="projects-section" ref={projectsRef}>
        <ProjectPanel isVisible={projectsVisible} />
      </div>
    </div>
  );
};

export default MobileContent; 