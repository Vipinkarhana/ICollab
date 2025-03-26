import React, { useState } from 'react';

function ProjectForm({ onSaveDraft, onCreateProject, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    startDate: '',
    endDate: '',
    tags: [],
    collaborators: [],
    roles: [],
    attachments: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTagsChange = (e) => {
    const { options } = e.target;
    const selectedTags = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTags.push(options[i].value);
      }
    }
    setFormData({ ...formData, tags: selectedTags });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: [...e.target.files]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onCreateProject(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Create a New Project</h2>

      {/* Project Title */}
      <div>
        <label className="block font-medium">Project Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter project title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter project description"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select category</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Analysis">Data Analysis</option>
          <option value="Design">Design</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block font-medium">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Start and End Date */}
      <div className="flex gap-4">
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block font-medium">Tags</label>
        <select
          multiple
          name="tags"
          value={formData.tags}
          onChange={handleTagsChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="React">React</option>
          <option value="NodeJS">NodeJS</option>
          <option value="UI/UX">UI/UX</option>
          {/* Add more tags as needed */}
        </select>
      </div>

      {/* Team Members (Collaborators) */}
      <div>
        <label className="block font-medium">Add Collaborators</label>
        <input
          type="text"
          name="collaborators"
          value={formData.collaborators}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Add team members"
        />
      </div>

      {/* Roles */}
      <div>
        <label className="block font-medium">Roles</label>
        <select
          name="roles"
          value={formData.roles}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select role</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      {/* File Upload */}
      <div>
        <label className="block font-medium">Upload Files</label>
        <input
          type="file"
          multiple
          name="attachments"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button type="button" onClick={onSaveDraft} className="bg-gray-500 text-white px-4 py-2 rounded">
          Save Draft
        </button>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Project
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;
