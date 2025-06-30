export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.rule) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing user role.",
      });
    }

    const userRole = req.user.rule.trim().toLowerCase();

    const isAllowed = allowedRoles
      .map((role) => role.trim().toLowerCase())
      .includes(userRole);

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: `Access denied: ${userRole} role not allowed.`,
      });
    }

    next();
  };
};