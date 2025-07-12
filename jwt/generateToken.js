import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_TOKEN,
    { expiresIn: "5d" } 
  );

  console.log("Token: ", token)

  res.cookie("jwt", token, {
    httpOnly: true, // Prevent client-side scripts from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
    sameSite: "strict", // Prevent cross-site request forgery
  });
};

export default createTokenAndSaveCookie;
