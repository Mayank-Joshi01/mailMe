const images = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Mountains' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', alt: 'Forest' },
  { src: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80', alt: 'Ocean' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80', alt: 'Valley' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', alt: 'Desert' },
  { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', alt: 'Lake' },
]

export default function Gallery() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Photo Gallery
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {images.map((img) => (
          <div key={img.alt} className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}