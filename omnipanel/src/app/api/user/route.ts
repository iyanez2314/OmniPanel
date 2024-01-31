import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/db/UserFunctions";

export async function insertUser(req: NextRequest) {
  try {
    console.log("Request Made");

    const request = await req.json();

    if (!request) {
      return NextResponse.json({
        status: 400,
        body: "No request body found.",
      });
    }

    console.log(request);

    // const user = await createUser(request.body);

    // console.log(user);
    //
    return NextResponse.json({
      status: 200,
      body: "Success",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: "Error Creating Account. Please try again later.",
    });
  }
}

export { insertUser as POST };
