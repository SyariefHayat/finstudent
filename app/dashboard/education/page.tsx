"use client"

import * as React from "react"
import { BookOpen, PlayCircle, Search, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import {
    articles,
    videos,
    glossary,
    getCategoryLabel,
    getCategoryColor,
} from "@/lib/education-data"

// Helper to extract YouTube ID from URL
function getYoutubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function EducationPage() {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [playingVideo, setPlayingVideo] = React.useState<string | null>(null)

    // Get featured article
    const featuredArticle = articles.find((a) => a.featured)
    const regularArticles = articles.filter((a) => !a.featured)

    // Filter glossary by search
    const filteredGlossary = glossary.filter(
        (g) =>
            g.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            g.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Pusat Edukasi</h1>
                    <p className="text-muted-foreground">Belajar finansial dengan cara yang seru</p>
                </div>
            </div>

            <Tabs defaultValue="articles" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="articles" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Artikel & Tips
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="gap-2">
                        <PlayCircle className="h-4 w-4" />
                        Video
                    </TabsTrigger>
                    <TabsTrigger value="glossary" className="gap-2">
                        <Search className="h-4 w-4" />
                        Kamus Istilah
                    </TabsTrigger>
                </TabsList>

                {/* ARTICLES TAB */}
                <TabsContent value="articles" className="space-y-6">
                    {/* Featured Article */}
                    {featuredArticle && (
                        <Card className="border-none shadow-none bg-linear-to-br from-primary/10 via-primary/5 to-transparent">
                            <CardHeader>
                                <Badge className="w-fit mb-2">✨ Topik Minggu Ini</Badge>
                                <CardTitle className="text-2xl">{featuredArticle.title}</CardTitle>
                                <CardDescription className="text-base text-foreground/80">
                                    {featuredArticle.excerpt}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex items-center gap-4">
                                <Link href={`/dashboard/education/${featuredArticle.id}`}>
                                    <Button className="gap-2">
                                        Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    {featuredArticle.readTime} min baca
                                </div>
                            </CardFooter>
                        </Card>
                    )}

                    {/* Article Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {regularArticles.map((article) => (
                            <Card key={article.id} className="flex flex-col group hover:shadow-md transition-shadow">
                                <div className="w-full aspect-video bg-linear-to-br from-muted to-muted/50 relative rounded-t-xl overflow-hidden flex items-center justify-center">
                                    <BookOpen className="h-10 w-10 text-muted-foreground/30" />
                                </div>
                                <CardHeader className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <Badge variant="secondary" className={getCategoryColor(article.category)}>
                                            {getCategoryLabel(article.category)}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {article.readTime} min
                                        </span>
                                    </div>
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                        {article.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {article.excerpt}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="pt-0">
                                    <Link href={`/dashboard/education/${article.id}`} className="w-full">
                                        <Button variant="ghost" className="w-full justify-start p-0 h-auto font-semibold hover:bg-transparent hover:text-primary">
                                            Baca Artikel →
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* VIDEOS TAB */}
                <TabsContent value="videos" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {videos.map((video) => {
                            const videoId = getYoutubeId(video.youtubeId);
                            return (
                                <Card key={video.id} className="overflow-hidden group">
                                    <CardContent className="p-0">
                                        <AspectRatio ratio={16 / 9} className="bg-linear-to-br from-gray-800 to-gray-900 relative">
                                            {playingVideo === video.id && videoId ? (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                                    title={video.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="absolute inset-0 w-full h-full"
                                                />
                                            ) : (
                                                <div
                                                    className="absolute inset-0 cursor-pointer"
                                                    onClick={() => setPlayingVideo(video.id)}
                                                >
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                                                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                            <PlayCircle className="h-10 w-10 text-red-500 ml-1" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                                        {video.duration}
                                                    </div>
                                                </div>
                                            )}
                                        </AspectRatio>
                                        <div className="p-4 space-y-2">
                                            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                                                {video.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Oleh: {video.author}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        Video akan segera tersedia. Stay tuned! 🎬
                    </p>
                </TabsContent>

                {/* GLOSSARY TAB */}
                <TabsContent value="glossary" className="space-y-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari istilah..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-3">
                        {filteredGlossary.length === 0 ? (
                            <p className="text-center py-8 text-muted-foreground">
                                Tidak ada istilah yang ditemukan untuk &quot;{searchTerm}&quot;
                            </p>
                        ) : (
                            filteredGlossary.map((item) => (
                                <Card key={item.term} className="hover:shadow-sm transition-shadow">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg text-primary">{item.term}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p className="text-sm">{item.definition}</p>
                                        {item.example && (
                                            <p className="text-sm text-muted-foreground italic">
                                                💡 Contoh: {item.example}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
