import { motion } from "framer-motion";
import tiliayaImg from "../assets/tiliaya.jpg";

const facts = [
  {
    icon: "🥚",
    title: "Telur & Santan",
    desc: "Adonan lembut dari telur dan santan kental yang dikukus perlahan.",
  },
  {
    icon: "🍯",
    title: "Gula Aren",
    desc: "Manis legit dengan aroma karamel khas gula merah / gula aren.",
  },
  {
    icon: "🌙",
    title: "Sajian Ramadan",
    desc: "Hadir saat Ramadan, Maulid, dan malam-malam penuh berkah.",
  },
  {
    icon: "🍮",
    title: "Lembut Berpuding",
    desc: "Bertekstur halus menyerupai puding — lumer di mulut.",
  },
];

const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutTiliaya = () => {
  return (
    <section
      id="about-tiliaya"
      className="relative overflow-hidden bg-cream px-6 py-24"
    >
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-main/15 blur-3xl" />
      <div className="absolute -left-20 bottom-16 h-64 w-64 rounded-full bg-second/10 blur-3xl" />
      <div className="absolute -right-20 bottom-24 h-64 w-64 rounded-full bg-main/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-bold uppercase tracking-[0.2em] text-second"
        >
          Tentang Kuliner
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10 mt-2 text-4xl font-bold text-charcoal md:text-5xl"
        >
          Apa itu <span className="text-main">Tili Aya?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="group relative mx-auto w-full max-w-xl"
        >
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(209,145,60,0.35),transparent_55%)] blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-main/30 shadow-2xl">
            <img
              src={tiliayaImg}
              alt="Tili Aya, kue tradisional Gorontalo"
              loading="lazy"
              decoding="async"
              className="h-[440px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-main px-6 py-2 text-sm font-semibold text-cream shadow-lg"
          >
            Kue manis penuh berkah
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-14 max-w-2xl space-y-4 text-lg leading-relaxed text-gray-700"
        >
          <p>
            Tili Aya adalah <strong>kue tradisional khas Gorontalo</strong>{" "}
            yang terbuat dari campuran <em>telur</em>,{" "}
            <span className="font-semibold text-main">gula merah / aren</span>,
            dan <span className="font-semibold text-main">santan kental</span>{" "}
            yang dikukus hingga lembut menyerupai puding.
          </p>
          <p>
            Sajian ini sarat makna spiritual — kerap dihidangkan saat bulan{" "}
            <strong>Ramadan</strong>, peringatan <strong>Maulid Nabi</strong>,
            serta malam-malam penuh berkah sebagai ungkapan rasa{" "}
            <span className="font-semibold text-second">syukur</span>.
          </p>
          <p>
            Rasanya manis legit dengan aroma karamel gula aren yang khas,
            bertekstur halus dan lumer di mulut — sempurna sebagai penutup yang
            menghangatkan hati.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-5 lg:grid-cols-4"
      >
        {facts.map((f) => (
          <motion.div
            key={f.title}
            variants={itemVariant}
            className="group rounded-2xl border border-main/15 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-main/40 hover:shadow-xl"
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="mt-4 text-lg font-bold text-charcoal">{f.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutTiliaya;
