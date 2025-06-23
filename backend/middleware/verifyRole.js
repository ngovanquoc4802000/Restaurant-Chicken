export const isAdmin = (req, res, next) => {
  if (req.user?.rule === "admin") {
    return next();
  }
  return res.status(403).json({ success: false, message: "Admin access required." });
};

export const isCustomer = (req, res, next) => {
  if (req.user?.rule === "customer") {
    return next();
  }
  return res.status(403).json({ success: false, message: "Customer access required." });
};

