import { motion } from "framer-motion";
import ilabuloImg from "../assets/ilabulo.png";

const facts = [
  {
    icon: "📜",
    title: "Sejak Abad ke-15",
    desc: "Hidangan istimewa para raja & bangsawan Kesultanan Gorontalo dan Bolango.",
  },
  {
    icon: "🕊️",
    title: "Totombowata",
    desc: "Namanya bermakna 'bersatu padu' — lambang persatuan dalam perbedaan.",
  },
  {
    icon: "🏆",
    title: "Warisan Budaya",
    desc: "Ditetapkan sebagai Warisan Budaya Takbenda Indonesia pada tahun 2016.",
  },
  {
    icon: "🍃",
    title: "Dibungkus Daun",
    desc: "Dikukus lalu dibakar di atas bara arang batok untuk aroma smokey khas.",
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

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cream px-6 py-24"
    >
      {/* Aksen dekoratif */}
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-main/10 blur-3xl" />
      <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-second/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        {/* Sisi Kiri: Gambar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 z-0 hidden h-full w-full rounded-3xl border-4 border-main md:block" />
          <div className="group relative z-10 overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={ilabuloImg}
              alt="Proses Pembuatan Ilabulo"
              className="h-[420px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
          <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-charcoal px-6 py-2 text-sm font-semibold text-cream shadow-lg">
            Kuliner khas Gorontalo, Sulawesi
          </div>
        </motion.div>

        {/* Sisi Kanan: Teks */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-second">
            Tentang Kuliner
          </span>
          <h2 className="mb-6 mt-2 text-4xl font-bold text-charcoal md:text-5xl">
            Apa itu <span className="text-main">Ilabulo?</span>
          </h2>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            Ilabulo adalah makanan khas masyarakat <strong>Gorontalo</strong>,
            Sulawesi, yang telah dihidangkan sejak <strong>abad ke-15</strong>.
            Sering disebut sebagai <em>"otak-otak jeroan"</em>, sajian ini
            terbuat dari campuran{" "}
            <span className="font-semibold text-main">tepung sagu</span>,{" "}
            <span className="font-semibold text-main">
              hati &amp; ampela ayam
            </span>
            , serta kulit ayam yang diolah dengan rempah dan santan kental.
          </p>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            Dahulu, Ilabulo menjadi sajian favorit raja-raja dan bahkan menjadi
            sarana perdamaian antara dua kerajaan yang berselisih. Dalam bahasa
            Gorontalo, namanya berarti <strong>"totombowata"</strong> —{" "}
            <span className="text-second font-semibold">bersatu padu</span> —
            melambangkan persatuan di tengah perbedaan.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Adonan dibungkus daun pisang, dikukus, lalu dibakar di atas bara
            arang batok kelapa hingga menghasilkan aroma <em>smokey</em> yang
            menggoda. Teksturnya kenyal, rasanya pedas-gurih—sempurna disantap
            selagi hangat.
          </p>
        </motion.div>
      </div>

      {/* Grid fakta */}
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
            className="group rounded-2xl border border-main/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-main/40 hover:shadow-xl"
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

export default About;
