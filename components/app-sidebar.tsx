"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    Wallet,
    Home,
    GraduationCap
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
    user: {
        name: "Andi Saputra",
        email: "andi@mahasiswa.ac.id",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
            isActive: true,
        },
        {
            title: "Transaksi",
            url: "/dashboard/transactions",
            icon: Wallet,
        },
        {
            title: "Budgeting",
            url: "/dashboard/budget",
            icon: PieChart,
        },
        {
            title: "Edukasi",
            url: "/dashboard/education",
            icon: BookOpen,
            items: [
                {
                    title: "Artikel",
                    url: "/dashboard/education/articles",
                },
                {
                    title: "Video",
                    url: "/dashboard/education/videos",
                },
            ],
        },
        {
            title: "Simulasi",
            url: "/dashboard/simulation",
            icon: Frame,
        },
    ],
    navSecondary: [
        {
            title: "Bantuan",
            url: "/help",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "/feedback",
            icon: Send,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GraduationCap className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">FinStudent</span>
                                    <span className="truncate text-xs">Mahasiswa Edition</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
