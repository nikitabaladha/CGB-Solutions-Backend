// const jwt = require("jsonwebtoken");
// const config = require("config");

// function middleware(req, res, next) {
//   const token = req.headers.access_token;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ hasError: true, message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, config.get("jwtSecret"));

//     req.user = decoded;

//     console.log("UserDetails...........", req.user);

//     next();
//   } catch (error) {
//     console.error(error.message);

//     return res.status(401).json({ hasError: true, message: "Invalid token" });
//   }
// }

// module.exports = middleware;

// =================================================================

const jwt = require("jsonwebtoken");
const config = require("config");

function middleware(req, res, next) {
  const token = req.headers.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ hasError: true, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded;

    console.log("UserDetails...........", req.user);

    next();
  } catch (error) {
    console.error(error.message);

    return res.status(401).json({ hasError: true, message: "Invalid token" });
  }
}

function verifyAdmin(req, res, next) {
  const token = req.headers.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ hasError: true, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    if (!decoded || decoded.role !== "admin") {
      throw new Error("Unauthorized");
    }

    req.user = decoded;

    console.log("Admin UserDetails:", req.user);

    next();
  } catch (error) {
    console.error(error.message);

    return res.status(401).json({ hasError: true, message: "Unauthorized" });
  }
}

module.exports = { verifyAdmin, middleware };
