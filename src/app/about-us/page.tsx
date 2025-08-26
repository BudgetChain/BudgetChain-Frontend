"use client"

import CompanyHistory from "@/components/AboutUs/companyHistory";
import CompanyMission from "@/components/AboutUs/companyMission";
import TeamOverview from "@/components/AboutUs/teamOverview";
import TechnologyBrief from "@/components/AboutUs/technologyBrief";
import VisionAndValues from "@/components/AboutUs/visionValue";
import ScrollReveal from "@/components/Common/ScrollBasedReveal";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";


function AboutUs() {
    return (
        <div className="bg-[#050512]">
            <Navbar />
            <main className="flex flex-col items-center justify-center py-16 space-y-10">
                <ScrollReveal>
                    <CompanyMission />
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                    <TeamOverview />
                </ScrollReveal>
                <ScrollReveal delay={0.4}>
                    <VisionAndValues />
                </ScrollReveal>
                <ScrollReveal delay={0.5}>
                    <TechnologyBrief />
                </ScrollReveal>
                <ScrollReveal delay={0.6}>
                    <CompanyHistory />
                </ScrollReveal>
            </main>
            <Footer />
        </div>
    )
}

export default AboutUs;