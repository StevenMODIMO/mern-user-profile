import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="features">
      <motion.div
        initial={{ opacity: 0.5, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          default: {
            duration: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
          },
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
        className="contents"
      >
        <h2>Mern User Profile</h2>
        <h1>Register For Account</h1>
        <h1>View Your Profile</h1>
        <h1>Edit Your Profile</h1>
        <h1>Delete Your Profile</h1>
        <h1>Enjoy the Show</h1>
      </motion.div>
    </div>
  );
};

export default Features;
