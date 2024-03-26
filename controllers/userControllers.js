let user = await User.findOne({ email });

if (user) {
  // return res.status(400).json({ message: "User have already registered" });
  throw new Error("User have already registered");
}

@@ -33,4 +32,55 @@ export const registerUser = async (req, res, next) => {
}
};

export { registerUser };
export const loginUser = async (req, res, next) => {
try {
const { email, password } = req.body;

let user = await User.findOne({ email });

if (!user) {
  throw new Error("Email not found");
}

if (await user.comparePassword(password)) {
  return res.status(201).json({
    _id: user._id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    verified: user.verified,
    admin: user.admin,
    token: await user.generateJWT(),
  });
} else {
  throw new Error("Invalid email or password");
}
} catch (error) {
next(error);
}
};

export const userProfile = async (req, res, next) => {
try {
let user = await User.findById(req.user._id);

if (user) {
  return res.status(201).json({
    _id: user._id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    verified: user.verified,
    admin: user.admin,
  });
} else {
  let error = new Error("User not found");
  error.statusCode = 404;
  next(error);
}
} catch (error) {
next(error);
}
};

export { registerUser, loginUser };