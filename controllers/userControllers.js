import User from "../models/User";

export const registerUser = async (req, res) => {
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check whether the user exists or not
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User have already registered" });
      // return res.status(400).json({ message: "User have already registered" });
      throw new Error("User have already registered");
    }

    // creating a new user
@@ -28,7 +29,7 @@ export const registerUser = async (req, res) => {
      token: await user.generateJWT(),
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
    next(error);
  }
};
