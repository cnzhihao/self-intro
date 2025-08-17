# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal resume website project for showcasing professional experience as an AI Product Manager and AI Agent developer. The website serves as an interactive resume for recruiters and hiring managers to view personal projects, professional experience, and direct links to GitHub repositories.

## Core Requirements
- **Responsive Design**: Must provide optimal viewing experience on both desktop and mobile devices
- **Personal Showcase**: Display personal summary, project experience, professional activities, core competencies, certifications, and education
- **GitHub Integration**: Direct links to GitHub repositories and projects
- **Professional Focus**: Highlight AI coding expertise, MCP tool development, and AI-native workflow experience

## Key Personal Background (from self-introduction.md)
- **Role**: Senior AI Product Manager specializing in AI-native developer tools
- **Key Projects**: 
  - Custom MCP tools for AI Agent enhancement
  - Structured task decomposition and parallel execution engine
  - Long-term memory and knowledge base system for AI Agents
- **Teaching**: Senior instructor for AI development methodologies
- **Certifications**: Software copyright certificates, Information System Project Manager certification
- **Education**: Bachelor's degree in Accounting from Jiangxi University of Finance and Economics

## Recommended Technology Stack
- **Frontend Framework**: Next.js or React for component-based architecture and responsive design
- **Styling**: Tailwind CSS for responsive design with mobile-first approach
- **Deployment**: Vercel or Netlify for easy deployment and GitHub integration
- **Version Control**: Git with clear commit messages for project iterations

## Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking (if TypeScript)
npm run type-check
```

## Architecture Guidelines
- **Components**: Create reusable components for resume sections (PersonalSummary, ProjectExperience, Skills, etc.)
- **Responsive Layout**: Implement mobile-first design with breakpoints for tablet and desktop
- **Navigation**: Include smooth scrolling navigation between sections
- **External Links**: Implement secure external links to GitHub repositories and professional profiles
- **Performance**: Optimize for fast loading on both desktop and mobile devices

## Content Structure
The website should include these main sections based on the resume:
1. Header with contact information and navigation
2. Personal Summary
3. Project Experience (with detailed MCP tool descriptions)
4. Professional Activities & Influence
5. Core Competencies
6. Certifications & Honors
7. Education Background

## Responsive Design Requirements
- **Mobile (< 768px)**: Single column layout, collapsible navigation, touch-friendly buttons
- **Tablet (768px - 1024px)**: Two-column layout for some sections, optimized touch targets
- **Desktop (> 1024px)**: Multi-column layout, hover effects, full navigation visible

## GitHub Integration
- Implement direct links to relevant GitHub repositories
- Consider embedding GitHub contribution graph or repository cards
- Ensure all external links open in new tabs with proper security attributes

## SEO Considerations
- Include proper meta tags for professional online presence
- Implement semantic HTML structure
- Add structured data for better search engine visibility