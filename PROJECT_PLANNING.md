# Event Horizon Planner: Project Planning Documents

This document outlines the Software Requirements Specification (SRS), Risk Analysis, Project Estimation, and Communication Plan for the Event Horizon Planner application.

---

## 1. Software Requirements Specification (SRS)

### 1.1. Introduction

#### 1.1.1. Purpose
This document provides a detailed description of the requirements for the **Event Horizon Planner** application. It will serve as the guiding document for development, testing, and stakeholder alignment.

#### 1.1.2. Scope
The application is a comprehensive web-based platform for event planning. It includes tools for blog management, vendor directory, budget calculation, RSVP tracking, task management (checklist), and AI-powered theme generation.

#### 1.1.3. Overview
This SRS details the functional and non-functional requirements of the system. Section 2 describes the overall product and its users. Section 3 outlines the specific functional and non-functional requirements.

### 1.2. Overall Description

#### 1.2.1. Product Perspective
Event Horizon Planner is a self-contained web application. It is built on a modern tech stack (Next.js, React) and utilizes Genkit for its AI features. It is intended to be a one-stop-shop for users planning events.

#### 1.2.2. Product Functions
- **Blog Management:** CRUD operations for blog posts.
- **Vendor Directory:** Display, filter, and manage vendor profiles.
- **Budget Calculator:** An interactive tool to estimate and track event costs.
- **RSVP Tracker:** A tool to manage guest lists and their attendance status.
- **Event Checklist:** An interactive to-do list for event preparation.
- **AI Event Theme Generator:** Suggests event themes and color palettes using AI.
- **Contact Form:** Allows users to send messages to the site administrators.

#### 1.2.3. User Characteristics
- **Administrators:** Can perform CRUD operations on all content (blog posts, vendor profiles).
- **General Users:** Can read blog content, browse vendors, and use all planning tools (Budget Calculator, RSVP Tracker, Checklist, AI Generator, Contact Form).

#### 1.2.4. Constraints
- **Technology Stack:** The application must be built using Next.js, React, TypeScript, ShadCN UI, Tailwind CSS, and Genkit.
- **Styling:** The application must adhere to the specified style guidelines (colors, fonts).
- **Deployment:** The application will be deployed on Firebase App Hosting.

### 1.3. Specific Requirements

#### 1.3.1. Functional Requirements
- **FR-1: Blog Management**
  - Admins can create, read, update, and delete blog posts.
  - Users can view a list of all blog posts.
  - Users can filter blog posts by category and search by keyword.
  - Users can view a single blog post's full content.
- **FR-2: Vendor Directory**
  - Admins can create, read, update, and delete vendor profiles.
  - Users can view a list of all vendors.
  - Users can filter vendors by category, rating, and search by keyword.
- **FR-3: Budget Calculator**
  - Users can add, edit, and remove line items with costs.
  - The tool shall automatically calculate and display the total cost.
  - Users can download a CSV summary of their budget.
- **FR-4: RSVP Tracker**
  - Users can add and remove guests from a list.
  - Users can update the status of each guest (Attending, Maybe, Declined, Not Responded).
  - The tool shall display a summary of guest counts by status.
- **FR-5: Event Checklist**
  - Users can view a pre-populated checklist categorized by planning phase.
  - Users can check and uncheck tasks.
  - The tool shall display an overall progress bar.
- **FR-6: AI Event Theme Generator**
  - Users can input an event type and preferences.
  - The system shall use a Genkit flow to generate a theme name, color palette, and descriptions.
  - The generated theme shall be displayed to the user.

#### 1.3.2. Non-Functional Requirements
- **NFR-1 (Performance):** Pages should load quickly, leveraging Next.js server-side rendering and static generation where possible.
- **NFR-2 (Usability):** The interface must be intuitive, responsive, and accessible across modern web browsers on desktop and mobile devices.
- **NFR-3 (Reliability):** The AI generation feature should handle potential API errors gracefully and inform the user of any issues.
- **NFR-4 (Styling):** All UI elements must conform to the color palette and font specifications outlined in the project's style guide.

---

## 2. Risk Analysis

