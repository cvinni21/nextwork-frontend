'use client';

import { useState } from "react";
import ProfileSidebar from "@/components/ProfileSideBar";
import ProfileInfo from "@/components/ProfileInfo";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import CurriculumViewer from "@/components/CurriculumViewer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
    const { authLoading, accessToken } = useAuth()
    const [activeSection, setActiveSection] = useState('info')

    if (authLoading || !accessToken) {
        return (
            <div className="max-w-4xl mx-auto py-10 px-4">
                <Skeleton className='h-[400px] w-full rounded-xl' />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto py-10 px-4">
                <aside className="md:col-span-1">
                    <ProfileSidebar activeSection={activeSection} onSelectSection={setActiveSection} />
                </aside>

                <main className="md:col-span-3 bg-white rounded-xl shadow p-6 space-y-6">
                    <div key={activeSection} className="animate-fade-in transition-opacity duration-300 ease-in-out">
                        {activeSection === 'info' && <ProfileInfo />}
                        {activeSection === 'password' && <ChangePasswordForm />}
                        {activeSection === 'curriculum' && <CurriculumViewer />}
                    </div>
                </main>
            </div>
        </div>
    )
}
