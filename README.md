# Cortado AI Chat Interface

## Overview

This project implements a chat interface for interacting with an AI language model. It features a sidebar for chat history, a main chat area with message streaming, and persistent storage of conversations.

## Features

- Real-time chat interface with AI
- Message streaming for responsive AI replies
- Persistent storage of chat history using localStorage
- Sidebar with chat summaries
- Responsive design for various screen sizes

## Technical Stack

- Next.js
- React
- TypeScript
- Tailwind CSS for styling
- localStorage for client-side persistence

## Implementation Details

### Prioritization

1. Core chat functionality (message display, input handling, API integration)
2. UI implementation closely matching the provided design
3. Persistent storage of chats and messages
4. Error handling and user feedback

### Key Decisions and Assumptions

- Assumed the `continueConversation` API was pre-implemented and functioning
- Used localStorage for persistence, assuming a single-user scenario
- Prioritized functional UI over exact styling details

### Pending Implementations

- OKLCH color space and relative color variables for the color palette
- "Display" button functionality in the chat history header

## Setup and Running

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Improvements

- Implement OKLCH color space for scalable design system
- Add "Display" button functionality
- Enhance error handling and user feedback
- Implement server-side rendering for better initial load performance
- Add keyboard shortcuts for improved accessibility
- Implement message grouping by time or sender
- Add message editing or deletion features
