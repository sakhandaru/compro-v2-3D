"use client";

import Image from "next/image";

import HeroGreeting from "@/components/hero-greeting";
import ScrollReveal from "@/components/scroll-reveal";
import { heroContent } from "@/content/hero";

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
        <ScrollReveal y={0} duration={1.1} ease="power2.out" className="absolute inset-0">
          {heroContent.photo.src ? (
            <Image
              src={heroContent.photo.src}
              alt={heroContent.photo.alt}
              fill
              priority={false}
              /*
                Two focal points, and the deciding factor is the shape of the window
                rather than its width.

                The plate is 3840 by 2560. A landscape window is wider than the plate is
                tall enough to be, so it crops vertically at most and shows the whole
                width: `58%` centres the auditorium with the figure in the lower left.

                A portrait window is the opposite. The image is scaled until its height
                fills the box, and a 390 by 844 phone then shows only about 31% of the
                width, a 768 by 1024 tablet about 50%. At `58%` the visible window sits
                between 40% and 71% of the frame on a phone and starts at 29% on a
                tablet, and the face is at roughly 29% of the frame. So the photograph
                was showing a pair of legs and three rows of empty seats on a phone,
                and half a face on a tablet.

                A width breakpoint cannot express this, because the same width crops
                very differently at different heights, so the variant is on orientation
                instead. `30%` puts the face inside the narrow window in both portrait
                shapes. The vertical value does nothing in portrait, because the scaled
                height matches the box exactly and there is no vertical crop to
                position against.
              */
              className="object-cover object-[58%_50%] [@media(orientation:portrait)]:object-[30%_50%]"
              sizes="100vw"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 grid place-items-center bg-[#0e0e11]"
            >
              <p className="px-6 text-center font-mono text-[11px] leading-relaxed text-[#6f6d68]">
                {heroContent.photo.placeholder}
                <br />
              </p>
            </div>
          )}
        </ScrollReveal>

        {/*
          The scrim only exists to keep type off the photograph's highlights. It is
          bottom weighted because that is where the type sits, and the top right
          corner needed more than the `to-black/30` this gradient starts at, so the
          scrim is two layers: the original gradient for the bottom statement, and a
          soft corner wash for the greeting. Both measured against the plate, not
          against a placeholder.
        */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(8,8,10,0.75),transparent_60%)]"
        />

        {/*
          Two pieces of type in opposite corners rather than stacked in one block.
          The photograph is the subject and it already has a figure lying across its
          lower left, so putting the greeting under WELCOME would have run text over
          a face. Diagonally opposed they frame the picture instead, and the eye
          travels from the small situational line in the corner down to the word the
          section is actually about.

          The greeting is out of flow on purpose: its four variants differ in length,
          and a corner that resized four times a day would be the one moving thing
          on a page that is otherwise deliberately still.
        */}
        <ScrollReveal
          y={-14}
          duration={0.75}
          delay={0.15}
          className="pointer-events-none absolute top-5 right-5 z-10 sm:top-8 sm:right-8"
        >
          <HeroGreeting />
        </ScrollReveal>

        <div className="relative flex min-h-screen flex-col justify-end px-5 pb-14 sm:px-8 sm:pb-20">
          <ScrollReveal y={28} duration={0.85} ease="power3.out">
            <h2 className="font-display pixel-dense display-xl text-[#f2efe7]">
              {heroContent.headline}
            </h2>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

