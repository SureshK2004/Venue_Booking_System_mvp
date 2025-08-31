"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface VenueGalleryProps {
  images: string[]
}

export default function VenueGallery({ images }: VenueGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="w-full">
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer overflow-hidden rounded-2xl shadow-md"
            onClick={() => setSelected(img)}
          >
            <Image
              src={img}
              alt={`Venue Image ${i + 1}`}
              width={400}
              height={300}
              className="object-cover w-full h-40"
            />
          </motion.div>
        ))}
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative"
            >
              <Image
                src={selected}
                alt="Selected Venue"
                width={800}
                height={600}
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
