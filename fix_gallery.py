import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# 1. Update the Gallery to be a moving carousel
old_gallery = """                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedArsenalItem.details.images
                        .map((img, idx) => ({ img, idx, type: getGalleryItemType(img, idx, selectedArsenalItem.id) }))
                        .filter(item => galleryFilter === 'all' || item.type === galleryFilter)
                        .map(({ img, idx, type }) => {"""

new_gallery = """                    <div className="overflow-hidden relative w-full">
                      <div className="carousel-track flex gap-6">
                        {/* Duplicate the array to create an infinite loop effect */}
                        {[...selectedArsenalItem.details.images, ...selectedArsenalItem.details.images]
                        .map((img, idx) => ({ 
                          img, 
                          idx: idx % selectedArsenalItem.details.images.length, 
                          type: getGalleryItemType(img, idx % selectedArsenalItem.details.images.length, selectedArsenalItem.id) 
                        }))
                        .filter(item => galleryFilter === 'all' || item.type === galleryFilter)
                        .map(({ img, idx, type }, uniqueIdx) => {"""

app = app.replace(old_gallery, new_gallery)

# Replace the keys in the map to use uniqueIdx so React doesn't complain about duplicate keys
app = app.replace('key={`gallery-${selectedArsenalItem.id}-${idx}`}', 'key={`gallery-${selectedArsenalItem.id}-${uniqueIdx}`}')

# Add carousel-item to the inner div
old_item = """                              <div 
                                onClick={() => {"""

new_item = """                              <div 
                                onClick={() => {"""

# Actually I can just add carousel-item class to the parent div of the image
app = app.replace('className="flex flex-col gap-3 group/gal"', 'className="flex flex-col gap-3 group/gal carousel-item"')


# 2. Update ARCH_05 Hospice presentation board to be a grid of sheets
old_hospice_board = """                      <div className={`w-full h-[580px] sm:h-[680px] xl:h-[780px] border shadow-inner relative overflow-hidden rounded ${
                        isArch ? "border-gray-200 bg-white" : "border-white/10 bg-[#020304]"
                      }`}>
                        <iframe
                          src={embedSrc}
                          className="w-full h-full border-0"
                          title="Karunya Hospice and Palliative Care Center Thesis Sheets Viewer Layout"
                          allow="autoplay"
                        ></iframe>
                      </div>"""

new_hospice_board = """                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border shadow-inner rounded ${
                        isArch ? "border-gray-200 bg-gray-50" : "border-white/10 bg-[#020304]"
                      }`}>
                        {selectedArsenalItem.details.images.map((img: string, idx: number) => (
                           <img 
                             key={`hospice-sheet-${idx}`} 
                             src={getStaticThumbnailUrl(img)} 
                             alt={`Hospice Sheet ${idx + 1}`} 
                             referrerPolicy="no-referrer"
                             className={`w-full h-auto rounded border shadow-sm cursor-zoom-in transition-transform hover:scale-[1.02] ${
                               isArch ? "border-gray-300" : "border-gray-800"
                             }`}
                             onClick={() => {
                               setExpandedMedia({
                                 src: img,
                                 isVideo: false,
                                 googleDriveId: getDriveId(img),
                                 alt: `Hospice Sheet ${idx + 1}`
                               });
                             }}
                           />
                        ))}
                      </div>"""

app = app.replace(old_hospice_board, new_hospice_board)

with open('src/App.tsx', 'w') as f:
    f.write(app)
