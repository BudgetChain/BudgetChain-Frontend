"use client"
import ScrollReveal from "@/components/Common/ScrollBasedReveal";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Others from "@/components/WhitePaper/Others";
import TechnicalDocumentation from "@/components/WhitePaper/TechnicalDocumentation";

function WhitePaper() {
    return (
        <>
            <Navbar />
            <ScrollReveal>
                <TechnicalDocumentation />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
                <Others />
            </ScrollReveal>
            <hr />
            <Footer />
        </>
    )
}



export default WhitePaper;