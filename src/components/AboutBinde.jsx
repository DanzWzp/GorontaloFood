import { motion } from "framer-motion";
import bindeImg from "../assets/bintebiluhuta.jpg";

const facts = [
  {
    icon: "🌽",
    title: "Si Jagung Manis",
    desc: "Berbahan dasar jagung manis pipil yang dipadu kelapa muda parut.",
  },
  {
    icon: "🐟",
    title: "Gurih Laut",
    desc: "Ditambah ikan cakalang suwir atau udang segar khas pesisir Gorontalo.",
  },
  {
    icon: "🍋",
    title: "Segar Asam-Pedas",
    desc: "Perasan jeruk nipis, cabai, dan daun kemangi menyatu menyegarkan.",
  },
  {
    icon: "🤝",
    title: "Milu Siram",
    desc: "Disebut juga 'Milu Siram' — kuah disiram di atas jagung sesaat disantap.",
  },
];

const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutBinde = () => {
  return (
    <section
      id="about-binde"
      className="relative overflow-hidden bg-cream px-6 py-24"
    >
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-second/15 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-main/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 z-0 hidden h-full w-full rounded-3xl border-4 border-second md:block" />
          <div className="group relative z-10 overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={bindeImg}
              alt="Semangkuk Binde Biluhuta khas Gorontalo"
              loading="lazy"
              decoding="async"
              className="h-[420px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-second px-6 py-2 text-sm font-semibold text-cream shadow-lg"
          >
            Sup jagung legendaris Gorontalo
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-second">
            Tentang Kuliner
          </span>
          <h2 className="mb-6 mt-2 text-4xl font-bold text-charcoal md:text-5xl">
            Apa itu <span className="text-second">Binde Biluhuta?</span>
          </h2>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            Binde Biluhuta adalah <strong>sup jagung khas Gorontalo</strong>{" "}
            yang menyegarkan. Dalam bahasa setempat,{" "}
            <span className="font-semibold text-second">"binde"</span> berarti
            jagung dan{" "}
            <span className="font-semibold text-second">"biluhuta"</span>{" "}
            berarti disiram — menggambarkan kuah hangat yang disiramkan ke atas
            jagung tepat sebelum disantap.
          </p>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            Hidangan ini memadukan <strong>jagung manis pipil</strong>, kelapa
            muda parut, ikan cakalang suwir atau udang, lalu dibumbui bawang,
            cabai, perasan <em>jeruk nipis</em>, dan daun kemangi yang harum.
            Rasanya <span className="font-semibold text-main">segar</span>,{" "}
            <span className="font-semibold text-main">asam-pedas</span>, dan{" "}
            <span className="font-semibold text-main">gurih</span> sekaligus.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Kerap disebut <strong>"Milu Siram"</strong>, Binde Biluhuta jadi
            sajian pemersatu yang hadir saat keluarga berkumpul — paling nikmat
            disantap selagi hangat di sore hari.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-5 lg:grid-cols-4"
      >
        {facts.map((f) => (
          <motion.div
            key={f.title}
            variants={itemVariant}
            className="group rounded-2xl border border-second/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-second/40 hover:shadow-xl"
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

export default AboutBinde;
