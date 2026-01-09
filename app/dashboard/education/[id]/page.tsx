import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, BookOpen } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import {
    articles,
    getArticleById,
    getCategoryLabel,
    getCategoryColor,
} from "@/lib/education-data"

interface ArticlePageProps {
    params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { id } = await params
    const article = getArticleById(id)

    if (!article) {
        notFound()
    }

    // Get related articles (same category, excluding current)
    const relatedArticles = articles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 2)

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {/* Back button */}
            <Link href="/dashboard/education">
                <Button variant="ghost" className="gap-2 -ml-4">
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Edukasi
                </Button>
            </Link>

            {/* Article header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Badge className={getCategoryColor(article.category)}>
                        {getCategoryLabel(article.category)}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime} min baca
                    </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{article.title}</h1>
                <p className="text-lg text-muted-foreground">{article.excerpt}</p>
            </div>

            <Separator />

            {/* Article content */}
            <article className="prose prose-gray dark:prose-invert max-w-none">
                <div
                    className="[&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4
                               [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3
                               [&>h4]:font-semibold [&>h4]:mt-4 [&>h4]:mb-2
                               [&>p]:mb-4 [&>p]:leading-relaxed
                               [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4
                               [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4
                               [&>li]:mb-2
                               [&>table]:w-full [&>table]:border-collapse [&>table]:my-4
                               [&_th]:border [&_th]:border-border [&_th]:px-4 [&_th]:py-2 [&_th]:bg-muted [&_th]:font-semibold
                               [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2"
                    dangerouslySetInnerHTML={{
                        __html: article.content
                            .replace(/^## (.+)$/gm, "<h2>$1</h2>")
                            .replace(/^### (.+)$/gm, "<h3>$1</h3>")
                            .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
                            .replace(/^\- (.+)$/gm, "<li>$1</li>")
                            .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
                            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n\n/g, "</p><p>")
                            .replace(/\|(.+)\|/g, (match) => {
                                const cells = match.split("|").filter((c) => c.trim())
                                if (cells.some((c) => c.includes("---"))) return ""
                                const isHeader = cells.every((c) => c === c.toUpperCase() || cells[0].includes("Item") || cells[0].includes("Jenis"))
                                const tag = isHeader ? "th" : "td"
                                return `<tr>${cells.map((c) => `<${tag}>${c.trim()}</${tag}>`).join("")}</tr>`
                            })
                    }}
                />
            </article>

            <Separator />

            {/* Related articles */}
            {relatedArticles.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Artikel Terkait</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {relatedArticles.map((related) => (
                            <Link key={related.id} href={`/dashboard/education/${related.id}`}>
                                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                    <CardContent className="p-4 flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold leading-tight hover:text-primary transition-colors">
                                                {related.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {related.excerpt}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

// Generate static params for all articles
export async function generateStaticParams() {
    return articles.map((article) => ({
        id: article.id,
    }))
}
