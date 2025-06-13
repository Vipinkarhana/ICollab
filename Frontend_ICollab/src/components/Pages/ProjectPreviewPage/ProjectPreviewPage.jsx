import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import * as projectService from '../../../Services/projectService';
import ProjectIntro from './ProjectIntro';
import ProjectPreviewDetail from './ProjectPreviewDetail';
import Interaction from "../../Common/Interaction"
import MoreProject from '../../Common/MoreProject';
const ProjectPreviewPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("Intro");
  const tabs = ["Intro", "Timeline", "Messages", "Files", "Members"];
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getProjectDetails(id);
        setProject(response.data.data);
      } catch (err) {
        setError(err.message || 'Error loading project');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id]);


  useEffect(() => {
    if (!project) return;
   // once the project is loaded, fetch its comments
    (async () => {
      try {
        const data = await projectService.getProjectComments(project.id);
        setComments(data);
      } catch (e) {
        console.error('Comments load failed', e);
      }
    })();
  }, [project]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Project not found</div>;



  return (
    <div className="w-[98svw] min-h-screen   bg-gray-50 pt-20 px-4 md:px-12 lg:px-24 py-4">
      {/* Tabs / Project Header */}
      <div className="mb-6">
        <ProjectIntro 
        project={project}
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>

      {/* Project Details Section */}
      <div >
        <ProjectPreviewDetail project={project}/>
      </div>

      {/* Comments section (before MoreProject) */}
     <div className="bg-white rounded-md shadow-md p-4 mt-8">
       <Interaction
         postId={project.id}
         initialComments={comments}
         // pass in service methods so Interaction can call them
         fetchComments={() => projectService.getProjectComments(project.id)}
         postComment={(content) =>
           projectService.postProjectComment({ projectId: project.id, content })
         }
         postReply={(content, parentId) =>
           projectService.postProjectReply({
             projectId: project.id,
             content,
             parentCommentId: parentId
           })
         }
       />
     </div>

      <div className="mt-10">
        <MoreProject currentProjectId={project.id}/>
      </div>
    </div>
  );
};

export default ProjectPreviewPage;