| ID  | Risk Description                                       | Probability (1-5) | Impact (1-5) | Mitigation Strategy                                                                                             |
|:----|:-------------------------------------------------------|:------------------|:-------------|:----------------------------------------------------------------------------------------------------------------|
| R-1 | AI (Genkit) API Unavailability or High Latency           | 3                 | 4            | Implement robust error handling, timeouts, and user-friendly error messages. Cache results where appropriate.     |
| R-2 | Changes in Third-Party APIs (e.g., Google AI)          | 2                 | 4            | Keep SDKs updated. Encapsulate API calls in services to minimize refactoring impact.                              |
| R-3 | Scope Creep                                            | 4                 | 3            | Adhere strictly to the SRS. All changes must go through a formal change request process.                          |
| R-4 | Inaccurate Project Estimations                         | 3                 | 3            | Break down tasks into smaller, manageable units. Re-evaluate estimates at the end of each development cycle.      |
| R-5 | UI/UX Issues on Different Devices                      | 3                 | 3            | Conduct thorough cross-browser and responsive testing. Utilize browser developer tools for emulation.             |
| R-6 | Data Loss in Client-Side Tools (e.g., Budget, RSVP)    | 2                 | 4            | Implement local storage persistence for user-generated data in tools, with a clear way for users to reset data. |

---

## 3. Project Estimation

This estimation assumes a single developer with expertise in the specified tech stack.

| Feature / Task                   | Estimated Time (Days) | Notes                                                               |
|:---------------------------------|:----------------------|:--------------------------------------------------------------------|
| **Phase 1: Foundation & Core UI**| **3 Days**            |                                                                     |
| - Project Setup & Configuration  | 0.5                   | Next.js, TypeScript, Tailwind, ShadCN. (Already complete)           |
| - Global Layout & Styling        | 1.5                   | Header, Footer, Fonts, and `globals.css` theme setup.               |
| - Component Scaffolding          | 1                     | Basic setup for pages and navigation.                               |
| **Phase 2: Feature Development** | **10 Days**           |                                                                     |
| - Blog (List & Detail Pages)     | 2                     | Includes filtering and search functionality.                        |
| - Vendor Directory               | 2                     | Includes filtering and search functionality.                        |
| - Budget Calculator Tool         | 1                     | Includes CSV download.                                              |
| - RSVP Tracker Tool              | 1                     | Includes status summary.                                            |
| - Event Checklist Tool           | 1                     | Includes progress tracking.                                         |
| - AI Theme Generator (Genkit)    | 2                     | Includes Genkit flow and frontend integration.                      |
| - Contact Form                   | 1                     | Frontend form with basic submission handling.                       |
| **Phase 3: Testing & Refinement**| **3 Days**            |                                                                     |
| - Cross-Browser & Responsive Test| 1.5                   | Testing on major browsers (Chrome, Firefox, Safari) and screen sizes. |
| - Refinement & Bug Fixing        | 1.5                   | Addressing issues found during testing.                             |
| **Total Estimated Time**         | **16 Days**           |                                                                     |

**Contingency Buffer:** A 20% contingency buffer (**~3 days**) is recommended, bringing the total estimated project duration to **19 days**.

---

## 4. Communication Plan

#### 4.1. Stakeholders
- **Project Lead / Product Owner:** Responsible for final decisions and requirement clarifications.
- **Development Team:** Responsible for implementing the features.
- **End-Users (via feedback):** Provide input on usability and feature satisfaction.

#### 4.2. Communication Channels
- **Daily Stand-ups:** Quick daily check-ins (15 mins) via video call to discuss progress, blockers, and plans for the day.
- **Weekly Progress Reports:** A concise email summary sent every Friday, detailing what was accomplished, what is planned for the next week, and any outstanding issues or risks.
- **Project Management Tool:** A Kanban board (e.g., Trello, Jira, or GitHub Projects) will be used to track the status of all tasks.
- **Code Repository:** All code will be managed in a Git repository (e.g., GitHub), with changes submitted via Pull Requests for review.
- **Direct Messaging:** For urgent or quick questions, a messaging tool (e.g., Slack or Teams) will be used.

#### 4.3. Meeting Cadence
- **Daily Stand-up:** Daily at 9:30 AM.
- **Weekly Review/Demo:** Every Friday at 2:00 PM to demonstrate progress and gather feedback.
- **Ad-hoc Meetings:** Scheduled as needed to resolve specific issues or discuss complex requirements.

#### 4.4. Reporting
- **Progress:** Tracked via the Kanban board.
- **Risks:** The Risk Analysis table will be updated and reviewed weekly.
- **Bugs:** Bug reports will be filed as issues in the project management tool/code repository.
