import Navbar from "./components/Navbar";
import About from "./components/About";
import Ilabulo3D from "./components/Ilabulo3D";
import { motion } from "framer-motion";
import ilabuloVideo from "./assets/ilabulo.mp4";

export default function App() {
  return (
    <>
      <Navbar />

      {/* --- Hero Section --- */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden"
      >
        <video
          src={ilabuloVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 h-full w-full object-cover object-[center_10%]"
        />

        {/* Overlay & gradien */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-charcoal" />

        {/* Konten teks */}
        <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5 rounded-full border border-white/25 bg-white/10 px-5 py-1.5 text-sm font-medium tracking-wide backdrop-blur-sm"
          >
            Warisan Budaya Takbenda Indonesia · Gorontalo
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 text-5xl font-extrabold drop-shadow-2xl md:text-7xl"
          >
            <span className="text-main">Ilabulo</span>{" "}
            <span className="text-second">Gorontalo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1 }}
            className="mx-auto mb-8 max-w-xl text-lg font-light text-gray-100/90 drop-shadow-md md:text-xl"
          >
            Rasakan kelezatan khas Gorontalo —{" "}
            <span className="font-bold text-main">pedas, gurih,</span> dan{" "}
            <span className="font-bold text-main">autentik!</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#D1913C" }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-transparent bg-main px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:border-main"
            >
              🍴 Kenali Ilabulo
            </motion.a>
            <motion.a
              href="#model"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-white/40 px-8 py-3 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white"
            >
              ✨ Ilabulo 3D Model
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-2xl text-white/70"
        >
          ⌄
        </motion.div>
      </section>

      {/* --- 3D Model Section (setelah Hero) --- */}
      <Ilabulo3D />

      {/* --- About Section --- */}
      <About />

      {/* --- Footer --- */}
      <footer className="bg-charcoal px-6 py-12 text-center text-cream/60">
        <h3 className="text-2xl font-bold text-cream">
          Ilabulo<span className="text-main">.</span>
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm">
          Melestarikan kuliner warisan Gorontalo — simbol persatuan dalam
          setiap suapan.
        </p>
        <p className="mt-6 text-xs text-cream/40">
          © {new Date().getFullYear()} Ilabulo Gorontalo. Dibuat dengan ❤️ untuk
          budaya Nusantara.
        </p>
      </footer>
    </>
  );
}
