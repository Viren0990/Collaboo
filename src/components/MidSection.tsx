import { FileText, Globe, MessageCircle, Shield, Users, Zap } from "lucide-react"
import { Card, CardContent } from "./ui/card"

export const MidSection = () => {
    const features = [
        {
            icon: Users,
            title: "Real-time Collaboration",
            description: "Work together seamlessly with live cursors, instant sync, and conflict-free editing across infinite space.",
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Experience the speed of light with instant loading, real-time updates, and zero-latency interactions.",
        },
        {
            icon: Globe,
            title: "Universal Access",
            description: "Access your notes from anywhere in the universe. Cross-platform, cross-device, cross-dimensional.",
        },
        {
            icon: Shield,
            title: "Quantum Security",
            description: "Your thoughts are protected with end-to-end encryption and enterprise-grade security protocols.",
        },
        {
            icon: MessageCircle,
            title: "Cosmic Comments",
            description: "Leave contextual comments, reactions, and feedback that orbit around your content intelligently.",
        },
        {
            icon: FileText,
            title: "Infinite Organization",
            description: "Organize with tags, folders, and AI-powered categorization that scales beyond earthly limits.",
        },
    ]

    return (
        <section className="px-4 py-20 bg-black/20 backdrop-blur-sm">
            <div className="text-center space-y-3 mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Features from another dimension</h1>
                <p className="text-purple-300">Discover tools designed for the future of collaborative thinking</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-400/30 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 h-full"
                    >
                        <CardContent className="p-6">
                            <div className="flex flex-col h-full">
                                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-purple-200 flex-grow">{feature.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}