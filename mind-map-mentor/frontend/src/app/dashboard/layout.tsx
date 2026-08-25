'use client'; // Needed if SidePanel or AuthGuard have client hooks

import React, { useState } from 'react';
import SidePanel from "@/components/layout/SidePanel";
import QueryPanel from "@/components/ai/QueryPanel"; // Import QueryPanel
import AuthGuard from '@/components/auth/AuthGuard'; // Corrected path
import { FiMessageCircle, FiX } from 'react-icons/fi'; // Icons for toggle

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true); // State for right panel

  return (
    // Wrap with AuthGuard to protect dashboard routes
    <AuthGuard>
        {/* Main flex container for three columns */}
        <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* Left Side Panel - Fixed Width, Non-Collapsible */}
            <div className="w-64 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
              <SidePanel />
            </div>

            {/* Center Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-white"> 
                {children}
            </main>

            {/* Right Query Panel - Hidden when closed, shows floating button instead */}
             {isRightPanelOpen && (
               <div className="w-80 flex-shrink-0 border-l border-gray-200 bg-white flex flex-col animate-in slide-in-from-right duration-150">
                 {/* Header with Close Button */}
                 <div className="sticky top-0 z-10 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                   <h2 className="text-lg font-semibold text-gray-900">Ask Synspses</h2>
                   <button
                     onClick={() => setIsRightPanelOpen(false)}
                     className="p-1 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
                     title="Close"
                   >
                     <FiX className="h-5 w-5"/>
                   </button>
                 </div>
                 {/* Content Area - Remove internal header from QueryPanel */}
                 <div className="flex-grow overflow-y-auto">
                   <QueryPanel showHeader={false} />
                 </div>
               </div>
             )}

             {/* Floating Button - Shows when panel is closed */}
             {!isRightPanelOpen && (
               <button
                 onClick={() => setIsRightPanelOpen(true)}
                 className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-40 animate-in fade-in zoom-in duration-150"
                 title="Ask Synspses"
               >
                 <FiMessageCircle className="h-6 w-6" />
               </button>
             )}
        </div>
     </AuthGuard>
  );
} 