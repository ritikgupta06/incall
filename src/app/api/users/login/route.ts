import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Received data:", reqBody);

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;

    // console.log("User logged in successfully:", user);
    // return NextResponse.json({
    //   message: "User logged in successfully",
    //   success: true,
    //   user,
    // });
  } catch (error: any) {
    console.error("Error in POST /api/users/login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
