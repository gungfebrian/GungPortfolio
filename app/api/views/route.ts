import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { allProjects } from "contentlayer/generated";

export const revalidate = 60;

export async function GET() {
    try {
        const redis = Redis.fromEnv();

        // Get all project slugs
        const slugs = allProjects.map((p) => p.slug);

        // Create keys for Redis
        const keys = slugs.map((slug) => ["pageviews", "projects", slug].join(":"));

        if (keys.length === 0) {
            return NextResponse.json({});
        }

        // Fetch all views in one go
        const viewsData = await redis.mget<number[]>(...keys);

        // Map views back to slugs
        const views = viewsData.reduce((acc, v, i) => {
            acc[slugs[i]] = v ?? 0;
            return acc;
        }, {} as Record<string, number>);

        return NextResponse.json(views);
    } catch (error) {
        console.error("Failed to fetch views:", error);
        return NextResponse.json({}, { status: 500 });
    }
}
