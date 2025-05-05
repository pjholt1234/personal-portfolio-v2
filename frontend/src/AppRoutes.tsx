import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@pages/Home";
import Project from "@pages/Project";
import Event from "@pages/Event";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Home />}/>
            <Route path="/experience/:slug" element={<Event />} />

            <Route path="/projects" element={<Home />}/>
            <Route path="/projects/:slug" element={<Project />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;