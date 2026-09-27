import Image from "next/image";

/**
 * The owner's photograph, from `public/HERO2.jpg`, treated rather than dropped in.
 *
 * The filename says `-bw` on purpose. Next's image optimiser keys its cache on the
 * URL and not on the contents of the file, so replacing the bytes under the old
 * `sakhandaru.webp` path kept serving the colour original out of `.next/cache`
 * after the treatment was already written to disk. A new name is the cheap way to
 * make sure a changed asset actually changes what ships.
 *
 * 6000 by 4000 and 3.7MB as a JPEG. It is now 3840 wide WebP at 167KB, which is the
 * width a 1920 viewport asks for at 2x DPR.
 *
 * The treatment is the one 15.5 asked for and the old placeholder promised, dramatic
 * black and white, so it is done once here rather than in CSS where it would cost a
 * filter pass on every paint:
 *
 *   - grayscale, then the black and white points set from the plate's real range, so
 *     the curve works on what the camera recorded rather than on a guess
 *   - a smoothstep S curve at 0.42. At 1.0 smoothstep posterises; 0.42 keeps the
 *     shape and drops the steps. The first pass used 0.55 and buried the face, since
 *     the plate already sits at a mean luminance of 40 out of 255
 *   - a 0.55 vignette, built from a radial gradient resized to the frame so it
 *     reads as lens falloff on a 3:2 plate instead of a drawn oval
 *
 * Result sits at a mean luminance of 28. Dark, and the auditorium still has detail
 * in it rather than being a black rectangle with a face floating in it.
 */
const PHOTO_SRC = "/photo/sakhandaru-bw.webp";
const PHOTO_ALT =
  "sakhandaru wearing a cum laude sash, sprawled across a row of theatre seats with his feet up, in an empty auditorium";

/**
 * DESIGN..md 15.5 calls this the cooldown after the chaos, and specifies it as calm,
 * editorial, spacious, readable. The photograph carries that, so the type on top is
 * kept to a minimum and sits in the lower band where a portrait usually has room.
 *
 * Black here rather than the hero's warm off-white, and that is not an arbitrary
 * choice: the section the user just scrolled through ends on a black screen, so a
 * black top edge makes the push-up continuous instead of a cut.
 */
export default function HeroTwo() {
  return (
    <section className="relative min-h-screen bg-[#08080a]">
      <div className="relative min-h-screen w-full">
        {PHOTO_SRC ? (
          <Image
            src={PHOTO_SRC}
            alt={PHOTO_ALT}
            fill
            priority={false}
            className="object-cover object-[58%_50%]"
            sizes="100vw"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 grid place-items-center bg-[#0e0e11]"
          >
            <p className="px-6 text-center font-mono text-[11px] leading-relaxed tracking-wide text-[#6f6d68]">
              [FOTO HERO KEDUA — BELUM DISEDIAKAN]
              <br />
              Potret dramatis hitam putih, satu layar penuh.
            </p>
          </div>
        )}

        {/*
          The scrim only exists to keep type off the photograph's highlights, and it
          is bottom-weighted because that is where the type sits. Once the real
          photograph lands this needs re-checking against the actual contrast, not
          against the placeholder.
        */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"
        />

        <div className="relative flex min-h-screen flex-col justify-end px-5 pb-14 sm:px-8 sm:pb-20">
          <h2 className="font-display pixel-dense max-w-[16ch] text-[clamp(1.75rem,6.5vw,5rem)] leading-[0.92] text-[#f2efe7]">
            [KALIMAT PEMBUKA]
          </h2>
        </div>
      </div>
    </section>
  );
}
