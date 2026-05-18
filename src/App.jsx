import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import AboutBinte from "./components/AboutBinte";
import AboutTiliaya from "./components/AboutTiliaya";
import BackgroundMusic from "./components/BackgroundMusic";
import { motion, useScroll, useSpring } from "framer-motion";
import makananGorontaloVideo from "./assets/makanangorontalo.mp4";

// three.js berat → dipisah ke chunk sendiri, dimuat setelah hero tampil
const Food3D = lazy(() => import("./components/Food3D"));

// Placeholder section selagi chunk 3D dimuat (menjaga layout & estetika)
function Section3DFallback() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-charcoal text-cream/70">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-main border-t-transparent" />
      <span className="text-sm font-medium tracking-wide">
        Memuat galeri 3D…
      </span>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <>
      {/* Musik latar — gambus Gorontalo, loop dari detik ke-5 */}
      <BackgroundMusic />

      {/* Progress scroll halaman */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-main via-second to-main"
      />

      <Navbar />

      {/* --- Hero Section --- */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden"
      >
        <video
          src={makananGorontaloVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="video-pan-mobile absolute left-0 top-0 h-full w-full object-cover object-[center_10%]"
        />

        {/* Overlay & gradien */}
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-charcoal" />

        {/* Konten teks */}
        <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5 rounded-full border border-white/25 bg-white/10 px-5 py-1.5 text-sm font-medium tracking-wide backdrop-blur-sm"
          >
            Jelajah Kuliner Warisan · Gorontalo
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 text-5xl font-extrabold drop-shadow-2xl md:text-7xl"
          >
            <span className="text-main">Cita Rasa</span>{" "}
            <span className="text-second">Gorontalo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1 }}
            className="mx-auto mb-8 max-w-xl text-lg font-light text-gray-100/90 drop-shadow-md md:text-xl"
          >
            Tiga sajian legendaris —{" "}
            <span className="font-bold text-main">Ilabulo</span>,{" "}
            <span className="font-bold text-second">Binte Biluhuta</span>, dan{" "}
            <span className="font-bold text-main">Tili Aya</span> — yang
            memadukan rasa pedas, gurih, dan manis warisan tanah Gorontalo.
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
              🍴 Jelajahi Kuliner
            </motion.a>
            <motion.a
              href="#model"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-white/40 px-8 py-3 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white"
            >
              ✨ Galeri 3D
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

      <Suspense fallback={<Section3DFallback />}>
        {/* --- 3D Ilabulo (setelah Hero) --- */}
        <Food3D
          id="model"
          modelUrl="/ilabulo.glb"
          modelScale={2.4}
          badge="Warisan Budaya Takbenda 2016"
          titleLead="Lihat"
          titleName="Ilabulo"
          titleTail="3D"
          description="Putar dan amati setiap detailnya — gulir halaman untuk memutar model, atau biarkan mengambang sembari menikmati sajian khas Gorontalo ini."
          accent="main"
        />

        {/* --- 3D Binte Biluhuta --- */}
        <Food3D
          id="binte-3d"
          modelUrl="/bintebiluhuta.glb"
          modelScale={2.4}
          badge="Sup Jagung Khas Gorontalo"
          titleLead="Lihat"
          titleName="Binte Biluhuta"
          titleTail="3D"
          description="Semangkuk kesegaran jagung manis dan kuah gurih — gulir untuk memutar dan amati teksturnya dari segala sisi."
          accent="second"
        />

        {/* --- 3D Tili Aya --- */}
        <Food3D
          id="tiliaya-3d"
          modelUrl="/tiliaya.glb"
          modelScale={2.4}
          badge="Kue Manis Penuh Berkah"
          titleLead="Lihat"
          titleName="Tili Aya"
          titleTail="3D"
          description="Kue lembut bercita rasa gula aren — gulir halaman untuk memutar model dan nikmati keindahan sajian penutup khas Gorontalo."
          accent="main"
        />
      </Suspense>

      {/* --- About Ilabulo --- */}
      <About />

      {/* --- About Binte Biluhuta --- */}
      <AboutBinte />

      {/* --- About Tili Aya --- */}
      <AboutTiliaya />

      {/* --- Footer --- */}
      <footer className="bg-charcoal px-6 py-12 text-center text-cream/60">
        <h3 className="text-2xl font-bold text-cream">
          GorontaloFood<span className="text-main">.</span>
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm">
          Melestarikan kuliner warisan Gorontalo — Ilabulo, Binte Biluhuta, dan
          Tili Aya, simbol persatuan dalam setiap suapan.
        </p>
        <p className="mt-6 text-xs text-cream/40">
          © {new Date().getFullYear()} GorontaloFood. Dibuat dengan kegabutan oleh Dcode.
        </p>
      </footer>
    </>
  );
}
