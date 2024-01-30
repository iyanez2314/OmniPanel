import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/db/UserFunctions";

export async function post(request: NextRequest, response: NextResponse) {}

export { post as POST };
