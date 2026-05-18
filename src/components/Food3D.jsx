import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Center,
  ContactShadows,
  Html,
  useProgress,
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

["/ilabulo.glb", "/bintebiluhuta.glb", "/tiliaya.glb"].forEach((u) =>
  useGLTF.preload(u)
);

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-cream">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-main border-t-transparent" />
        <span className="text-sm font-medium tracking-wide">
          Memuat model 3D… {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

function FoodModel({ url, scale, triggerId }) {
  const { scene } = useGLTF(url);
  const group = useRef();

  useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;
    const trigger = `#${triggerId}`;

    const ctx = gsap.context(() => {
      gsap.from(g.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.6,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger, start: "top 75%" },
      });
      gsap.from(g.position, {
        y: -3,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger, start: "top 75%" },
      });

      gsap.to(g.rotation, {
        y: Math.PI * 2,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => ctx.revert();
  }, [triggerId]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.position.y = Math.sin(t * 1.1) * 0.12;
    g.rotation.x = Math.sin(t * 0.7) * 0.06;
    g.rotation.z = Math.cos(t * 0.5) * 0.04;
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  );
}

export default function Food3D({
  id,
  modelUrl,
  modelScale = 2.4,
  badge,
  titleLead,
  titleName,
  titleTail,
  description,
  accent = "main",
}) {
  const sectionRef = useRef();
  const textRef = useRef();

  const accentText = accent === "second" ? "text-second" : "text-main";
  const accentBorder =
    accent === "second" ? "border-second/40" : "border-main/40";
  const accentBg = accent === "second" ? "bg-second/10" : "bg-main/10";
  const conic =
    accent === "second"
      ? "bg-[conic-gradient(from_0deg,transparent,rgba(89,172,119,0.20),transparent_60%)]"
      : "bg-[conic-gradient(from_0deg,transparent,rgba(209,145,60,0.18),transparent_60%)]";

  const [active, setActive] = useState(false);
  const [inView, setInView] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const effectiveScale = modelScale * (isMobile ? 0.6 : 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setActive(true);
      },
      { rootMargin: "300px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-charcoal"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#3a2a12_0%,#1a1410_55%,#0d0a07_100%)]" />
        <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-main/25 blur-[120px] animate-float-slow" />
        <div
          className="absolute -bottom-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-second/20 blur-[130px] animate-float-slow"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className={`absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full ${conic} blur-2xl`}
        />
        <div className="absolute inset-0 bg-grain opacity-[0.18] mix-blend-overlay" />
      </div>

      <div
        ref={textRef}
        className="relative z-10 mx-auto max-w-3xl px-6 pt-24 text-center text-cream md:pt-28"
      >
        <span
          className={`inline-block rounded-full border ${accentBorder} ${accentBg} px-4 py-1 text-sm font-medium tracking-wide ${accentText}`}
        >
          {badge}
        </span>
        <h2 className="mt-5 text-4xl font-extrabold md:text-6xl">
          {titleLead}{" "}
          <span className={accentText}>{titleName}</span>{" "}
          {titleTail && <span className="text-second">{titleTail}</span>}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-cream/70 md:text-lg">
          {description}
        </p>
      </div>

      <div className="relative z-10 h-[68vh] w-full md:h-[72vh]">
        {!active && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-cream/70">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-main border-t-transparent" />
            <span className="text-sm font-medium tracking-wide">
              Menyiapkan model 3D…
            </span>
          </div>
        )}
        {active && (
          <Canvas
            shadows
            dpr={[1, 1.75]}
            frameloop={inView ? "always" : "demand"}
            camera={{ position: [0, 1.2, 6], fov: 42 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[5, 8, 5]}
              intensity={2.4}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight
              position={[-6, 3, -4]}
              intensity={0.8}
              color="#59ac77"
            />
            <pointLight
              position={[0, -2, 4]}
              intensity={1.2}
              color="#d1913c"
            />

            <Suspense fallback={<Loader />}>
              <FoodModel url={modelUrl} scale={effectiveScale} triggerId={id} />
              <ContactShadows
                position={[0, -1.8, 0]}
                opacity={0.5}
                scale={12}
                blur={2.6}
                far={4}
                color="#000000"
              />
            </Suspense>
          </Canvas>
        )}

        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-cream/40">
          ⬍ Gulir untuk memutar
        </div>
      </div>
    </section>
  );
}
